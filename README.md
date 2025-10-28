# SkillForge - AI-Powered Learning Platform

An intelligent e-learning platform that leverages AI to personalize student learning paths and dynamically generate assessments tailored to each user's skill level.

## 🚀 Features

### Role-Based Access
- **Student Dashboard**: Personalized learning paths, adaptive content recommendations, progress tracking
- **Instructor Panel**: Course creation, content upload (videos, PDFs, links), student analytics
- **Admin Console**: Platform oversight, user management, system analytics

### AI-Powered Learning
- Adaptive learning engine that adjusts content difficulty based on performance
- Dynamic exam generation tailored to skill levels
- Personalized course recommendations
- Real-time progress tracking with visual analytics

### Immersive Experience
- 3D animated landing page with interactive elements
- Glassmorphic UI with smooth animations
- Gradient accents and responsive design
- Modern, intuitive interface

## 🔐 Demo Credentials

Access the platform using these demo accounts:

**Student Account:**
- Email: `student@skillforge.com`
- Password: `student123`

**Instructor Account:**
- Email: `instructor@skillforge.com`
- Password: `instructor123`

**Admin Account:**
- Email: `admin@skillforge.com`
- Password: `admin123`

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: TanStack Query

## 📦 Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🎨 Design System

SkillForge uses a comprehensive design system with:
- **Primary Color**: Deep purple (#8b5cf6) - Learning & AI
- **Accent Color**: Cyan (#00d9ff) - Innovation & Technology
- **Gradients**: Animated hero gradients, glassmorphic cards
- **Animations**: Smooth transitions, floating elements, glow effects

All colors are defined using HSL in the design system for easy theming.

## 📱 Pages & Routes

- `/` - Landing page with 3D hero
- `/login` - Authentication page
- `/register` - User registration
- `/student/dashboard` - Student learning interface
- `/instructor/dashboard` - Course management panel
- `/admin/dashboard` - Platform administration

## 🔧 Development

### Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── Hero3D.tsx     # 3D animated hero
│   ├── Navbar.tsx     # Navigation component
│   └── DashboardLayout.tsx  # Dashboard wrapper
├── pages/             # Route pages
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── StudentDashboard.tsx
│   ├── InstructorDashboard.tsx
│   └── AdminDashboard.tsx
├── lib/               # Utilities
└── index.css          # Design system & globals
```

## 🚀 Deployment

Deploy your SkillForge instance:

1. Open [Lovable](https://lovable.dev/projects/783f52f2-f800-4ae6-aa4e-da5b111fe471)
2. Click Share → Publish
3. Your platform will be live!

## 🌐 Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the setup instructions

Learn more: [Custom Domain Setup](https://docs.lovable.dev/features/custom-domain)

## 📖 Documentation

- [Lovable Documentation](https://docs.lovable.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

This is a demo project showcasing an AI-powered learning platform. Feel free to extend it with:
- Real backend integration (Lovable Cloud/Supabase)
- Actual AI model integration
- Payment processing
- Video streaming
- Real-time collaboration features

## 📄 License

This project was created with Lovable and is available for educational and demonstration purposes.

---

**Built with 💜 using Lovable** - Where AI meets education to forge new skills.
