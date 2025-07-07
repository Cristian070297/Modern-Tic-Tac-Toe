# 🎮 Modern Tic-Tac-Toe

A sleek, modern implementation of the classic Tic-Tac-Toe game featuring an intelligent AI opponent, beautiful animations, and immersive audio experience.

![Game Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### 🎯 Core Gameplay
- **AI Opponent**: Intelligent minimax algorithm that provides challenging gameplay
- **Human vs Human**: Classic two-player mode
- **Score Tracking**: Persistent score counter for competitive play
- **Instant Win Detection**: Real-time game state analysis

### 🎨 Modern Design
- **Glassmorphism UI**: Beautiful frosted glass effects with backdrop blur
- **Dark Theme Grid**: Sleek black game board with neon-style markers
- **Smooth Animations**: Fluid transitions and hover effects
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Modern Typography**: Clean Poppins font throughout

### 🎵 Audio Experience
- **Background Music**: Customizable MP3 background music support
- **Sound Effects**: Interactive audio feedback for all game actions
- **Audio Controls**: Easy toggle for music and sound effects
- **Procedural Audio**: Web Audio API generated sound effects

### ⚡ Advanced Features
- **Keyboard Support**: Use number keys 1-9 to play, 'R' to reset
- **Visual Feedback**: Glowing effects for X and O markers
- **Winner Celebrations**: Animated confetti and victory sequences
- **Dark Mode Support**: Automatic system preference detection


## 🛠️ Installation

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/Cristian070297/Modern-Tic-Tac-Toe.git
   cd Modern-Tic-Tac-Toe
   ```

2. **Add background music (optional)**
   - Place your MP3 file in the project folder
   - Rename it to `background-music.mp3`

3. **Launch the game**
   - Open `index.html` in your web browser
   - Or serve with a local server:
     ```bash
     python -m http.server 8000
     # Then open http://localhost:8000
     ```

## 🎮 How to Play

### Game Controls
- **Mouse**: Click on any empty cell to place your marker
- **Keyboard**: Use keys 1-9 to select cells (arranged like a numpad)
- **Reset**: Press 'R' key or click "New Game" button

### Game Modes
- **🤖 AI Mode**: Challenge the intelligent AI opponent
- **👥 Human Mode**: Play against another person locally

### Audio Controls
- **🎵 Music Button**: Toggle background music on/off
- **Volume**: Music is set to 30% by default for comfortable gameplay

## 🧠 AI Algorithm

The AI uses the **Minimax Algorithm** with the following characteristics:
- **Perfect Play**: The AI makes optimal moves and is very challenging to beat
- **Lookahead**: Evaluates all possible future game states
- **Adaptive Difficulty**: Plays at maximum strength consistently
- **Response Time**: Includes realistic thinking delay for better UX

### Algorithm Implementation
```javascript
// Minimax with depth-limited search
function minimax(board, depth, isMaximizing) {
    // Evaluates board state and returns best move
    // Maximizing for AI (O), Minimizing for Human (X)
}
```

## 🎨 Design System

### Color Palette
- **Primary**: `#4f46e5` → `#7c3aed` (Purple gradient)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Player X**: `#ff6b6b` (Red with glow)
- **Player O**: `#4ecdc4` (Cyan with glow)

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 600, 700

### Animations
- **Slide In**: Container entrance animation
- **Pop In**: Marker placement animation
- **Glow Effect**: Winner celebration animation
- **Hover Effects**: Interactive feedback

## 🔧 Technical Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with flexbox/grid
- **JavaScript ES6+**: Game logic and interactivity
- **Web Audio API**: Sound generation and playback

### Features Used
- **CSS Grid**: Game board layout
- **CSS Animations**: Smooth transitions
- **Local Storage**: Score persistence (planned)
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Modern-Tic-Tac-Toe/
├── index.html              # Main HTML file
├── style.css               # Stylesheet with animations
├── script.js               # Game logic and AI
├── audio.js                # Audio management system
├── background-music.mp3    # Background music (user-provided)
├── README.md               # This file
└── assets/                 # (Optional) Additional resources
```

## 🎯 Game Logic

### Win Conditions
The game checks for wins in:
- **Rows**: Horizontal three-in-a-row
- **Columns**: Vertical three-in-a-row  
- **Diagonals**: Both diagonal directions

### AI Strategy
1. **Win**: Take winning move if available
2. **Block**: Prevent opponent from winning
3. **Center**: Prefer center square
4. **Corners**: Choose corners over edges
5. **Random**: Fallback to available moves

## 🔄 Future Enhancements

### Planned Features
- [ ] **Difficulty Levels**: Easy, Medium, Hard AI modes
- [ ] **Online Multiplayer**: Play against friends remotely
- [ ] **Game Statistics**: Detailed analytics and history
- [ ] **Custom Themes**: Multiple color schemes
- [ ] **Tournament Mode**: Best of 3/5/7 matches
- [ ] **Achievements**: Unlock rewards for milestones

### Technical Improvements
- [ ] **Progressive Web App**: Offline gameplay support
- [ ] **Local Storage**: Persistent game statistics
- [ ] **Performance Optimization**: Reduced bundle size
- [ ] **Accessibility**: Screen reader support

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and formatting
- Add comments for complex logic
- Test on multiple browsers and devices
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration**: Classic Tic-Tac-Toe game
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Unicode emoji characters
- **Algorithm**: Minimax algorithm implementation
- **Design**: Modern glassmorphism trends

## 📞 Contact

**Cristian** - [@Cristian070297](https://github.com/Cristian070297)

Project Link: [https://github.com/Cristian070297/Modern-Tic-Tac-Toe](https://github.com/Cristian070297/Modern-Tic-Tac-Toe)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Cristian](https://github.com/Cristian070297)
