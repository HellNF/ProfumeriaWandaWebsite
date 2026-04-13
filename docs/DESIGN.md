# Design System Document: The Personal Consultant
 
## 1. Overview & Creative North Star: "The Digital Ateliér"
The North Star for this design system is **The Digital Ateliér**. We are moving away from the cold, clinical nature of standard e-commerce to create a space that feels like a private, sun-drenched consultation room. This system rejects the rigid, boxy constraints of traditional web design in favor of **Organic Editorialism**. 
 
By leveraging intentional asymmetry, generous whitespace (breathability), and overlapping elements, we create a "kind" interface that prioritizes dialogue over transactions. We break the "template" look by treating every screen as a curated page from a high-end wellness journal, where typography is expressive and surfaces feel like tactile layers of fine stationery.
 
## 2. Colors: The Palette of Kindness
The color strategy avoids harsh contrasts, opting instead for a "Tonal Bloom" effect where colors bleed softly into one another.
 
*   **Primary (#D4006E):** Our "Friendly Fuchsia." It should be used as a heartbeat—guiding the eye to actions without shouting. 
*   **The "No-Line" Rule:** Sectioning must **never** use 1px solid borders. To separate content, use background shifts. A `surface-container-low` (#f0f1f1) section should sit directly against a `surface` (#f6f6f6) background. 
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack.
    *   **Base:** `surface` (#f6f6f6).
    *   **Secondary Content:** `surface-container` (#e7e8e8).
    *   **Interactive Cards:** `surface-container-lowest` (#ffffff) to provide a "pop" of clean light.
*   **The Glass & Gradient Rule:** For hero sections or floating navigation, use **Glassmorphism**. Apply `surface_variant` at 60% opacity with a `backdrop-blur` of 20px. 
*   **Signature Textures:** For primary buttons and high-impact headers, use a subtle radial gradient: `primary` (#D4006E) to `primary_container` (#ff6fa2). This adds a "glow" that feels premium and alive.
 
## 3. Typography: Warmth Meets Clarity
We pair the intellectual warmth of Noto Serif with the functional modernism of Plus Jakarta Sans (a refined alternative to Montserrat that offers better screen readability).
 
*   **Display & Headlines (Noto Serif):** These are our "Editorial Voices." Use `display-lg` and `headline-md` with slightly tighter letter-spacing to create a bespoke, printed-look. These should always be used for conversational prompts (e.g., "How is your skin feeling today?").
*   **Body & Titles (Plus Jakarta Sans):** Our "Functional Voice." Use `body-lg` for all conversational text to ensure high accessibility. The generous x-height of this font ensures clarity for all age groups.
*   **Hierarchy as Empathy:** Use `on_surface_variant` (#5a5c5c) for secondary information to reduce cognitive load, keeping the user’s focus on the primary dialogue.
 
## 4. Elevation & Depth: Tonal Layering
We eschew the "Shadow-Heavy" look of 2010s Material Design for a more modern, sophisticated **Atmospheric Depth**.
 
*   **The Layering Principle:** Depth is achieved by "stacking" tones. A `surface-container-lowest` (#ffffff) card placed on a `surface` (#f6f6f6) background creates a natural lift that feels soft and approachable.
*   **Ambient Shadows:** If a card must float (e.g., a modal or floating action), use a shadow with a 40px blur and only 4% opacity. The shadow color should be tinted with our `primary` hue (e.g., a deep fuchsia-tinted grey) to mimic natural light passing through a translucent object.
*   **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility, use the `outline_variant` (#acadad) at **15% opacity**. It should be felt, not seen.
*   **The Roundness Signature:** Adhere strictly to the **xl (3rem)** and **lg (2rem)** tokens. High roundness is our visual shorthand for "kindness." Sharp corners are strictly prohibited as they signal "precision" and "severity"—the opposite of our brand goals.
 
## 5. Components: Soft Touchpoints
 
*   **The Dialogue Card:** Use `surface-container-lowest`, a corner radius of `xl`, and zero borders. Use `body-lg` for text. These should appear to "float" in the layout with generous internal padding (at least 32px).
*   **Buttons (The Pillow CTA):** 
    *   **Primary:** Gradient-filled (`primary` to `primary_container`), `full` (pill) roundness, with a subtle `on_primary` drop shadow.
    *   **Tertiary:** No background, `primary` text, and an icon with a 4px horizontal shift on hover to create a "beckoning" motion.
*   **Input Fields:** Use `surface_container_high` with `full` roundness. The focus state should not be a harsh stroke, but a 2px outer glow of `primary_container`.
*   **Lists:** Forbid divider lines. Use 16px of vertical whitespace between items. For grouping, use a subtle background fill of `surface-container-low` with `lg` rounding around the entire list.
*   **The "Curated" Chip:** Use `secondary_container` for unselected and `primary` for selected. Use `Plus Jakarta Sans` at `label-md` for maximum legibility.
*   **Floating Progress Indicator:** Instead of a bar, use a soft, pulsing `primary_container` circle that grows and shrinks, signaling a "calm" wait time.
 
## 6. Do’s and Don’ts
 
### Do:
*   **Do** use asymmetrical layouts (e.g., a headline aligned left with a card shifted slightly to the right).
*   **Do** use "Kind Language"—buttons should say "Let's explore" rather than "Submit."
*   **Do** prioritize whitespace. If a screen feels "full," it is wrong.
*   **Do** use overlapping elements (e.g., an image of a perfume bottle slightly overlapping a `surface-container-lowest` card).
 
### Don't:
*   **Don't** use 100% black (#000000) for text. Always use `on_surface` (#2d2f2f) to keep the contrast "soft."
*   **Don't** use standard "drop shadows." If it looks like a default Photoshop shadow, delete it.
*   **Don't** use 90-degree corners on any interactive element.
*   **Don't** use "Alert Red" for errors unless critical. Use the `error` (#b41340) token which is slightly muted to avoid causing user anxiety.
 
---
*Director's Note: Remember, we are not building a tool; we are hosting a conversation. Every pixel should feel as though it was placed there by someone who cares about the user's wellbeing.*