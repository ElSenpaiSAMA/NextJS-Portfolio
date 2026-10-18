# Third-party skills

Installed for creative web design work (scroll-driven motion, WebGL / 3D). Each was read in full
before installing: documentation and code samples only, no network calls or hidden instructions.
The bundled Python scripts in the freshtechbro skills are local code generators (standard library only).

| Skill | Source | Commit | License |
|-------|--------|--------|---------|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) (official) | `dbd4588` | Apache 2.0 (`LICENSE.txt`) |
| `awwwards` | [tponscr-debug/claude-skill-awwwards](https://github.com/tponscr-debug/claude-skill-awwwards) | `d18aa0c` | MIT (per its README) |
| `gsap-scrolltrigger` | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1da73fe` | MIT (`LICENSE`) |
| `react-three-fiber` | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1da73fe` | MIT (`LICENSE`) |
| `threejs-webgl` | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1da73fe` | MIT (`LICENSE`) |

Local changes: `awwwards/SKILL.md` points its reference path at `.claude/skills/awwwards/references/`
(upstream assumes a user-level install in `~/.claude/skills`).

To update: re-clone the source at a newer commit, re-read the diff, copy over, and update this table.
