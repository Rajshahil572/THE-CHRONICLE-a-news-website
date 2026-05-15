# News Reels Feature - The Chronicle

## Overview
A modern, immersive news consumption experience featuring vertical swipe-through news stories with audio narration, similar to TikTok/Instagram Reels but for premium journalism.

## Features

### 🎯 Core Functionality
- **Vertical Swipe Interface**: Smooth scrolling between news stories
- **Audio Narration**: Automatic text-to-speech for headlines and summaries
- **Touch & Mouse Support**: Works on mobile and desktop
- **Keyboard Navigation**: Arrow keys, spacebar, and shortcuts

### 🎨 Visual Design
- **Glassmorphism UI**: Modern backdrop-filter effects
- **Premium Typography**: Uses The Chronicle's serif and condensed fonts
- **Animated Backgrounds**: Gradient overlays with subtle animations
- **Progress Indicators**: Vertical progress bars showing current position

### 📱 Interactive Elements
- **Like System**: Heart button with animation and localStorage persistence
- **Bookmark System**: Save reels for later viewing
- **Share Functionality**: Native Web Share API with clipboard fallback
- **Mute Controls**: Toggle audio narration on/off

### 🧠 Smart Features
- **Category Preferences**: Tracks liked categories for personalized feed
- **Saved Reels Panel**: Slide-out panel showing bookmarked content
- **Intelligent Recommendations**: Prioritizes similar news based on preferences

### ⌨️ Controls
- **Swipe Up/Down**: Navigate between reels
- **Mouse Wheel**: Desktop scrolling navigation
- **Arrow Keys**: Keyboard navigation
- **Spacebar**: Pause/resume narration
- **L Key**: Like current reel
- **M Key**: Toggle mute
- **Escape**: Close panels

## Technical Implementation

### Files
- `reels.html` - Main News Reels interface
- `index.html` - Homepage with floating News Reels button

### Technologies
- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Web Speech API** - For audio narration
- **LocalStorage** - For persistence
- **CSS Animations** - Smooth transitions and effects
- **Touch Events** - Mobile gesture support

### Browser Support
- Modern browsers with Web Speech API support
- Mobile browsers with touch events
- Graceful fallbacks for unsupported features

## Usage

### Accessing News Reels
1. Visit the homepage (`index.html`)
2. Click the floating red "News Reels" button (right side, center)
3. Experience immersive vertical news consumption

### Sample Content
The feature includes 10 sample news reels covering:
- AI & Technology
- India News
- Climate Change
- Space Exploration
- Economy
- Sports
- Science
- Politics
- Culture
- Health

## Development

### Running Locally
```bash
cd news-website
python -m http.server 8000
# Visit http://localhost:8000/reels.html
```

### Customization
- **News Content**: Edit the `NEWS_REELS` array in `reels.html`
- **Styling**: Modify CSS variables and classes
- **Audio**: Adjust speech synthesis settings
- **Animations**: Customize transition timings and effects

## Performance Optimizations
- **Lazy Loading**: Reels load as needed
- **Debounced Events**: Smooth scroll handling
- **Efficient Animations**: GPU-accelerated transforms
- **Memory Management**: Proper cleanup of audio resources

## Future Enhancements
- Real-time news updates via WebSocket
- User accounts and cloud sync
- Advanced recommendation algorithms
- Video reel support
- Social features (comments, following)
- Offline reading capabilities

---

*Built for The Chronicle — Truth · Depth · Independence*