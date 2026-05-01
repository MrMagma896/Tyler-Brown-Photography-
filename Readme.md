# Tyler Brown Photography — Project Tracker

A multi-page photography portfolio website for Tyler Brown, built with plain HTML, CSS, and JavaScript.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, featured work, about preview, category browse |
| `gallery.html` | Full filterable photo gallery (Wildlife / Nature / Portraits) |
| `about.html` | About Tyler — bio, portrait photo, background |
| `book.html` | Booking inquiry form (Formspree-powered) |
| `style_2.css` | All styles (single shared stylesheet) |
| `main.js` | Gallery filter logic, scroll animations, mobile nav |
| `images/` | All image assets live here |

---

## Completed Tasks

- [x] Full site structure built — 4 pages (Home, Gallery, About, Book)
- [x] Shared navigation with mobile hamburger menu
- [x] Hero section with CTA buttons (View Gallery, Book a Session)
- [x] Featured work grid on home page
- [x] About preview section on home page
- [x] Browse by Category section (Wildlife, Nature, Portraits)
- [x] Gallery page with filter buttons and masonry-style layout
- [x] About page with portrait placeholder and bio text
- [x] Booking page with full inquiry form (name, email, phone, session type, date, location, message)
- [x] Footer across all pages
- [x] Scroll fade-in animations
- [x] Fixed header bug
- [x] Fixed minor booking page errors
- [x] Nav logo — updated to Lobster font, gold color, larger size
- [x] Gallery image spacing — increased gap between images (4px to 14px)
- [x] Created `images/` directory and moved `tylertst.jpg` into it
- [x] Updated all image `src` paths to point to `images/` folder
- [x] Auto-updating photo system — adding an entry to `images/photos.json` now automatically populates both the gallery and the "Recent Photography" section on the home page

---

## Still Needs Work

- [ ] **Hero title** — `index.html` line 37 still has placeholder text ("Test test test"), needs real headline copy from Tyler
- [ ] **Real photos** — all pages except one gallery item still use `.photo-placeholder` divs; need Tyler's actual photos dropped into `images/` and wired up
  - Home featured grid: 3 placeholders
  - Home about section: 1 portrait placeholder
  - Gallery: 7 remaining placeholder slots
  - About page: 1 portrait placeholder
- [ ] **Booking form backend** — form is built but not connected; needs a Formspree account, a form ID copied in, and the `action` attribute added to the `<form>` tag in `book.html` (setup instructions are in a comment around line 66)
- [ ] **Wood background texture** — original notes mentioned Tyler would share a wood background image; not yet incorporated
- [ ] **Social links** — footer has social icon placeholders; real URLs need to be filled in
- [ ] **About page bio** — copy is placeholder/generic; should be replaced with Tyler's actual bio

---

## How to Add a Photo

1. Drop the image file into the `images/` folder
2. Open `images/photos.json` and add one entry at the top of the array:
```json
{
  "file": "your-photo.jpg",
  "category": "wildlife",
  "alt": "Describe what's in the photo",
  "label": "Wildlife"
}
```
3. That's it — the gallery page and the "Recent Photography" section on the home page update automatically. The first 3 entries in the JSON are what show on the home page, so put the best/newest photos at the top.

Valid categories: `wildlife` | `nature` | `portraits`

---

## Notes

- Google Fonts loaded: Lobster, Caveat, Lexend
- Color palette: obsidian background, gold accents (#b49464), forest green (#4a7c59)
