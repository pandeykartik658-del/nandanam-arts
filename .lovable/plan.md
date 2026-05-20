

## Teaching Wing — Visual & Interactivity Enhancements

Concrete upgrades to make the `/teaching` page more cinematic, more interactive, and more memorable — staying inside the wine-deep theme.

### 1. Hero upgrades
- **Animated kinetic subtitle**: rotating words under the title ("Discipline · Devotion · Expression · Rhythm · Grace") cross-fading every 2.4s.
- **Sanskrit-style ornamental glyph** above the title (◈ or a custom svg) with a slow-rotating wine-glow halo.
- **Scroll cue**: animated chevron + "Scroll to Begin" label at the bottom of the hero with a soft bobbing motion.
- **Cursor-reactive ambient light**: a soft radial gradient that follows the cursor across the hero (subtle, ~10% opacity).

### 2. Discipline navigator (new, sits between intro and Dance section)
A sticky horizontal "chapter rail" with two pills — `Dance` and `Music` — that:
- Smooth-scrolls to its section on click.
- Highlights the active discipline as you scroll (using `useInView`).
- Includes a thin animated wine progress line under the active pill.

### 3. RotatingShowcase — richer interactions
- **Ken Burns drift**: each active image slowly pans/zooms (10s) while displayed.
- **Caption overlay**: a small italic line at the bottom of the active image (e.g., "Tribhanga — the threefold bend"), crossfading with the image.
- **Progress ring** around the active indicator dot showing time-until-next.
- **Keyboard arrows** (← →) navigate when the carousel is focused.
- **Touch swipe** on mobile.

### 4. Dance & Music sections — added depth
- **Pillar cards**: replace the static description with a subtle reveal — on hover, the card flips to show a short Sanskrit/Tamil term + transliteration on the back.
- **Marquee of terms**: a slow horizontal marquee strip between Dance and Music ("Adavu · Tala · Raga · Bhava · Mudra · Laya · Shruti · Nritta") in faded Cinzel — pure ambience.
- **Audio teaser (Music section only)**: a small "▶ Listen" button that plays a 6-second tanpura drone loop on click (mute by default; respects reduced motion).
- **Mudra hover spotlight** in the Dance pillar cards: tiny mudra icons (svg) that gain a wine glow on hover.

### 5. New "Disciple's Journey" timeline (between Music and the closing quote)
A vertical wine-thread timeline with 5 stops — `Year 1: Foundation` → `Year 2: Adavus & Sarali` → `Year 3: Geetham & Abhinaya` → `Year 4: Varnam & Kriti` → `Year 5: Margam & Manodharma`. Each stop fades and slides in on scroll, with an ornamental ◆ marker that pulses softly.

### 6. Closing section — call to enrol
- Replace the lone quote with a quote **plus** an interactive "Begin Your Journey" button: magnetic hover (cursor pulls the button slightly), wine-glow ripple on click.
- Add a small ornamental footer line: `नन्दनम्` in faint Cinzel as a signature mark.

### 7. Ambient & micro-polish
- **Floating particles** (8–12 small wine-tinted dots drifting upward, very low opacity) layered behind sections — reuses `FloatingElements` pattern.
- **Section anchors** in the right margin (tiny ◆ ◆ ◆ ◆) that highlight as you scroll, double as smooth-scroll jumps.
- **Hover sound (optional, off by default)**: a soft chime on pillar card hover, toggleable via a small speaker icon top-right.
- **Reduced-motion respect**: all auto-playing motion (Ken Burns, marquee, particles, kinetic subtitle) checks `prefers-reduced-motion`.

### 8. Files to create / modify
- **Modify** `src/pages/Teaching.tsx` — add kinetic subtitle, discipline navigator, marquee, journey timeline, magnetic CTA, scroll cue, floating particles, section anchors.
- **Modify** `src/components/RotatingShowcase.tsx` — Ken Burns drift, caption prop, progress ring on active dot, keyboard + swipe support.
- **Create** `src/components/DisciplineNavigator.tsx` — sticky chapter rail with active-section detection.
- **Create** `src/components/JourneyTimeline.tsx` — vertical milestone timeline with scroll reveals.
- **Create** `src/components/KineticSubtitle.tsx` — rotating-words component.
- **Create** `src/components/MarqueeStrip.tsx` — slow horizontal marquee of Sanskrit terms.
- **Reuse** `MagneticButton.tsx` for the closing CTA, `FloatingElements.tsx` for particles.

### 9. Out of scope (ask before adding)
- Real audio asset for tanpura drone (will use a short royalty-free loop unless you provide one).
- Faculty / enrolment form (separate feature).

