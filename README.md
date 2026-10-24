# QR Studio ✦

Premium glassmorphism QR generator built with vanilla HTML, CSS and JavaScript.

![License](https://img.shields.io/badge/license-MIT-8b80ff) ![HTML](https://img.shields.io/badge/HTML5-structure-e34f26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-glassmorphism-1572b6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=111) ![Backend](https://img.shields.io/badge/backend-none-22a06b)

## Features
- Website, text, email, phone, Wi-Fi, WhatsApp QR payloads.
- Live preview, foreground/background colors, dot and corner patterns.
- 256/512/1024 output size, error-correction selection, optional local center logo.
- PNG and SVG export, copy encoded content, print.
- Six-item local browser history; remove entries or clear it.
- Responsive glassmorphism UI; no app backend, account, analytics, or QR-content upload.

## Files
`index.html` · `styles.css` · `app.js` · `tests/smoke-test.js` · `package.json` · `LICENSE`

## Run locally
Requires a current browser and internet for initial CDN library loading. From the project folder:

```bash
python -m http.server 8080
```
Open http://localhost:8080. Choose content type, enter content, customize, and press **Generate QR code**. QR generation is client-side; no backend or environment variables are required.

## Tests
```bash
npm test
# or
node tests/smoke-test.js
```
Smoke tests cover phone normalization, Wi-Fi escaping/open network payload, WhatsApp URL encoding, and invalid phone input. These are not browser end-to-end tests. Manually test each type, scan with a phone, check PNG/SVG, logo/no-logo, mobile layout and keyboard operation.

## Security and privacy
- QR payload and chosen logo are processed locally; this app does not upload them to a project server.
- Wi-Fi QR content includes the network password in its encoded payload. Anyone who obtains the code may be able to read/use it; share only with trusted people.
- History stores payloads in `localStorage`, accessible to people with access to that browser profile. Avoid shared devices for sensitive content and clear history when done.
- Don't encode passwords, private tokens or confidential data.
- JavaScript libraries are fetched from jsDelivr, so initial load needs internet and the page relies on third-party CDN availability. For fully offline use, vendor reviewed library files locally. This release does not claim Subresource Integrity protection.
- Logo overlays can make codes unscannable; high error correction helps but is no guarantee. Scan-test before distributing.

## Known limitations
- CDN libraries are not bundled, so first load requires internet.
- The history thumbnail is generic; loading a saved item restores its encoded payload as plain text rather than reconstructing all original form fields.
- Clipboard, print and scanner behavior varies by browser/device. Automated tests are lightweight smoke checks, not end-to-end tests.

## Free deployment
**GitHub Pages:** push the files to GitHub → repository Settings → Pages → Deploy from a branch → select `main` and `/(root)` → Save. No build command or environment variables.

**Netlify Drop:** visit https://app.netlify.com/drop and drag the project folder/ZIP into the drop area.

**Cloudflare Pages:** connect the repository as a static site; no build command, output directory is the repository root.

## Libraries
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- [qrcode](https://github.com/soldair/node-qrcode)

Check each library's license before redistributing bundled copies. See [LICENSE](LICENSE).
