import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SolarSystem } from './pages/SolarSystem';
import { SubjectDetail } from './pages/SubjectDetail'
import { GeometryExplorer } from './pages/GeometryExplorer';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ProtectedRoute } from './components/ProtectedRoute'; // Force refresh

import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subject/:subjectId"
            element={
              <ProtectedRoute>
                <SubjectDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/solar-system"
            element={
              <ProtectedRoute>
                <SolarSystem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/geometry-explorer"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <GeometryExplorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
