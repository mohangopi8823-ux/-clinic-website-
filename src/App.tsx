import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Patient Components
import { PatientNavbar } from './components/patient/PatientNavbar';
import { Footer } from './components/patient/Footer';

// Patient Pages
import { HomePage } from './pages/patient/HomePage';
import { AboutPage } from './pages/patient/AboutPage';
import { DoctorsPage } from './pages/patient/DoctorsPage';
import { ServicesPage } from './pages/patient/ServicesPage';
import { AppointmentPage } from './pages/patient/AppointmentPage';
import { ContactPage } from './pages/patient/ContactPage';

// Admin Layout and Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminBackupPage } from './pages/admin/AdminBackupPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PatientNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Patient Website Routes */}
          <Route
            path="/"
            element={
              <PatientLayout>
                <HomePage />
              </PatientLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PatientLayout>
                <AboutPage />
              </PatientLayout>
            }
          />
          <Route
            path="/doctors"
            element={
              <PatientLayout>
                <DoctorsPage />
              </PatientLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PatientLayout>
                <ServicesPage />
              </PatientLayout>
            }
          />
          <Route
            path="/appointment"
            element={
              <PatientLayout>
                <AppointmentPage />
              </PatientLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PatientLayout>
                <ContactPage />
              </PatientLayout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="appointments" element={<AdminAppointmentsPage />} />
            <Route path="backup" element={<AdminBackupPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
