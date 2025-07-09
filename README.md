# Piensa Math

A simple multiplication practice web app.

## Live Demo

Check out the deployed app here: [https://piensa-math.vercel.app/](https://piensa-math.vercel.app/)

## Project Structure

```
piensa-math/
  public/
    index.html        # Main HTML file
    styles.css        # Global styles
    sw.js             # Service worker
    app.js            # Main JavaScript logic
  README.md           # Read me file
```

## How to Run Locally

1. Open `public/index.html` directly in your browser for basic testing.
2. For full functionality (service worker, manifest), serve the `public` directory with a local web server:
   - Python 3: `cd public && python -m http.server 8000`
   - Node.js: `npx serve public`
   - Or use any static file server of your choice.
3. Open `http://localhost:8000` (or the port you chose) in your browser.

## Development Workflow
- Make changes to `src/app.js` during development.
- After making changes, copy `src/app.js` to `public/app.js` before deploying or testing in production.
- Only files in the `public` directory are deployed to Vercel and accessible on the web.

## Notes
- All static assets and deployable files are in `public/`.
- Source code is in `src/`.
- Update paths in `index.html` and `sw.js` if you reorganize further.

## License
MIT