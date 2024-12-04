# HR Management System

## Overview
This HR Management System is a comprehensive web application developed as a solution to an interview coding test, reviewed by Brobot64. The system provides a robust platform for managing employee data, handling administrative tasks, and visualizing organizational analytics.

## Features
- **Role-based Authentication**: Secure login system with separate interfaces for administrators and employees
- **Admin Dashboard**:
  - Employee management (CRUD operations)
  - Department-wise analytics
  - Employee statistics and charts
- **Employee Dashboard**:
  - Personal profile management
  - View department information
  - Access to relevant documents

## Technology Stack
- Frontend: React + TypeScript + Vite
- UI Components: shadcn/ui
- Styling: Tailwind CSS
- State Management: React Query
- Charts: Recharts
- Backend Integration: REST API

## Installation and Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd hr-management-system
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Access the Application**
- Open your browser and navigate to `http://localhost:5173`
- Default login credentials:
  - Admin: admin@example.com / admin123
  - Employee: employee@example.com / employee123

## Project Structure
```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts including auth
├── pages/         # Main page components
├── services/      # API integration services
└── utils/         # Utility functions
```

## Backend Integration
The application integrates with a REST API hosted at http://localhost:5000

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.