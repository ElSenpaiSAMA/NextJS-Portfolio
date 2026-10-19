"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { StackItem } from "../../data/types";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, useMediaQuery } from "../../lib/motion";

type Matter = typeof import("matter-js");
type Body = import("matter-js").Body;

interface World {
  matter: Matter;
  engine: import("matter-js").Engine;
  bodies: Body[];
  drop: () => void;
}

/**
 * The stack as a physics toy (matter-js): every technology is a block that
 * drops into the box when the section scrolls in. With a mouse you can grab
 * and throw them; on touch, tapping shakes the box (dragging would fight the
 * page scroll). Pauses off screen. Decorative duplicate of the grouped list
 * below it, so it's aria-hidden. Reduced motion: the blocks simply sit in a wrap.
 */
export function StackPlayground({ items }: { items: StackItem[] }) {
  const motion = useMediaQuery(MOTION_QUERY);
  const fine = useMediaQuery(DESKTOP_MOTION_QUERY);
  const box = useRef<HTMLDivElement>(null);
  const pills = useRef<(HTMLSpanElement | null)[]>([]);
  const world = useRef<World | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const container = box.current;
    if (!motion || !container) return;
    let frame = 0;
    let visible = false;
    let disposed = false;
    let cleanupMouse: (() => void) | undefined;

    const start = async () => {
      const matter = await import("matter-js");
      if (disposed) return;
      const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint } = matter;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const engine = Engine.create({ gravity: { x: 0, y: 1 } });

      const wall = 200;
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + wall / 2, width * 2, wall, { isStatic: true }),
        Bodies.rectangle(-wall / 2, height / 2, wall, height * 4, { isStatic: true }),
        Bodies.rectangle(width + wall / 2, height / 2, wall, height * 4, { isStatic: true }),
      ]);

      const bodies = pills.current.map((el, i) => {
        const w = el?.offsetWidth ?? 80;
        const h = el?.offsetHeight ?? 36;
        return Bodies.rectangle(0, 0, w, h, { chamfer: { radius: Math.min(h / 2, 14) }, restitution: 0.35, friction: 0.4, label: String(i) });
      });
      const drop = () => {
        bodies.forEach((body, i) => {
          Body.setPosition(body, { x: 40 + Math.random() * (width - 80), y: -60 - i * 38 });
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngle(body, (Math.random() - 0.5) * 0.6);
          Body.setAngularVelocity(body, 0);
        });
      };
      drop();
      Composite.add(engine.world, bodies);

      if (fine) {
        const mouse = Mouse.create(container);
        // matter-js grabs wheel/touch events and calls preventDefault: give the page its scroll back.
        const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
        m.element.removeEventListener("wheel", m.mousewheel);
        m.element.removeEventListener("mousewheel", m.mousewheel);
        m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        const constraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
        Composite.add(engine.world, constraint);
        cleanupMouse = () => Composite.remove(engine.world, constraint);
      }

      world.current = { matter, engine, bodies, drop };
      setLive(true);

      let last = performance.now();
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (!visible) {
          last = now;
          return;
        }
        Engine.update(engine, Math.min(now - last, 32));
        last = now;
        bodies.forEach((body, i) => {
          const el = pills.current[i];
          if (!el) return;
          el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
        });
      };
      frame = requestAnimationFrame(tick);
    };

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) {
          started = true;
          void start();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      cleanupMouse?.();
      if (world.current) {
        world.current.matter.Engine.clear(world.current.engine);
        world.current = null;
      }
    };
  }, [motion, fine]);

  const shake = useCallback(() => {
    const w = world.current;
    if (!w) return;
    for (const body of w.bodies) {
      w.matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 18, y: -10 - Math.random() * 12 });
      w.matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
    }
  }, []);

  const drop = useCallback(() => world.current?.drop(), []);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div
        ref={box}
        aria-hidden="true"
        onClick={fine ? undefined : shake}
        className={`relative overflow-hidden rounded-ui border border-line bg-surface ${motion ? "h-[36rem] sm:h-[30rem]" : ""} ${live ? "" : "p-4"} ${fine && live ? "cursor-grab active:cursor-grabbing" : ""}`}
        data-testid="stack-playground"
      >
        <div className={live ? "" : "flex flex-wrap gap-2"}>
          {items.map((item, i) => (
            <span
              key={item.name}
              ref={(el) => {
                pills.current[i] = el;
              }}
              className={`inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-ui border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-medium sm:gap-2 sm:px-3 sm:py-2 sm:text-sm ${live ? "absolute left-0 top-0 will-change-transform" : ""}`}
            >
              {item.logo && <Image src={item.logo} alt="" width={16} height={16} unoptimized draggable={false} />}
              {item.name}
            </span>
          ))}
        </div>
      </div>
      {motion && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-fg-subtle">{fine ? "Grab a block and throw it." : "Tap the box to shake it."}</p>
          <div className="flex gap-2">
            <button type="button" onClick={shake} className="rounded-ui border border-line bg-surface px-3 py-1.5 text-xs font-medium hover:border-accent">
              Shake
            </button>
            <button type="button" onClick={drop} className="rounded-ui border border-line bg-surface px-3 py-1.5 text-xs font-medium hover:border-accent">
              Drop again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
