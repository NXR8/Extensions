
# DeepSeek Direction Adjuster

[![Firefox Add-on](https://img.shields.io/amo/v/deepseek-direction-adjuster?label=Firefox&color=orange)](https://addons.mozilla.org/en-US/firefox/addon/deepseek-direction-adjuster/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Manifest Version](https://img.shields.io/badge/Manifest-v3-green.svg)

A browser extension that adds dynamic direction controls (LTR/RTL) to content blocks in DeepSeek's chat interface.

![Demo](https://raw.githubusercontent.com/NXR8/Extensions/main/DeepSeek-Direction-Adjuster/assets/demo.gif)

## Features
- 🔄 Toggle text direction between LTR and RTL
- 🎯 Context-aware buttons for individual content blocks
- 🚀 Automatic detection of new dynamically loaded content
- 🎨 Smooth button animations and intuitive UI
- 🔒 Works without unnecessary permissions

## Installation
### Firefox Users
[![Install for Firefox](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)](https://addons.mozilla.org/en-US/firefox/addon/deepseek-direction-adjuster/)

### Manual Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/NXR8/Extensions.git
   ```
2. Navigate to the extension directory:
   ```bash
   cd Extensions/DeepSeek-Direction-Adjuster
   ```
3. Load in Firefox:
   - Visit `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select a zip file in the directory

## How It Works
The extension uses a combination of DOM manipulation and Mutation Observers to:

1. Detect `.ds-markdown` content blocks
2. Inject directional toggle buttons
3. Handle both static and dynamically loaded content
4. Maintain proper text direction in code blocks and equations

```javascript
// Simplified core logic
const observer = new MutationObserver(() => {
  document.querySelectorAll('.ds-markdown').forEach(block => {
    if (!block.dataset.processed) {
      injectToggleButton(block);
    }
  });
});
```

## Technical Specifications
- **Manifest Version**: 3
- **Permissions**: 
  - `scripting`
  - Access to `https://chat.deepseek.com/*`
- **Compatibility**: 
  - Firefox 109+
  - Chromium-based browsers (manual loading)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add some improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Note**: Requires DeepSeek chat interface (chat.deepseek.com) to function. Not affiliated with DeepSeek.
