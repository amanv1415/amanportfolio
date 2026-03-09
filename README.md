# Aman Vishwakarma — Personal Portfolio

A modern, responsive personal portfolio website built with **HTML5**, **CSS3**, and **vanilla JavaScript**.

## Features

- Glassmorphism UI design with dark/light theme toggle
- Fully responsive (mobile → tablet → desktop)
- Smooth scroll-reveal animations
- Typing effect on hero tagline
- Animated skill progress bars with tab navigation
- Interactive project cards with hover overlays
- Stat counter animations
- Floating particle background
- Sticky navigation with active section highlighting
- Contact form with EmailJS integration
- Google Maps embed
- Downloadable resume/CV button
- Page loading animation
- Back-to-top button
- SEO-friendly meta tags

## Folder Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles (responsive, themes, animations)
├── js/
│   └── main.js             # All interactivity & EmailJS setup
├── assets/
│   ├── images/             # Put your profile photo & project screenshots here
│   └── resume/
│       └── resume.pdf      # Your CV/resume PDF file
└── README.md
```

## Getting Started

### 1. Personalise Content

Open `index.html` and replace:

- **Name** — Search for "Aman Verma" and replace with your name
- **Tagline / Description** — Update the hero text
- **Profile photo** — Replace the `<img>` src in the hero section with your photo (place it in `assets/images/`)
- **Social links** — Update GitHub, LinkedIn, email URLs
- **About details** — Email, phone, location
- **Skills / Projects / Certifications** — Edit to match your own
- **Resume** — Drop your PDF into `assets/resume/resume.pdf`
- **Google Map** — Update the `<iframe>` embed URL for your location

### 2. Set Up EmailJS (Contact Form)

1. Go to [emailjs.com](https://www.emailjs.com) and create a free account
2. **Add an Email Service** (e.g. Gmail)
3. **Create an Email Template** using these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — the message
4. Open `js/main.js` and replace:
   ```js
   const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```

### 3. Preview Locally

Open `index.html` in a browser, **or** use a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js (install serve globally)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Deployment

### Option A — GitHub Pages

```bash
# 1. Initialise a git repo
git init
git add .
git commit -m "Initial portfolio commit"

# 2. Create a GitHub repo (e.g. portfolio) and push
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages
#    → Repo Settings → Pages → Source: "main" branch, / (root)
#    → Your site will be live at https://YOUR_USERNAME.github.io/portfolio/
```

### Option B — Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# Follow the prompts — Vercel will detect it as a static site
# and give you a live URL instantly.
```

### Option C — Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Drag and drop the `portfolio` folder onto the deploy area
3. Done — you'll get a live URL

---

## Customisation Tips

| What | Where |
|---|---|
| Accent colour | `css/style.css` → `--accent` variable |
| Fonts | `index.html` → Google Fonts link + `css/style.css` → `font-family` |
| Animations speed | `css/style.css` → `--transition` variable |
| Skill percentages | `index.html` → `data-width` attribute on `.skill-progress` |
| Typed taglines | `js/main.js` → `taglines` array |
| Stat numbers | `index.html` → `data-target` attribute on `.stat-number` |

## License

MIT — feel free to use and modify for your own portfolio.
