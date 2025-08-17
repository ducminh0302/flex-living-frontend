# 🚀 Quick Start Guide

## 📋 **Prerequisites**
- Node.js 18+ LTS installed
- Backend API running on `http://localhost:3001` (optional for UI development)

## ⚡ **Getting Started**

### 1. Install Dependencies
```bash
npm install
# Already completed! ✅
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_API_TIMEOUT=15000

# Google Services (optional)
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key

# Application Settings
VITE_APP_ENV=development
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_ENABLE_REQUEST_LOGGING=true
```

### 3. Start Development Server
```bash
npm run dev
```
The application will be available at: `http://localhost:2332`

## 🎯 **Available Pages**

| Route | Description | Status |
|-------|-------------|---------|
| `/` | Public homepage with property listing | ✅ Ready |
| `/property/:id/reviews` | Public property reviews page | ✅ Ready |
| `/dashboard` | Manager dashboard overview | ✅ Ready |
| `/dashboard/properties` | Property management (placeholder) | 🚧 Next phase |

## 🛠️ **Development Commands**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🧪 **Testing the Application**

### **Without Backend API**
The application includes mock data and loading states, so you can:
- ✅ View the responsive design
- ✅ Test navigation between pages
- ✅ See loading skeletons and error states
- ✅ Inspect component architecture

### **With Backend API**
Once the Flex Living Reviews Dashboard backend is running:
- ✅ Full data integration
- ✅ Real-time review management
- ✅ Property statistics
- ✅ Review approval workflow

## 📁 **Key Files to Understand**

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main routing and layout logic |
| `src/components/Layout.tsx` | Responsive layout with sidebar |
| `src/services/api.ts` | API integration layer |
| `src/stores/` | Global state management |
| `src/types/api.ts` | TypeScript definitions |

## 🎨 **Design System**

### **Colors**
- Primary: Blue-based (`primary-50` to `primary-900`)
- Grays: Professional gray scale
- Status: Success (green), Error (red), Warning (yellow)

### **Components**
```tsx
// Button variants
<Button variant="primary|secondary|danger|ghost" size="sm|md|lg">
  Click me
</Button>

// Card with different options
<Card padding="sm|md|lg" shadow="sm|md|lg" hover={true}>
  Content
</Card>

// Star rating display
<StarRating rating={4.5} showValue={true} size="sm|md|lg" />
```

## 🔄 **State Management**

### **App Store** (Global UI State)
```tsx
const { addNotification, theme, sidebarOpen } = useAppStore()
```

### **Review Store** (Review Management)
```tsx
const { reviews, filters, selectedReviews, setFilters } = useReviewStore()
```

### **API Hooks** (Data Fetching)
```tsx
const { data: properties, isLoading } = useProperties()
const { data: reviews } = usePublicReviews(propertyId)
```

## 🚀 **Ready for Phase 2**

Phase 1 Foundation is complete! Next development phase will add:

1. **Review Management Table** - Sortable, filterable table
2. **Data Visualization** - Charts and analytics
3. **Advanced Filtering** - Multi-criteria filtering system
4. **Review Approval** - Bulk operations and approval workflow
5. **Enhanced Public Display** - Beautiful review cards

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Port 5173 already in use**
   ```bash
   # Vite will automatically try the next available port
   # Or specify a different port in vite.config.ts
   ```

2. **API Connection Issues**
   - Check backend server is running on port 3001
   - Verify CORS settings in backend
   - Check network requests in browser DevTools

3. **TypeScript Errors**
   - All types are properly defined
   - Use `@ts-ignore` sparingly for development
   - Check imports and component props

## 📞 **Next Steps**

1. ✅ **Phase 1 Complete**: Foundation ready
2. 🎯 **Start Phase 2**: Begin manager dashboard features
3. 📱 **Test Responsive**: Verify mobile experience
4. 🔗 **Backend Integration**: Connect to real API when ready

---

**Project Status**: Phase 1 Foundation ✅ **COMPLETE**  
**Next Phase**: Manager Dashboard Implementation 🚀
