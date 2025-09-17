# BetterFlow UI

A modern, responsive workplace management dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

![BetterFlow Logo](public/logo.svg)

## 🚀 Features

### Core Functionality
- **🔐 Authentication System** - Role-based access control with 4 user roles
- **📊 Interactive Dashboard** - Real-time widgets and analytics
- **⏰ Time Management** - Timesheet tracking and leave management
- **📈 Project Management** - Project overview with Gantt charts
- **👥 User & Client Management** - Comprehensive user and client administration
- **📱 Responsive Design** - Mobile-first approach with tablet and desktop optimization
- **🌙 Dark Mode** - System-aware theme switching
- **♿ Accessibility** - WCAG AA compliant with keyboard navigation

### Performance Features
- **⚡ Code Splitting** - Automatic route-based code splitting
- **🖼️ Image Optimization** - Next.js Image component with lazy loading
- **📜 Virtual Scrolling** - Efficient rendering of long lists
- **🎯 Performance Monitoring** - Built-in performance metrics tracking

### UI/UX Enhancements
- **✨ Smooth Animations** - Framer Motion powered transitions
- **🎨 Modern Design System** - Consistent component library
- **⌨️ Keyboard Shortcuts** - Power user productivity features
- **📱 Touch Gestures** - Swipe support for mobile navigation

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 3.4+
- **UI Components:** shadcn/ui (Radix UI)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React
- **State:** React Context API

## 📦 Installation

### Prerequisites
- Node.js 20.0.0+ (LTS)
- npm 10+ or yarn 1.22+

### Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/betterflow-ui.git
cd betterflow-ui
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Test Accounts

Use these credentials to explore different user roles:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | tudor@betterqa.com | SuperAdmin123! |
| Admin | admin@betterflow.eu | Admin123! |
| User | john.doe@betterflow.eu | User123! |
| Client | client@newbridgefx.com | Client123! |

## 📁 Project Structure

\`\`\`
betterflow-ui/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── animations/        # Animation components
│   ├── accessibility/     # Accessibility features
│   └── performance/       # Performance optimizations
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
├── public/                # Static assets
└── types/                 # TypeScript definitions
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary:** #9152DE (Purple)
- **Primary Dark:** #5F29A1
- **Accent:** #204782 (Blue)
- **Grays:** #2C3E50, #7F8C8D, #ECF0F1

### Typography
- **Font Family:** Inter
- **Headings:** Bold, varied sizes
- **Body:** Regular, 14px base

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Open command palette |
| `Ctrl/Cmd + D` | Go to Dashboard |
| `Ctrl/Cmd + T` | Go to Timesheets |
| `Ctrl/Cmd + L` | Go to Leaves |
| `Alt + H` | Home |
| `Alt + S` | Focus search |
| `Alt + N` | Notifications |
| `Escape` | Close modal/dialog |

## 📊 Performance Metrics

The app includes built-in performance monitoring:
- **FPS Counter** - Real-time frame rate monitoring
- **Memory Usage** - JavaScript heap size tracking
- **Web Vitals** - LCP, FID, CLS, FCP, TTFB
- **Load Time** - Page load performance

## ♿ Accessibility Features

- **Skip Links** - Quick navigation for screen readers
- **ARIA Labels** - Semantic markup for assistive technologies
- **Focus Management** - Trap focus in modals and dialogs
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Tested with NVDA and JAWS

## 🧪 Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests (if configured)
npm run test:e2e     # E2E tests (if configured)
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Docker
\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
\`\`\`

### Environment Variables
\`\`\`env
NEXT_PUBLIC_API_URL=https://api.betterflow.eu
NEXT_PUBLIC_APP_URL=https://betterflow.eu
\`\`\`

## 📈 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set

## 📞 Support

For support, email support@betterflow.eu or visit our [Help Center](https://betterflow.eu/help).

---

Built with ❤️ by the BetterFlow Team