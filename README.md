# Practical Guides Library — Site Structure

This is a small multi-book ebook website. It currently has one book
("The Beginner's Guide to Making Money Online") and is structured so
you can add more without rebuilding anything.

## Folder structure

```
/
├── index.html                          → Library homepage (lists all books)
├── css/styles.css                      → Shared design system (used by every page)
├── js/main.js                          → Shared behavior (nav, animations, downloads)
├── robots.txt
├── sitemap.xml
└── books/
    └── making-money-online/
        ├── index.html                  → This book's landing page
        └── assets/ebook.pdf            → This book's PDF
```

## How to add a new book

1. **Duplicate the folder.**
   Copy `books/making-money-online/` to a new folder, e.g.
   `books/your-new-book-slug/`.

2. **Replace the PDF.**
   Put the new book's PDF at `books/your-new-book-slug/assets/ebook.pdf`
   (or update the `href` in that page's download buttons if you use a
   different filename).

3. **Edit the new page's content.**
   Inside `books/your-new-book-slug/index.html`, update:
   - `<title>` and meta description
   - The JSON-LD block (`name`, `numberOfPages`, `url`, etc.)
   - Hero heading, subtitle, description
   - "What's Inside" category cards
   - Book Details section
   - Anything else specific to that book

   Leave the `<link rel="stylesheet" href="../../css/styles.css">` and
   `<script src="../../js/main.js"></script>` paths as they are — every
   book page sits two folders deep, so `../../` always points back to
   the shared `css/` and `js/` folders at the site root.

4. **Add a tile to the homepage.**
   In the root `index.html`, inside `<div class="book-grid">`, copy the
   existing `<a class="book-tile" ...>` block, point its `href` at
   `books/your-new-book-slug/index.html`, and update the cover text,
   title, description, and page count. You can delete the "More Guides
   Coming Soon" placeholder tile once you have a second real book, or
   just leave it at the end of the grid.

5. **Add it to `sitemap.xml`.**
   Copy the `<url>` block for the existing book and update the `<loc>`
   to `https://yourdomain.com/books/your-new-book-slug/`.

That's it — no shared file needs to change structurally. The header,
footer, buttons, animations, and mobile menu are all inherited
automatically from the shared `css/styles.css` and `js/main.js`.

## Domain checklist before going live

Search the project for `example.com` and replace every instance with
your real domain in:
- `index.html` (canonical + Open Graph tags)
- `books/making-money-online/index.html` (canonical + Open Graph + JSON-LD)
- `sitemap.xml`
- `robots.txt`

## Turning a book into a paid product later

Each book page's download buttons are plain links:
```html
<a href="assets/ebook.pdf" download>Download Free PDF</a>
```
To make one book paid, change its buttons to point at a checkout URL
and remove the `download` attribute, e.g.:
```html
<a href="https://your-checkout-link.com">Get the Book</a>
```
Other books can stay free — this is decided per book page, not
site-wide.
