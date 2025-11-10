# 🕌 Moroccan Prayer Times

<div align="center">

![Moroccan Prayer Times](https://img.shields.io/badge/Prayer-Times-0f1035?style=for-the-badge&logo=islam&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-d2e9e9?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-c4dfdf?style=for-the-badge)

**A beautiful, responsive web application for displaying accurate prayer times across Morocco**

</div>

## ✨ Features

### 🎨 Beautiful Design
- **Gradient Background** - Animated gradient that shifts colors smoothly
- **Glass Morphism** - Modern glass-like cards with backdrop filters
- **Smooth Animations** - Elegant transitions and hover effects
- **Responsive Layout** - Perfectly adapted for all devices

### 🌍 Multi-Language Support
- **English** - Complete English interface
- **French** - Interface en Français  
- **Arabic** - واجهة باللغة العربية
- **Automatic RTL** - Right-to-left layout for Arabic

### 🕌 Accurate Prayer Times
- **Real-time Data** - Fetches from reliable Aladhan API
- **Multiple Cities** - 12 major Moroccan cities
- **Countdown Timer** - Live countdown to next prayer
- **Automatic Updates** - Refreshes every minute

### ⏰ Smart Features
- **Next Prayer Highlight** - Visual indication of current/next prayer
- **Live Countdown** - Real-time timer until next prayer
- **Date Display** - Localized date in selected language
- **City Selection** - Easy switching between cities

## 🚀 Quick Start

### Method 1: Direct Usage
Simply open `index.html` in your web browser - no setup required!

### Method 2: Web Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure & Semantics |
| **CSS3** | Styling & Animations |
| **JavaScript** | Functionality & API Calls |
| **Bootstrap 5** | Responsive Framework |
| **Aladhan API** | Prayer Times Data |

## 📁 File Structure

```
moroccan-prayer-times/
├── 📄 index.html          # Main application file
├── 🎨 style.css           # Styles and animations  
├── ⚡ script.js           # Application logic
└── 📖 README.md          # This documentation
```

## 🎯 Usage Guide

### Changing Language
1. Click the language dropdown at the top
2. Select from English, French, or Arabic
3. Interface updates instantly with proper RTL support

### Selecting City
1. Use the city dropdown below the title
2. Choose from 12 Moroccan cities
3. Prayer times update automatically

### Understanding the Display
- **Countdown Timer**: Time remaining until next prayer
- **Highlighted Prayer**: Current or next prayer in active state
- **Prayer Cards**: Individual cards for each prayer with times

## 🏙️ Supported Cities

- Marrakech
- Casablanca  
- Rabat
- Salé
- Fès
- Tanger
- Agadir
- Meknès
- Oujda
- Tetouan
- Al Hoceima
- Ouarzazate

## 🎨 Customization

### Colors & Themes
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #0f1035;    /* Main brand color */
    --secondary-color: #d2e9e9;  /* Secondary color */
    --accent-color: #c4dfdf;     /* Accent color */
    --gradient-start: rgba(0, 255, 0, 0.382);
    --gradient-end: rgba(0, 0, 255, 0.328);
}
```

### Adding Cities
Add new cities in `index.html`:
```html
<option value="CityName">Display Name</option>
```

## 🌐 API Integration

The app uses the [Aladhan API](https://aladhan.com/prayer-times-api) with:
- **Method 4** (Muslim World League)
- **Morocco** country code
- Real-time city-based calculations

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| Mobile Browsers | ✅ Full support |

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests for:
- New features
- Bug fixes  
- Translation improvements
- Design enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aladhan.com** for providing accurate prayer times API
- **Google Fonts** for beautiful typography (Urbanist, Amiri)
- **Bootstrap** for responsive components
- **Muslim community** for inspiration and testing

---

<div align="center">

### 🕋 "And establish prayer and give zakah and bow with those who bow." - Quran 2:43

**Made with ❤️ for the Muslim community in Morocco**

*May this application help you in maintaining your prayers on time*

</div>
