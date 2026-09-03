# ELYSIUM — Cinematic 10-Screen Space Station Tour

## Context

Build a full-screen, multi-screen luxury tour of ELYSIUM private orbital station. This is a private viewing experience — no booking flows, no prices. The app is a sequence of 10 full-viewport "rooms," each with a living animated background, minimal serif caption, and silent navigational chrome. Tone: quiet elite sophistication, like a private house tour for billionaires.

The user supplied 6 photorealistic reference images that serve as background assets for specific screens; the remaining 4 screens use Unsplash imagery + CSS animation layers. The app-builder-preview shows the established brand: void-black ground, high-contrast serif display, wide-tracked thin uppercase labels, antique gold accents, horizontal nav.

---

## Aesthetic Stance

**Archival-cinematic** — strict negative space, classical serif display type, monochrome infrastructure with sparing gold. No gradients on text, no rounded cards, no soft shadows. Everything whispers.

**Fonts (Google Fonts via CSS @import in index.css):**
- Display: `Fraunces` — high-contrast, optical-size serif with personality; captures the classical-but-not-stuffy tone
- Labels/nav: `Jost` — geometric, wide-tracking, cold; pairs with Fraunces without competing

**Palette:**
| Token | Value | Role |
|---|---|---|
| `--bg` | `#050505` | Void black canvas |
| `--ivory` | `#F2EDE4` | Body text, captions |
| `--gold` | `#B8963E` | Accent: active dots, borders, eyebrow labels |
| `--steel` | `#6B6B6B` | Muted labels, inactive dots |
| `--overlay` | `rgba(5,5,5,0.45)` | Caption panel scrim |

---

## Image Map

| Screen | Image Source |
|---|---|
| 1 — Approach | `src/imports/Pt9w5.jpg` (station above Earth) |
| 2 — Docking | Unsplash: industrial hangar, amber lights |
| 3 — The Rim | Unsplash: interior orbital ring / curved corridor |
| 4 — Helios Court | `src/imports/wBd0k.jpg` (marble colonnade + Earth porthole) |
| 5 — Athena Gallery | `src/imports/0Uyc4.jpg` (library + starfield dome) |
| 6 — Selene Quietude | `src/imports/Zxkjh.jpg` (silk bed + Earth at night) |
| 7 — The Grove | `src/imports/Kv8MR.jpg` (hanging gardens + glass sky) |
| 8 — The Baths | `src/imports/3VIMb.jpg` (thermal baths + marble arches) |
| 9 — The Assembly | Unsplash: civic hall, bronze, pale stone |
| 10 — Invitation | Unsplash: empty marble court, large window |

---

## Architecture

```
src/
  App.tsx              — Screen sequencer + keyboard/wheel nav + dot nav
  screens/             — One component per screen
    Approach.tsx
    Docking.tsx
    TheRim.tsx
    HeliosCourt.tsx
    AthenaGallery.tsx
    SeleneQuietude.tsx
    TheGrove.tsx
    TheBaths.tsx
    TheAssembly.tsx
    Invitation.tsx
  components/
    NavDots.tsx         — Vertical gold dot rail (right edge)
    Caption.tsx         — Eyebrow + body text block (bottom-left)
    StarOverlay.tsx     — CSS animated star drift layer
    SteamOverlay.tsx    — CSS particle steam (used on Baths screen)
  index.css             — @import fonts, global tokens, keyframe animations
```

---

## Navigation

- **State**: `currentScreen` integer (0–9) in `App.tsx`
- **Input**: keyboard `ArrowRight`/`ArrowLeft`, `ArrowDown`/`ArrowUp`, scroll wheel (debounced), dot click
- **Transition**: CSS `opacity` crossfade (600ms ease) — screens are stacked absolutely, only the active screen has `opacity: 1`; no sliding to preserve the cinematic quality of full-bleed stills
- **Chrome**: 
  - Top-left: `ELYSIUM` wordmark in Jost, 11px, tracked 0.3em, gold
  - Top-right: screen counter `01 / 10` in Jost, ivory, muted
  - Right edge: vertical dot rail (10 dots, active = gold filled, rest = steel outline)
  - Bottom-left: Caption block (eyebrow label + 1-2 sentence caption in Fraunces italic)
  - Bottom-right: `← →` hint on first screen only

---

## Per-Screen Animation Layers

All screens get the `<StarOverlay>` — a `position: absolute` full-cover element whose `background` is a radial star pattern animated via `@keyframes starDrift` (background-position shift over 120s, looping).

