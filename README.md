# 🌐 WEB3 PORTFOLIO

A modern, real-time Web3 portfolio tracking application built with React, TypeScript, and cutting-edge Web3 technologies. Track your cryptocurrency investments with beautiful animations and real-time data visualization.

![WEB3 PORTFOLIO](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.0-purple)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.19.2-green)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful glass-like interface with blur effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **3D Animations**: Animated Web3 hero with rotating hexagons and particles
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 📊 **Portfolio Management**
- **Real-time Charts**: Live portfolio performance with Recharts
- **Drag & Drop**: Reorder assets with smooth animations
- **Add/Edit/Remove**: Full CRUD operations for portfolio assets
- **Interactive Modals**: Beautiful animated modals for asset management

### 📈 **Market Data**
- **Live Crypto Prices**: Real-time price updates every 3 seconds
- **Market Overview**: Area charts showing market trends
- **Top Performers**: Bar charts highlighting best performing assets
- **Price Alerts**: Set custom alerts for price movements

### 🔔 **Smart Notifications**
- **Price Alerts**: Create alerts for specific price targets
- **Toast Notifications**: Beautiful feedback for all actions
- **Settings Management**: Toggle notifications and auto-refresh

### 🛡️ **Authentication**
- **Login System**: Secure authentication flow
- **Session Management**: Persistent login state
- **Demo Mode**: Use any email/password for testing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/garvnet/gavi-portfolio.git
   cd gavi-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Lucide React

## 📁 Project Structure

```
gavi-portfolio/
├── src/
│   ├── App.tsx              # Main application component
│   ├── Web3Hero.tsx         # Animated Web3 hero component
│   ├── App.css              # Global styles and animations
│   ├── index.css            # Base styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 Key Components

### Web3Hero
- Animated hexagonal design with gradient colors
- Rotating animations and scaling effects
- Floating particles and blockchain nodes
- Scalable design for different use cases

### Portfolio Management
- Drag and drop asset reordering
- Real-time price updates
- Interactive charts and graphs
- Modal-based asset editing

### Settings Panel
- Dark/Light mode toggle
- Notification preferences
- Auto-refresh settings
- Profile management

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: 60fps animations with Framer Motion
- **Particle Effects**: Interactive particle systems
- **3D Transformations**: CSS 3D transforms and effects

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adaptive layout with touch-friendly controls
- **Mobile**: Mobile-first design with optimized interactions

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=WEB3 PORTFOLIO
VITE_API_URL=your_api_url_here
```

### Customization
- Modify colors in `src/App.css`
- Update animations in component files
- Customize charts in respective components

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy to GitHub Pages
3. Configure base URL in `vite.config.ts`

### Vercel/Netlify
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Recharts** for beautiful data visualization
- **Tailwind CSS** for utility-first styling
- **Three.js** for 3D graphics capabilities

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact: [@garvnet](https://github.com/garvnet)

---

**Made with ❤️ by [@garvnet](https://github.com/garvnet)**
