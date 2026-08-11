# AutoSub Robotics

Website for AutoSub Robotics, UC Santa Barbara's autonomous underwater vehicle team, building toward RoboSub.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Other scripts: `npm run build` (production build into `dist/`), `npm run preview` (serve that build), `npm run lint`.

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages via
`.github/workflows/deploy.yml`. Enable it once, under **Settings > Pages > Build and
deployment > Source: GitHub Actions**.

The workflow sets `VITE_BASE` from the repository name, because project sites are
served from `/<repo>/` rather than the domain root. Local development is unaffected.

## Content that still needs filling in

Anything not yet confirmed by the team renders as a handwritten "give info" note
instead of invented copy. To find every one of them:

```bash
grep -rn "NeedsInfo" src/
```

Outstanding at time of writing: the sub's name and full spec sheet, officer names
and headshots, meeting times and rooms, the group chat invite, intro project links,
the club email and social handles, sponsor logos, the sponsorship packet PDF, photos
throughout, and confirmed team headcount.

Fill a value in and the note disappears on its own. In `RobotSpecs.tsx` and
`AUVDashboard.tsx` that means replacing a `null` with a string.

## How it is put together

- **Vite + React + TypeScript**, Tailwind CSS v4, shadcn/ui primitives
- **anime.js** for the gauge fills and the schematic line draw
- **Design tokens** live at the top of `src/index.css`: the UCSB navy and gold, a
  navy-derived surface ramp, type scale, and motion values. Components reference the
  semantic tokens rather than raw colours, so retheming happens in one place.
- **Scroll depth**: `ScrollDepthContext` tracks page progress; `SubmarineDepth` is the
  page indicator; the sponsorship section runs its own survey submarine down the tier
  gauge. Both ease through `requestAnimationFrame` and honour `prefers-reduced-motion`.
- **Reveals** are CSS transitions toggled by `IntersectionObserver`, gated behind a
  `.js` class set in `index.html` so the page is never blank if scripting fails.
