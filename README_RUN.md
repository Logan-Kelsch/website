# Logan portfolio site

This is a static portfolio site, so there is no build step required.

## file structure

```text
portfolio_site_logan/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── images/
        ├── hero/
        │   └── hero-main.jpg
        ├── profile/
        │   └── about.jpg
        └── projects/
            ├── structural-regression/
            │   └── cover.jpg
            ├── lunara/
            │   └── cover.jpg
            ├── chick-counting/
            │   └── cover.jpg
            ├── oyster-detection/
            │   └── cover.jpg
            ├── knowyouruni/
            │   └── cover.jpg
            └── ai-life-hub/
                └── cover.jpg
```

## run locally in wsl

Open the repo folder in VS Code from WSL:

```bash
cd /path/to/your/repo
code .
```

From the folder that contains `index.html`, run:

```bash
python3 -m http.server 8000
```

Open this in your browser:

```text
http://localhost:8000
```

## easiest way to replace images

Each image already has a very obvious path.

Examples:

- hero image: `assets/images/hero/hero-main.jpg`
- about image: `assets/images/profile/about.jpg`
- structural regression image: `assets/images/projects/structural-regression/cover.jpg`
- lunara image: `assets/images/projects/lunara/cover.jpg`

The fastest way to swap your own visuals in is:

1. keep the same folder and file name
2. replace the `.jpg` file with your real image
3. refresh the browser

If you want more than one image per project later, add files like:

- `detail-1.jpg`
- `detail-2.jpg`

Then add new `<img>` tags in `index.html` wherever you want them.

## publish to github pages later

If this repo is for the website itself, you can push these files to GitHub and use GitHub Pages.

A simple structure is:

- put these files in the root of the repo
- push to GitHub
- in GitHub repo settings, enable Pages from the main branch root

## quick edit targets

The main places you will probably want to edit first are:

- hero paragraph in `index.html`
- project descriptions in `index.html`
- contact links in `index.html`
- colors in `styles.css`
