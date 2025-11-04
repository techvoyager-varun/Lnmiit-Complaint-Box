# 🏢 LNMIIT Campus Complaint Management System

A modern, full-stack web application for efficient complaint management in hostel environments. Built with React, TypeScript, Node.js, and MongoDB, featuring role-based access control and real-time complaint tracking.

## 🌟 Features

### 🎯 Core Functionality
- **Multi-Role Dashboard System**: Separate interfaces for Students, Wardens, and Maintenance Staff
- **Real-time Complaint Tracking**: Live status updates from submission to resolution
- **Building-wise Management**: Organized complaint handling across hostel buildings (BH1, BH2, BH3, BH4, GH)
- **Professional Assignment**: Complaint filtering based on maintenance specialization (Electrician, AC Duct, LAN, Carpenter)
- **Time-based Auto-cleanup**: Resolved complaints automatically hide after midnight to keep dashboards clean

### 🎨 Modern UI/UX
- **Glass-morphism Design**: Premium, modern interface with backdrop-blur effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Gradient Accents**: Beautiful color schemes with animated backgrounds
- **Component-based Architecture**: Reusable UI components built with Radix UI

### 🔐 Role-Based Access Control
- **Student Portal**: Submit complaints, track progress, view personal complaint history
- **Warden Dashboard**: Manage building-specific complaints, view pending and resolved complaints
- **Maintenance Interface**: View assigned tasks filtered by profession, update complaint status

### 📊 Dashboard Features
- **Statistics Overview**: Real-time complaint counts by status
- **Quick Actions**: One-click complaint submission and status updates
- **Filtered Views**: Complaints organized by status (Pending, Resolved)
- **Building Filters**: Switch between different hostel buildings

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

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

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/lnmiit_complaint_box"
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=xxxx
```

## 📱 User Roles & Permissions

### 👨‍🎓 Student
- Submit new complaints with title, description, and category
- View personal complaint history
- Track complaint status (Pending → Assigned → Resolved)
- Update complaint status (mark as resolved/not-resolved)

### 🏠 Warden
- View all complaints for assigned building(s)
- Switch between different buildings (BH1, BH2, BH3, BH4, GH)
- View complaints by status (Pending, Resolved)
- Update complaint status and mark as resolved
- Manual refresh to get latest complaint updates

### 🔧 Maintenance Staff
- View complaints filtered by profession (Electrician, AC Duct, LAN, Carpenter)
- Filter complaints by building
- Update complaint status from pending to resolved
- Only see complaints relevant to their specialization

## 🏗️ Project Structure

```
Lnmiit-Complaint-Box/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── auth/        # Login and signup forms
│   │   │   ├── complaints/  # Complaint card and form components
│   │   │   ├── dashboard/   # Dashboard widgets (StatCard, QuickAction, etc.)
│   │   │   ├── layout/      # Header, Sidebar, DashboardLayout
│   │   │   └── ui/          # Base UI components (Radix UI)
│   │   ├── contexts/        # AuthContext for user management
│   │   ├── hooks/           # useMidnightRefresh for auto-cleanup
│   │   ├── lib/             # API functions and utility helpers
│   │   ├── pages/           # Page components (Dashboards, Login, etc.)
│   │   └── types/           # TypeScript type definitions
│   └── package.json
│
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers (auth, complaints)
│   │   ├── middleware/      # Authentication and error handling
│   │   ├── models/          # MongoDB schemas (User, Complaint)
│   │   └── routes/          # API route definitions
│   └── package.json
│
└── README.md               # This file
```

## 🎯 Key Features Deep Dive

### 🕛 Automatic Complaint Cleanup
- Resolved complaints automatically disappear from dashboards after midnight
- Only affects complaints with status "resolved"
- Pending and in-progress complaints remain visible until resolved
- Automatic UI refresh at midnight using `useMidnightRefresh` hook

### 🔄 Status Workflow
```
Pending (open) → Assigned (in_progress) → Resolved (resolved)
```
- Students can submit complaints (status: "pending")
- Wardens and maintenance staff can update status to "resolved"
- Clear status progression with role-based permissions

### 🏢 Building Management
- **BH1-BH4**: Boys' hostels
- **GH**: Girls' hostel
- Building-specific complaint filtering
- Wardens can be assigned to specific buildings

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user profile
```

### Complaint Management
```
GET    /api/complaints           # List all complaints (admin/warden/maintenance)
POST   /api/complaints           # Create new complaint (student)
GET    /api/complaints/my        # Get user's own complaints (student)
PUT    /api/complaints/:id       # Update complaint status
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with secure salt rounds
- **Input Validation**: Zod schema validation for all requests
- **CORS Protection**: Configured cross-origin policies
- **Role-based Access**: Different permissions for each user role


### Running in Development
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev
```

**Made with ❤️ for LNMIIT Community**
