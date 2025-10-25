# Super Admin Frontend | Multi-Role E-Commerce Platform

This module is the **Super Admin Dashboard Frontend** for managing all aspects of the Multi-Role E-Commerce Platform.  
It is built using **React.js** and **TailwindCSS** to provide a responsive and modern interface.

---

## Features

### Authentication & Security
- Super Admin login
- OTP-based password reset flow
- Secure access to all dashboard features

### User & Role Management
- View all users
- View all admins and delivery personnel
- Create new admin and delivery personnel
- Block/unblock/delete admins and delivery personnel
- Approve merchant accounts
- View pending merchant signup requests

### Product & Category Management
- View all products
- Block/unblock products
- Manage product categories
- Add/delete categories dynamically

### Order Management
- View all user orders
- View products in each order
- Track total orders

### Analytics & Dashboard
- Real-time total revenue
- Revenue trends over time
- User activity statistics
- Product category analytics

### Coupons Management
- View all coupons
- Delete coupons
- Create new coupons with auto-apply logic

### Sliders, Categories & User UI Elements
- View homepage sliders and categories
- Add sliders and categories with image upload
- Delete sliders and categories

### UI/UX
- Fully responsive dashboard
- Intuitive navigation for managing multiple roles and platform data

---

## Tech Stack

- **React.js** (functional components with hooks)
- **TailwindCSS** for responsive styling
- **Axios** for API requests
- **React Router DOM** for routing
- **Recharts** for analytics dashboards

---

## Environment Variables

Create a `.env` file in the **root directory** of the project with the following variables:

```env
# Base URL of your backend API
# Use full URL in development (e.g., localhost), and '/api' in production
# Example for development:
REACT_APP_API_URL=http://localhost:9000
# Example for production:
# REACT_APP_BASE_URL=/api

```

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/hainweb/ecom-superadmin-frontend.git

# Navigate to project directory
cd ecom-superadmin-frontend

# Install dependencies
npm install

# Start the development server
npm start
