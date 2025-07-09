# Piensa Math

A simple multiplication practice web app.

## Project Structure

```
piensa-math/
  public/
    index.html        # Main HTML file
    styles.css        # Global styles
    sw.js             # Service worker
  src/
    app.js            # Main JavaScript logic
```

## How to Run

1. Open `public/index.html` directly in your browser.
   - Make sure paths to JS and CSS are correct (already updated).
2. For service worker and manifest to work, you should serve the `public` directory with a local web server:
   - Python 3: `cd public && python -m http.server 8000`
   - Node.js: `npx serve public`
   - Or use any static file server of your choice.
3. Open `http://localhost:8000` (or the port you chose) in your browser.

## Notes
- All static assets are now in `public/`.
- Source code is in `src/`.
- Update paths in `index.html` and `sw.js` if you reorganize further.

## License
MIT