# Filename Generator

A professional web-based tool for generating standardized attachment filenames for accessibility testing and documentation. The tool creates consistent, descriptive filenames following a structured format that includes date, platform, screen reader, and issue description.

## Features

- **Standardized Format**: Generates filenames in the format `Status-MM-DD-YYYY-Platform-ScreenReader-Description`
- **Professional UI**: Clean, modern interface following design principles from major tech companies
- **Real-time Validation**: Google-style error messages with instant feedback
- **Accessibility Compliant**: WCAG-compliant design with proper focus indicators and ARIA attributes
- **Smart Defaults**: Automatically selects appropriate screen readers based on platform
- **Copy Functionality**: One-click copying with visual feedback
- **Refresh Form**: Quick reset button to clear all fields and start over
- **Responsive Design**: Works seamlessly across different screen sizes

## Generated Filename Format

```
Status-MM-DD-YYYY-Platform-ScreenReader-Issue-Description
```

### Example Output
```
Failed-07-17-2025-iOS-VoiceOver-focus-moves-to-hidden-elements
```

## Platform & Screen Reader Mapping

| Platform | Default Screen Reader |
|----------|----------------------|
| iOS      | VoiceOver           |
| macOS    | VoiceOver           |
| Android  | TalkBack            |
| Web      | NVDA                |
| Windows  | NVDA                |
| Other    | Other               |

## Status Options

- **Fixed**: Issue has been resolved
- **NotFixed**: Issue remains unresolved
- **Failed**: Test case failed
- **Figma**: Design reference or mockup
- **Reference**: Reference material or documentation
- **Other**: Custom status type

## Technical Features

### Accessibility
- **WCAG Compliant**: Meets Web Content Accessibility Guidelines
- **Keyboard Navigation**: Full keyboard support for all controls
- **Screen Reader Friendly**: Proper ARIA labels and live regions
- **Focus Indicators**: Clear, consistent focus indicators with white gap design
- **Color Contrast**: Industry-standard color ratios for readability

### Validation
- **Real-time Error Checking**: Instant validation as you type
- **Google-style Error Messages**: Red borders and exclamation icons
- **Required Field Indicators**: Clear marking of mandatory fields
- **Smart Error Positioning**: Contextual error placement near form fields

### User Experience
- **Professional Styling**: Design inspired by Google, Apple, and Microsoft
- **Smooth Animations**: Subtle transitions and hover effects
- **Visual Feedback**: Interactive buttons with state changes
- **Quick Reset**: One-click refresh button to clear all form data
- **Clear Typography**: System fonts for optimal readability

## File Structure

```
Filename Generator/
├── index.html          # Main HTML structure
├── script.js          # JavaScript functionality and UI logic
├── styles.css          # Professional styling and animations
└── README.md          # This documentation file
```

## Usage

1. **Select Status**: Choose the appropriate status for your file
2. **Enter Title**: Describe the issue or content (e.g., "VoiceOver focus moves to hidden elements")
3. **Select Platform**: Choose the testing platform
4. **Generate**: Click "Generate Filename" to create the standardized name
5. **Copy**: Use the copy button to add the filename to your clipboard
6. **Refresh**: Click the refresh button (🔄) to clear all fields and start over

## Text Processing

The tool automatically processes text input to ensure clean, consistent filenames:

- **Contraction Expansion**: Converts contractions like "doesn't" to "does not"
- **Special Character Handling**: Replaces spaces and special characters with hyphens
- **Case Normalization**: Maintains consistent formatting throughout

## Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Dependencies

- **FontAwesome**: For icons (loaded via CDN)
- **Modern Browser**: ES6+ JavaScript support required

## Installation

### Local Development
1. Download or clone the project files
2. Ensure all files are in the same directory
3. Open `index.html` in a modern web browser
4. No additional setup required

### Deploy to GitHub Pages

#### Step 1: Create GitHub Repository
1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `filename-generator` or similar
   - Make sure it's **Public** (required for GitHub Pages)
   - Upload all project files to the repository

#### Step 2: Enable GitHub Pages
1. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **"Settings"** tab
   - Scroll down to **"Pages"** section in the left sidebar
   - Under **"Source"**, select **"Deploy from a branch"**
   - Choose **"main"** branch and **"/ (root)"** folder
   - Click **"Save"**

#### Step 3: Access Your Live Site
- Your app will be available at: `https://YOUR_USERNAME.github.io/filename-generator`
- It may take a few minutes for the site to be live
- GitHub Pages automatically updates when you push changes to the main branch

#### Option 2: Direct File Upload
1. **Prepare Files**:
   - Ensure all files (`index.html`, `script.js`, `styles.css`, `README.md`) are ready
   - Zip the project folder if needed

2. **Manual Deploy**:
   - Create new repository on GitHub
   - Upload all project files via web interface
   - Enable GitHub Pages in repository settings

#### Post-Deployment
- Your app will be available at `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`
- Free hosting with automatic HTTPS
- Automatic updates when you push changes
- Custom domain support available

## Development

The project uses vanilla JavaScript and CSS for maximum compatibility and performance. Key architectural decisions:

- **Modular JavaScript**: Clear separation of functionality
- **CSS Custom Properties**: Consistent design tokens
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Mobile-First Design**: Responsive layout principles

## Contributing

When contributing to this project, please maintain:

- **Accessibility Standards**: All features must be keyboard and screen reader accessible
- **Design Consistency**: Follow the established visual patterns
- **Code Quality**: Use clear, documented code with consistent formatting
- **Testing**: Verify functionality across different browsers and assistive technologies

## License

This project is open source and available under the MIT License.

## Changelog

### Version 1.0
- Initial release with core filename generation
- Professional UI implementation
- Accessibility compliance
- Google-style validation
- Consistent focus indicators
- Copy functionality with visual feedback
- Refresh form functionality for quick reset

---

**Note**: This tool is designed for accessibility testing workflows and creates filenames that help organize and identify test artifacts efficiently.
