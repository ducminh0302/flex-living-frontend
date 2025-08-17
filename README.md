# Flex Living Frontend - Reviews Dashboard

A modern React application for managing and displaying property reviews for Flex Living properties.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ LTS
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:2332`

## 🛠️ Tech Stack

- **Framework**: React 19.1.1 with TypeScript 5.9.2
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand 5.0.7
- **Data Fetching**: TanStack Query 5.85.3
- **Forms**: React Hook Form 7.62.0 + Zod 4.0.17
- **Charts**: Chart.js 4.5.0
- **Icons**: Lucide React 0.539.0
- **Routing**: React Router DOM 7.8.1

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 🎯 Current Status

This is the initial setup with basic project infrastructure:

✅ **Completed**:
- React + TypeScript + Vite project setup
- Tailwind CSS configuration with custom theme
- TypeScript types and API service layer
- Basic routing structure
- Dashboard and public pages foundation
- Development environment configuration

🚧 **Next Steps**:
- Implement advanced dashboard features
- Add data visualization components
- Build review management interface
- Create responsive design system
- Add comprehensive error handling
- Setup testing framework

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:3001/api
VITE_API_TIMEOUT=15000
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
VITE_APP_ENV=development
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_ENABLE_REQUEST_LOGGING=true
```

## 📝 Development Notes

This frontend application is designed to work with the Flex Living Reviews Dashboard backend API. The project follows modern React patterns and includes:

- Type-safe API communication
- Responsive design with mobile-first approach
- Modern state management
- Performance optimizations
- Accessible UI components

## 🎨 Design System

The application uses a custom Tailwind configuration with:
- Primary color palette (blue-based)
- Custom components (cards, buttons, forms)
- Consistent spacing and typography
- Responsive breakpoints
- Professional shadows and animations
