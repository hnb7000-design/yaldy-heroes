# YALDY UNIVERSE — SITEMAP & ARCHITECTURE
# Version 1.0 | Final Schema
# ============================================

## PRINCIPLE
The site is a Portal to a Universe.
Sales are a result of a journey:
Curiosity > Entry > Hero/Chapter > Hint/Mission > Progress > Collection > Return to Universe.

Pages = "Gates", not "pages".
Products = "Artifacts", not "products".
Thank-you = "Progress Gate", not "end of process".

---

## FULL URL MAP

### LAYER A — UNIVERSE CORE (The Journey)

```
/                               Portal (Home) — cinematic entry
/heroes                         Heroes Hub — hall of heroes, choose your path
/heroes/david-shepherd          Hero Page — David the Shepherd (RPG profile)
/heroes/david-king              Hero Page — King David (RPG profile)
/heroes/joab                    Hero Page — Joab ben Tzeruya [LOCKED]

/chapters                       Chapters Hub — all available story chapters
/chapters/lion                  Chapter Gate — David and the Lion
/chapters/goliath               Chapter Gate — David vs. Goliath
/chapters/city-of-david         Chapter Gate — City of David conquest
/chapters/valley-strike         Chapter Gate — Valley of Elah battle

/deep/lion                      Deep Content — full story after email gate
/deep/goliath                   Deep Content — full story after email gate
/deep/city-of-david             Deep Content — full story after email gate
/deep/valley-strike             Deep Content — full story after email gate
```

### LAYER B — COMMERCE (Artifacts = Products)

```
/artifacts                      Artifact Room — shop overview (all products)
/artifacts/david-and-the-lion-150       Puzzle 150pc — ₪79
/artifacts/david-vs-goliath-300         Puzzle 300pc — ₪99
/artifacts/city-of-david-500            Puzzle 500pc — ₪119
/artifacts/valley-strike-1000           Puzzle 1000pc — ₪149

/cart                           Cart (Shopify or custom)
/checkout                       Checkout (redirect to Shopify)
```

### LAYER C — GATES (Progress & Lead Capture)

```
/gates/lead                     Soft Gate — email capture to unlock deep content
/gates/welcome                  After signup — "You entered the Universe"
/gates/unlocked                 After purchase — "A new gate opens"
/gates/artifact-activated       After QR scan — "Artifact verified + bonus"
```

### LAYER D — TRUST & LEGAL (System Pages)

```
/about                          About Us — founder story + mission
/contact                        Contact Us — form + info
/faq                            FAQ / Help — parents + buyers
/shipping-returns               Shipping & Returns policy
/privacy                        Privacy Policy
/terms                          Terms & Conditions
/accessibility                  Accessibility Statement (Israel law)
```

### LAYER E — FUTURE [LOCKED]

```
/club                           [LOCKED] Members club — future
/chat/david-shepherd            [LOCKED] AI chatbot — talk to the hero
/chat/david-king                [LOCKED] AI chatbot — talk to the hero
```

---

## PAGE-BY-PAGE CONTENT MAP

### / (Portal — Home)
- **Purpose:** Create curiosity. Tease the Universe. Pull into journey.
- **Sections:**
  1. Opening Panel — YALDY HEROES title, tagline, CTA "Discover the Story"
  2. Origin Story — 4 cinematic scenes (fullscreen, parallax):
     - Scene 1: "BEFORE THE CROWN" (gate image)
     - Scene 2: "THE FAITHFUL SHEPHERD" (sheep image)
     - Scene 3: "BORN TO LEAD" (lion tracks image)
     - Scene 4: "TO PROTECT & GUARD" (lion fight image)
  3. Chapter Divider — "Choose Your Hero"
  4. Hero Cards — 3 cards (David Shepherd, David King, Joab [locked])
  5. Footer
- **CTAs:** Discover the Story → #story, Hero Cards → /heroes/{slug}
- **Images needed:** slide_gate, slide_sheep, slide_tracks, slide_lion, 3 card images
- **Status:** HTML built (index.html)

---

### /heroes (Heroes Hub)
- **Purpose:** The Hall of Heroes. Choose your path.
- **Sections:**
  1. Title: "CHOOSE YOUR HERO"
  2. Hero cards (larger, more detail than Portal)
  3. Universe teaser: "Every hero has a story"
  4. Newsletter signup
- **CTAs:** Each card → /heroes/{slug}
- **Status:** Not built yet

---

