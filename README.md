# ✦ QR Studio

### Premium QR Code Generator with Glassmorphism UI

A modern, responsive QR code generator built with **HTML5, CSS3, and vanilla JavaScript**. Create, customize, preview, and download QR codes directly in your browser — without an app backend or paid API.

<p align="center">
  <a href="https://arjunsharma-55.github.io/QR-Studio/">
    <strong>🚀 LIVE DEMO — TRY QR STUDIO</strong>
  </a>
</p>

<p align="center">
  <a href="https://arjunsharma-55.github.io/QR-Studio/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Open_QR_Studio-8b80ff?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Status-Live-22a06b?style=for-the-badge" alt="Project Status">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Structure-e34f26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Glassmorphism-1572b6?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=flat&logo=javascript&logoColor=111" alt="JavaScript">
  <img src="https://img.shields.io/badge/Backend-None-22a06b?style=flat" alt="No Backend">
  <img src="https://img.shields.io/badge/License-MIT-8b80ff?style=flat" alt="MIT License">
</p>

---

## 🌐 Live Demo

**Website:** https://arjunsharma-55.github.io/QR-Studio/

Open the live website to create QR codes, customize their appearance, and download them for your projects.

> Note: The page requires an internet connection to load its JavaScript libraries from the CDN.

---

## 📌 Overview

QR Studio is a browser-based QR code generator designed with a premium glassmorphism interface. It supports multiple types of content and provides customization and export options in a simple interface.

### ✨ Highlights

- Multiple QR content types
- Live QR preview
- Custom colors and patterns
- PNG and SVG export
- Optional center logo
- Browser-based history
- Responsive user interface
- No application backend or paid API required

---

## 🚀 Features

### 📱 QR Code Generation

Generate QR codes for:

- 🌐 Website URLs
- 📝 Plain text
- 📧 Email addresses
- 📞 Phone numbers
- 📶 Wi-Fi network details
- 💬 WhatsApp links and messages

### 🎨 Customization

- Customize foreground and background colors.
- Choose supported dot and corner styles.
- Select output sizes: 256, 512, or 1024 pixels.
- Configure error-correction levels.
- Add an optional local image logo to the QR code.
- Preview the result before downloading.

### 📥 Export and Sharing

- Download QR codes as PNG.
- Export supported QR designs as SVG.
- Copy the encoded QR content.
- Print the generated QR code.

### 🕘 Browser History

- Keep up to six recent QR payloads in browser storage.
- Remove individual history entries.
- Clear saved history when needed.

**Note:** Loading a saved history item restores its encoded payload as plain text; it does not reconstruct every original form field.

### 📱 Responsive Interface

- Premium glassmorphism-inspired styling.
- Responsive layout for different screen sizes.
- Modern controls and clear content sections.
- No account registration required.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, layout, and glassmorphism UI |
| JavaScript | QR generation and interface logic |
| qr-code-styling | QR customization and rendering |
| qrcode | QR-code generation utilities |
| localStorage | Local browser history |
| GitHub Pages | Static website hosting |

---

## 📂 Project Structure

```text
QR-Studio/
├── index.html
├── styles.css
├── app.js
├── package.json
├── README.md
├── LICENSE
├── .gitignore
└── tests/
    └── smoke-test.js
```

---

## 💻 Run Locally

### Prerequisites

- A modern web browser
- Python 3 or another static HTTP server
- Internet access to load the CDN-hosted JavaScript libraries

### 1. Clone the repository

```bash
git clone https://github.com/ArjunSharma-55/QR-Studio.git
```

### 2. Open the project folder

```bash
cd QR-Studio
```

### 3. Start a local server

```bash
python -m http.server 8080
```

### 4. Open the application

Visit:

```text
http://localhost:8080
```

Choose a content type, enter the required details, customize the design, and select **Generate QR code**.

QR generation runs in the browser. No backend server or environment variables are required.

---

## 🧪 Testing

Run the included smoke tests with:

```bash
npm test
```

Alternatively:

```bash
node tests/smoke-test.js
```

The smoke tests cover:

- Phone number normalization
- Wi-Fi payload escaping
- Open Wi-Fi network payloads
- WhatsApp URL encoding
- Invalid phone number handling

**Testing limitation:** These are lightweight smoke tests, not browser end-to-end tests.

### Recommended Manual Tests

- [ ] Generate a website QR code.
- [ ] Generate text, email, phone, Wi-Fi, and WhatsApp QR codes.
- [ ] Scan generated codes using a phone.
- [ ] Test PNG and SVG exports.
- [ ] Test with and without a center logo.
- [ ] Check mobile and desktop layouts.
- [ ] Test keyboard navigation and form validation.
- [ ] Verify history removal and clearing.

---

## 🔐 Security and Privacy

- QR payloads and selected logo images are processed in the browser; the application does not upload them to its own project server.
- The app does not require an account, application backend, or environment variables.
- Browser history is stored in `localStorage` and may be accessible to other people using the same browser profile.
- Wi-Fi QR codes can contain network passwords. Share them only with trusted people.
- Avoid encoding confidential information, private tokens, or sensitive credentials.
- JavaScript libraries are loaded from jsDelivr, so the initial page load requires internet access and depends on third-party CDN availability.
- The current release does not claim Subresource Integrity protection.
- A logo overlay can reduce scan reliability. Always scan-test QR codes before distributing them.

---

## ⚠️ Known Limitations

- CDN-hosted libraries are not bundled with the repository.
- The first load requires internet access to fetch those libraries.
- Saved history entries do not reconstruct all original form fields.
- Clipboard, printing, and scanning behavior may vary by browser and device.
- Smoke tests do not replace browser-based integration or end-to-end testing.
- A QR code's appearance and logo overlay can affect scan reliability.

---

## 🌍 Free Deployment

### Option 1: GitHub Pages

1. Push the project files to your GitHub repository.
2. Open **Settings → Pages**.
3. Under the build and deployment section, select **Deploy from a branch**.
4. Select the `main` branch and `/(root)` folder.
5. Click **Save**.
6. Wait for deployment and open the published URL.

Live website:

https://arjunsharma-55.github.io/QR-Studio/

No build command or environment variables are required for this static project.

### Option 2: Netlify

1. Visit https://app.netlify.com/drop
2. Upload the project folder or a ZIP containing the project files.
3. Wait for deployment.
4. Open the URL provided by Netlify.

### Option 3: Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages.
2. Configure it as a static website.
3. Leave the build command empty.
4. Set the output directory to the repository root.
5. Deploy the project.

Provider setup screens may change over time.

---

## 📚 Libraries and References

- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- [qrcode](https://github.com/soldair/node-qrcode)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

Review each library's license before redistributing bundled copies. See the repository's [LICENSE](LICENSE) file for this project's license.

---

## 👨‍💻 Author

**Arjun Sharma**

- GitHub: [@ArjunSharma-55](https://github.com/ArjunSharma-55)
- Project Repository: [QR Studio](https://github.com/ArjunSharma-55/QR-Studio)
- Live Website: [Open QR Studio](https://arjunsharma-55.github.io/QR-Studio/)

---

## 🤝 Contributions

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Submit a pull request describing your changes.

---

## 📄 License

This project is distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>✦ QR Studio — Create. Customize. Scan.</strong>
  <br>
  Built with HTML, CSS and JavaScript.
  <br><br>
  <a href="https://arjunsharma-55.github.io/QR-Studio/">
    🌐 Visit Live Demo
  </a>
</p>
