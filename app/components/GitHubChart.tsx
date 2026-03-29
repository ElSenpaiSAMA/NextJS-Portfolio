"use client";

import { useEffect, useState } from "react";

interface Day {
  date: string;
  count: number;
  level: number;
}

export default function GitHubChart() {
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/ElSenpaiSAMA?y=last")
      .then((res) => res.json())
      .then((data) => {
        const days: Day[] = data.contributions;
        const grouped: Day[][] = [];
        for (let i = 0; i < days.length; i += 7) {
          grouped.push(days.slice(i, i + 7));
        }
        setWeeks(grouped);
        setTotal(days.reduce((acc, d) => acc + d.count, 0));
        setBest(Math.max(...days.map((d) => d.count)));
        let s = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) s++;
          else break;
        }
        setStreak(s);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const colors = [
    "bg-white/5",
    "bg-purple-900/60",
    "bg-purple-600/70",
    "bg-purple-500",
    "bg-purple-400",
  ];

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  const getMonthLabels = () => {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const date = new Date(week[0].date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        labels.push({
          label: date.toLocaleString("en", { month: "short" }),
          index: wi,
        });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  if (!loaded) return null;

  return (
    <div className="mb-12 md:mb-20">
      <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-6">
        GitHub Activity
      </h3>

      <div className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl">
        <div className="flex flex-row gap-6">

          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-6 mb-5 text-xs text-gray-400">
              <span><span className="text-purple-400 font-semibold">{total}</span> contributions</span>
              <span><span className="text-pink-400 font-semibold">{streak}</span> day streak</span>
              <span><span className="text-purple-300 font-semibold">{best}</span> best day</span>
            </div>

            <div className="flex gap-[3px]">
              <div className="flex flex-col gap-[3px] mr-1 mt-5">
                {dayLabels.map((d, i) => (
                  <div key={i} className="h-[10px] text-[9px] text-gray-600 leading-none flex items-center">
                    {d}
                  </div>
                ))}
              </div>

              <div className="flex flex-col min-w-max">
                <div className="flex gap-[3px] mb-[3px] relative h-4">
                  {weeks.map((_, wi) => {
                    const label = monthLabels.find((m) => m.index === wi);
                    return (
                      <div key={wi} className="w-[10px] relative">
                        {label && (
                          <span className="absolute left-0 text-[9px] text-gray-500 whitespace-nowrap">
                            {label.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          title={`${day.date}: ${day.count} contributions`}
                          className={`w-[10px] h-[10px] rounded-sm ${colors[day.level]} transition-all duration-200 hover:scale-125`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-gray-600 text-xs">Less</span>
              {colors.map((c, i) => (
                <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />
              ))}
              <span className="text-gray-600 text-xs">More</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-48 shrink-0 border-l border-white/10 pl-6">
            <img
              src="https://avatars.githubusercontent.com/u/104552415?v=4"
              alt="GitHub avatar"
              className="w-16 h-16 rounded-full border-2 border-purple-500/50"
            />
            <a
            
              href="https://github.com/ElSenpaiSAMA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-purple-500/50 text-gray-300 hover:bg-purple-600 hover:border-purple-500 hover:text-white transition-all duration-300"
            >
              View GitHub
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}