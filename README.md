# 🏢 LNMIIT Campus Complaint Management System

A modern, full-stack web application designed for efficient complaint management in hostel environments. Built with React, TypeScript, Node.js, and MongoDB, featuring role-based access control and real-time complaint tracking.

## 🌟 Features

### 🎯 Core Functionality
- **Multi-Role Dashboard System**: Separate interfaces for Students, Wardens, Maintenance Staff, and Administrators
- **Real-time Complaint Tracking**: Live status updates from submission to resolution
- **Building-wise Management**: Organized complaint handling across different hostel buildings (BH1, BH2, BH3, BH4, GH)
- **Professional Assignment**: Automatic routing based on complaint type (Electrician, AC Duct, LAN, Carpenter)
- **File Upload Support**: Image attachments for better issue documentation
- **Time-based Auto-cleanup**: Resolved complaints automatically hide after midnight

### 🎨 Modern UI/UX
- **Glass-morphism Design**: Premium, modern interface with backdrop-blur effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: User preference-based theme switching
- **Animated Components**: Smooth transitions and micro-interactions
- **Gradient Accents**: Beautiful color schemes throughout the application
- **Accessibility**: WCAG compliant with proper contrast ratios and ARIA labels

### 🔐 Role-Based Access Control
- **Student Portal**: Submit complaints, track progress, view personal complaint history
- **Warden Dashboard**: Manage building-specific complaints, assign to maintenance staff
- **Maintenance Interface**: View assigned tasks, update complaint status, mark as resolved
- **Admin Panel**: System-wide oversight, user management, analytics

### 📊 Advanced Features
- **Statistics Dashboard**: Real-time metrics and complaint analytics
- **Smart Filtering**: Filter by status, building, date, priority
- **Activity Feed**: Recent activity tracking across all roles
- **Quick Actions**: One-click complaint submission and status updates
- **Search & Sort**: Advanced complaint search and sorting capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Lucide React** for consistent iconography
- **React Router** for client-side routing
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type-safe backend development
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file upload handling
- **CORS** for cross-origin resource sharing

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting
- **PostCSS** for CSS processing
- **TypeScript** for static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/techvoyager-varun/Lnmiit-Complaint-Box.git
   cd Lnmiit-Complaint-Box
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lnmiit-complaints
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
UPLOAD_PATH=./uploads
```

## 📱 User Roles & Permissions

### 👨‍🎓 Student
- Submit new complaints with descriptions and images
- View personal complaint history
- Track complaint status in real-time
- Update personal profile information

### 🏠 Warden
- View all complaints for assigned building(s)
- Assign complaints to appropriate maintenance staff
- Monitor complaint resolution progress
- Generate building-specific reports

### 🔧 Maintenance Staff
- View assigned complaints filtered by profession
- Update complaint status (pending → in-progress → resolved)
- Add resolution notes and completion photos
- Manage personal task queue

### 👨‍💼 Administrator
- System-wide complaint oversight
- User management and role assignment
- Generate comprehensive analytics and reports
- System configuration and settings

## 🏗️ Project Structure

```
Lnmiit-Complaint-Box/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── complaints/  # Complaint-related components
│   │   │   ├── dashboard/   # Dashboard widgets
│   │   │   ├── layout/      # Layout components
│   │   │   └── ui/          # Base UI components
│   │   ├── contexts/        # React Context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and API
│   │   ├── pages/           # Page components
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB schemas
│   │   └── routes/          # API route definitions
│   ├── uploads/             # File upload directory
│   └── package.json
│
└── README.md               # This file
```

## 🎯 Key Features Deep Dive

### 🕛 Automatic Complaint Cleanup
- Resolved complaints automatically disappear from dashboards after midnight
- Keeps interfaces clean while preserving data integrity
- Configurable cleanup rules for different complaint types

### 📊 Smart Dashboard Analytics
- Real-time statistics with trend indicators
- Visual progress tracking with charts and graphs
- Performance metrics for maintenance staff
- Building-wise complaint distribution

### 🔄 Status Workflow
```
Pending → Assigned → In Progress → Resolved
```
- Clear status progression with role-based permissions
- Automatic notifications for status changes
- Historical status tracking

### 🏢 Building Management
- **BH1-BH4**: Boys' hostels with dedicated wardens
- **GH**: Girls' hostel with specialized management
- Building-specific complaint routing and assignment

### 🛠️ Maintenance Specialization
- **Electrician**: Power, lighting, and electrical issues
- **AC Duct**: Air conditioning and ventilation systems
- **LAN**: Network connectivity and internet issues
- **Carpenter**: Furniture, doors, and woodwork repairs

## 🎨 UI/UX Design Principles

### Modern Glass-morphism Design
- Translucent backgrounds with backdrop-blur effects
- Subtle shadows and border highlights
- Consistent spacing and typography
- Premium color gradients

### Responsive Design
- Mobile-first approach
- Tablet-optimized layouts
- Desktop-enhanced experiences
- Touch-friendly interfaces

### Accessibility Standards
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode support

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
PUT  /api/auth/profile     # Update user profile
```

### Complaint Management
```
GET    /api/complaints           # List all complaints
POST   /api/complaints           # Create new complaint
GET    /api/complaints/:id       # Get specific complaint
PUT    /api/complaints/:id       # Update complaint
DELETE /api/complaints/:id       # Delete complaint
GET    /api/complaints/my        # Get user's complaints
```

### File Management
```
POST /api/upload              # Upload file
GET  /api/files/:filename     # Get uploaded file
```

## 🚦 Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request for review
```

### Testing
```bash
# Frontend tests
cd frontend && npm run test

# Backend tests
cd backend && npm run test

# E2E tests
npm run test:e2e
```

### Building for Production
```bash
# Frontend build
cd frontend && npm run build

# Backend build
cd backend && npm run build

# Full application build
npm run build:all
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Comprehensive request validation
- **File Upload Security**: Type and size restrictions
- **CORS Protection**: Configured cross-origin policies
- **Rate Limiting**: API rate limiting to prevent abuse

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Automatic image compression
- **Caching Strategies**: Browser and API response caching
- **Bundle Optimization**: Tree shaking and minification
- **Database Indexing**: Optimized MongoDB queries

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏫 About LNMIIT

The LNM Institute of Information Technology (LNMIIT) is a premier technical institute located in Jaipur, Rajasthan, India. This complaint management system is designed specifically for the hostel management needs of LNMIIT students and staff.

## 📞 Support

For support and queries:
- **Email**: support@lnmiit-complaints.edu
- **GitHub Issues**: [Create an issue](https://github.com/techvoyager-varun/Lnmiit-Complaint-Box/issues)
- **Documentation**: [Wiki](https://github.com/techvoyager-varun/Lnmiit-Complaint-Box/wiki)

## 🙏 Acknowledgments

- LNMIIT Administration for requirements and feedback
- Students and staff for beta testing
- Open source community for tools and libraries
- Contributors who helped improve the system

---

**Made with ❤️ for LNMIIT Community**

*Building a better hostel experience, one complaint at a time.*