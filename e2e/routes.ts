import { projects } from "../app/data/projects";
import { NAV_ITEMS, projectHref } from "../app/lib/site";

/** Every public page, derived from the same data the site renders. */
export const TOP_LEVEL_ROUTES = ["/", ...NAV_ITEMS.map((item) => item.href)];
export const PROJECT_ROUTES = projects.map((p) => projectHref(p.slug));
export const ALL_ROUTES = [...TOP_LEVEL_ROUTES, ...PROJECT_ROUTES];