| Screen | Additional animation |
|---|---|
| Approach | `transform: scale(1.04)` pulsing on the station image over 20s (approach zoom) |
| Docking | amber vignette overlay pulses opacity 0.3→0.5 over 4s |
| The Rim | slow horizontal background-position pan simulating rotation |
| Helios Court | warm gold ray (pseudo-element) sweeps left edge over 12s |
| Selene Quietude | Earth city-lights image: very slow vertical pan |
| The Baths | `<SteamOverlay>`: 6 absolutely positioned blurred white divs, each animating `translateY` upward at staggered delays |
| Invitation | single horizontal gold line appears slowly via width animation |

---

## Caption Layout

Each screen's caption sits bottom-left with generous padding:

```
[EYEBROW LABEL — JOST 10px GOLD TRACKED]

Screen Title in Fraunces 48–72px ivory

Caption body in Fraunces italic 16px ivory/80%
One or two sentences maximum.
```

Caption is placed over a `radial-gradient(ellipse at bottom left, rgba(5,5,5,0.7), transparent)` ground scrim so it reads against any image.

---

## Screens Detail

### 1 · Approach
- BG: `Pt9w5.jpg`, object-fit cover, slow scale pulse
- Eyebrow: `ORBITAL APPROACH · 400KM`
- Title: `ELYSIUM`
- Caption: *"The wheel turns. Earth does not decide who lives here."*

### 2 · Docking
- BG: Unsplash hangar/airlock (search: "spacecraft hangar amber lights private")
- Eyebrow: `PRIVATE RECEPTION`
- Title: `Arrival`
- Caption: *"You do not land. You are received."*

### 3 · The Rim
- BG: Unsplash curved interior corridor (search: "space station interior ring curved corridor")
- Eyebrow: `THE RESIDENTIAL RIM`
- Title: `One Rotation`
- Caption: *"One rotation. Earth weight. A coast that never ends."*

### 4 · Helios Court
- BG: `wBd0k.jpg`
- Eyebrow: `PRIVATE VILLA · HELIOS COURT`
- Title: `Perpetual Day`
- Caption: *"The sun never sets on the inner rim."*

### 5 · Athena Gallery
- BG: `0Uyc4.jpg`
- Eyebrow: `THE ATHENA GALLERY`
- Title: `Silence`
- Caption: *"For those who still think in silence."*

### 6 · Selene Quietude
- BG: `Zxkjh.jpg`
- Eyebrow: `NIGHT-SIDE SUITE · SELENE`
- Title: `The Dark Face`
- Caption: *"The night face of the wheel is reserved for rest."*

### 7 · The Grove
- BG: `Kv8MR.jpg`
- Eyebrow: `THE ELYSIAN GROVE`
- Title: `Rain That Falls Nowhere`
- Caption: *"Rain that never falls on the cities below."*

### 8 · The Baths
- BG: `3VIMb.jpg` + steam overlay
- Eyebrow: `THERMAL BATHS`
- Title: `The Baths`
- Caption: *"Longevity as hospitality, not a clinic."*

### 9 · The Assembly
- BG: Unsplash (search: "bronze civic hall pale stone columns")
- Eyebrow: `THE ASSEMBLY HALL`
- Title: `No Nation`
- Caption: *"A city that answers to no nation."*

### 10 · Invitation
- BG: Unsplash (search: "empty marble courtyard large window")
- Eyebrow: `BY INVITATION ONLY`
- Title: `Ask`
- Caption: *"Few seats. Absolute quiet. Ask to be received."*
- Additional: a single gold horizontal rule animates in; a mailto link in gold tracked type: `REQUEST CONSIDERATION`

---

## CSS Animations (index.css keyframes)

```css
@keyframes starDrift {
  from { background-position: 0 0; }
  to   { background-position: 400px 200px; }
}
@keyframes approachPulse {
  0%, 100% { transform: scale(1.0); }
  50%       { transform: scale(1.05); }
}
@keyframes amberPulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.55; }
}
@keyframes steamRise {
  0%   { transform: translateY(0) scaleX(1); opacity: 0.12; }
  100% { transform: translateY(-180px) scaleX(1.6); opacity: 0; }
}
@keyframes rimDrift {
  from { background-position: 0 center; }
  to   { background-position: 300px center; }
}
@keyframes goldLine {
  from { width: 0; }
  to   { width: 120px; }
}
```

---

## Responsive

Desktop (≥1024px): full layout as described.  
Mobile (<768px): caption font scales down (display 36px → 26px), dot nav moves to bottom center, eyebrow shrinks to 9px. Nav counter hides. Same images, same animations.

---

## Verification

1. Dev server is already running — open preview panel
2. Confirm 10 screens load and crossfade on arrow key / scroll
3. Check dot nav updates correctly
4. Confirm all 6 uploaded images render (not placeholder)
5. Check steam animation on Baths screen
6. Confirm star drift layer is visible on all screens
7. Check mobile layout at 390px width