### /heroes/david-shepherd (Hero Page — David the Shepherd)
- **Purpose:** Full RPG-style character profile. Impress. Create connection.
- **Sections:**
  1. Cinematic hero entrance (full-width image + name reveal)
  2. RPG Stats Panel:
     - Name: David the Shepherd / דוד הרועה
     - Title: The Young Lion
     - Age: 14
     - Height: 165 cm (5'5")
     - Origin: Bethlehem, Judah
     - Role: Shepherd · Protector · Future King
     - Traits: Swift & agile, Brave beyond his years, Loyal and protective, Natural leader, Strong faith in God
  3. Stat Bars (game-style):
     - Strength: 65/100
     - Speed: 85/100
     - Faith: 95/100
     - Defense: 60/100
     - Courage: 90/100
     - Wisdom: 70/100
  4. Legendary Moments:
     - Moment 1: "This is how a hero is born" (lion encounter)
     - Moment 2: "This is how faith is measured" (Goliath)
  5. Related Chapters → /chapters/lion, /chapters/goliath
  6. Related Artifacts → puzzle links
  7. Song section: "Through melody and song..."
  8. Transformation teaser (boy → king)
- **CTAs:** Unlock the Story → /chapters/{slug}, Explore Artifacts → /artifacts
- **Images needed:** david_shepherd_hero, david_shepherd_profile, scene images
- **Existing content:** Full profile text from old site
- **Status:** Not built yet

---

### /heroes/david-king (Hero Page — King David)
- **Purpose:** Same structure as david-shepherd, different content.
- **Sections:** Same layout as above
  - RPG Stats:
    - Name: King David / דוד המלך
    - Title: The Warrior King of Israel
    - Age: 38
    - Height: 185 cm (6'1")
    - Origin: Bethlehem, Judah
    - Role: King · Warrior · Psalmist · Leader of Israel
    - Traits: Fearless warrior, Strategic leader, Deep faith and humility, Protector of Israel, Poet and musician
  - Stat Bars:
    - Strength: 88/100
    - Speed: 70/100
    - Faith: 95/100
    - Defense: 85/100
    - Courage: 95/100
    - Wisdom: 90/100
  - Legendary Moments:
    - Moment 1: "One silent move opens a kingdom" (City of David)
    - Moment 2: "The victory begins with listening" (battle tactics)
  - City section: "This city does not need a ruler — it has a hero"
- **Existing content:** Full profile text from old site
- **Status:** Not built yet

---

### /heroes/joab [LOCKED]
- **Purpose:** Teaser card. Coming soon.
- **Shows:** Silhouette, lock icon, "Coming Soon"
- **Status:** Exists as locked card on Portal

---

### /chapters (Chapters Hub)
- **Purpose:** List all available story chapters. Entry point for content.
- **Sections:**
  1. Title: "THE STORY UNFOLDS"
  2. Chapter cards with preview image + title + difficulty/length
  3. Locked chapters (tease future content)
- **Status:** Not built yet

---

### /chapters/{slug} (Chapter Gate)
- **Purpose:** Short story teaser + mission. Pulls to /deep/ or /artifacts.
- **Structure:**
  1. Chapter title + hero connection
  2. Short teaser (2-3 paragraphs) — freely visible
  3. "Mission" — what the reader needs to discover
  4. CTA: "Unlock Full Story" → /gates/lead (if not subscribed) or /deep/{slug}
  5. Related Artifact
- **Status:** Not built yet

---

### /deep/{slug} (Deep Content — after email gate)
- **Purpose:** Full story. Reward for subscribing.
- **Structure:**
  1. Full chapter story
  2. Illustrations
  3. "Artifact connected to this chapter" → /artifacts/{slug}
  4. "Next chapter" link
- **Status:** Not built yet

---

### /artifacts (Artifact Room — Shop)
- **Purpose:** Products displayed as universe artifacts, not "items in a store".
- **Products (from old site):**
  1. David and the Lion Puzzle 150pc — ₪79 (was ₪99)
  2. David vs. Goliath Puzzle 300pc — ₪99 (was ₪119)
  3. City of David Puzzle 500pc — ₪119 (was ₪139)
  4. Valley Strike Puzzle 1000pc — ₪149 (was ₪169)
- **Bundles to create:**
  - Starter Mission (1 puzzle + digital chapter)
  - Family Night (2 puzzles + all chapters)
  - Collector Drop (all 4 puzzles + exclusive content)
- **Each artifact shows:** Connected chapter, Connected hero, What unlocks after purchase
- **Checkout:** Redirect to Shopify
- **Status:** Not built yet

---

### /gates/lead (Soft Gate — Email Capture)
- **Purpose:** Capture email to unlock deep content.
- **Shows:** Blurred preview of full chapter + email form
- **After submit:** Redirect to /gates/welcome + email sent + /deep/ unlocked
- **Status:** Not built yet

---

### /gates/welcome (After Signup)
- **Purpose:** "You entered the Universe" — not "thanks bye"
- **Shows:** Welcome message + first free chapter + hero recommendation
- **Status:** Not built yet

---

### /gates/unlocked (After Purchase)
- **Purpose:** "A new gate opens" — bonus content after buying
- **Shows:** Bonus chapter + next hero teaser + QR instructions
- **Status:** Not built yet

---

### /gates/artifact-activated (After QR Scan)
- **Purpose:** Physical puzzle scanned → digital reward
- **Shows:** Artifact verified + exclusive content + next chapter
- **Status:** Not built yet

---

### /about (About Us)
- **Content from old site:**
  - Mission statement: "In a world flooded with animated superheroes, we return to the real ones..."
  - Founder story: "It all began one evening when my son asked me who was stronger..."
  - Brand promise: "YALDY™ – where true heroes are born."
- **Status:** Not built yet (text ready)

---

### /contact (Contact Us)
- **Content from old site:**
  - Email: info@yaldyheroes.com
  - Phone: +972-50-650-0750
  - Location: Rosh HaAyin, Israel
  - Contact form
  - Social links
- **Status:** Not built yet (text ready)

---

### /faq (FAQ / Help)
- **Purpose:** Remove purchase barriers. Great for SEO.
- **Sections:**
  - About YALDY (what is it, who is it for)
  - Products (materials, ages, difficulty)
  - Orders (shipping, returns, tracking)
  - Digital content (chapters, QR, app)
  - Universe (what are artifacts, heroes, chapters)
- **Status:** Not built yet (need to write)

---

### /shipping-returns
- **Content:** From old site footer links
- **Status:** Not built yet (need old site text)

---

### /privacy
- **Content:** Privacy policy
- **Status:** Not built yet (need old site text)

---

### /terms
- **Content:** Terms & Conditions
- **Status:** Not built yet (need old site text)

---

### /accessibility
- **Content:** Accessibility statement (Israel law requirement)
- **Status:** Not built yet (need to write)

---

### /club [LOCKED]
- **Purpose:** Future members club
- **Shows:** "Coming Soon" teaser + email signup
- **Status:** Placeholder only

---

### /chat/{hero-slug} [LOCKED]
- **Purpose:** Future AI chatbot — talk to the hero
- **Shows:** "Coming Soon" teaser
- **Status:** Placeholder only

---

## IMAGE ASSETS INVENTORY (from Google Drive)

### Folder: "אתר דוד הנער" (David the Shepherd)
| File | Description | Use |
|------|-------------|-----|
| דוד 51561.webp | David transparent background | Card image |
| דוד אריה.webp | David fighting lion | Scene 4 / Chapter |
| דוד הגשש copy.webp | David crouching with sheep | Scene 2 / Card |
| דוד15155.webp | David with sheep, golden sunset | Hero section |
| דוד שער.webp | David at fortress gate | Scene 1 |
| עמיד ושילוב ידיים.webp | David standing, arms crossed | Profile |
| 125874.webp | David with sling, combat pose | RPG page |

### Folders not yet explored:
- "אתר דוד המלך" — King David images
- "אתר יואב בן צוריה" — Joab images
- "אייקונים לאתר" — Icons

---

## BRAND LANGUAGE (Universe Lexicon)

| Normal word | Universe word |
|------------|---------------|
| Customer | Explorer / Entrant |
| Product | Artifact |
| Product page | Artifact Room |
| Thank you page | Progress Gate |
| Catalog | Heroes Hall |
| Series | Chapters |
| Collection | Collection |
| Cart | Mission Pack |
| Newsletter signup | Enter the Universe |
| Purchase | Acquire Artifact |

---

## TECH STACK

| Component | Tool |
|-----------|------|
| Frontend | HTML/CSS/JS (static files) |
| Hosting | Netlify (free) |
| Shop/Checkout | Shopify |
| Email | TBD (Mailchimp / Klaviyo) |
| Analytics | GA4 + custom events |
| Automation | Make.com |
| CRM | TBD |
| QR System | TBD |
| Images | Google Drive → local files |

---

## BUILD ORDER

| Phase | Pages | Status |
|-------|-------|--------|
| 1 | Portal (index.html) | BUILT |
| 2 | Hero Page: David Shepherd | NEXT |
| 3 | Hero Page: David King | Pending |
| 4 | Heroes Hub | Pending |
| 5 | Chapters Hub + Chapter Gates | Pending |
| 6 | Artifacts (shop) | Pending |
| 7 | Gates (lead, welcome, unlocked) | Pending |
| 8 | About + Contact | Pending |
| 9 | FAQ + Legal pages | Pending |
| 10 | Deep content pages | Pending |
| 11 | Club + Chat placeholders | Pending |
| 12 | Shopify integration | Pending |
| 13 | Deploy to Netlify | Pending |

---

## NOTES
- All pages support Hebrew + English toggle
- All images use onerror fallback (emoji if image missing)
- Mobile-first responsive design
- Gold/navy/crimson color scheme (Marvel cinematic feel)
- Fonts: Oswald (EN), Heebo (HE)
- Every page has max 1-2 CTAs (game principle)
- Always leave something locked/hidden (universe principle)
