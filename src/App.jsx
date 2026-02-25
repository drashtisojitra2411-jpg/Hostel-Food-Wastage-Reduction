import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import ManagerLogin from './pages/auth/ManagerLogin'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import StudentDashboard from './pages/dashboards/StudentDashboard'
import MessManagerDashboard from './pages/dashboards/MessManagerDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import Vision from './pages/Vision'

// Feature Pages
import MealBooking from './pages/meals/MealBooking'
import InventoryManager from './pages/inventory/InventoryManager'
import WastageLog from './pages/wastage/WastageLog'
import MenuManager from './pages/menu/MenuManager'
import Reports from './pages/mess-manager/Reports'
import Donations from './pages/mess-manager/Donations'

// Feature Pages - Student
import Impact from './pages/student/Impact'
import Settings from './pages/student/Settings'
import StudentMenu from './pages/student/StudentMenu'
import History from './pages/student/History'
import MealSelection from './pages/student/MealSelection'

// Feature Pages - Admin
import AdminPage from './pages/admin/AdminPage'
import FeedbackArchive from './pages/admin/FeedbackArchive'

export default function App() {
    return (
        <Routes>
            {/* Essential Mission Corridors */}
            <Route path="/vision-protocol" element={<Vision />} />
            <Route path="/" element={<Home />} />

            {/* Auth Routes */}
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/manager/login" element={
                <PublicRoute>
                    <ManagerLogin />
                </PublicRoute>
            } />
            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes - Student */}
            <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                </ProtectedRoute>
            } />
            <Route path="/meal-booking" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <MealBooking />
                </ProtectedRoute>
            } />
            <Route path="/impact" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <Impact />
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <Settings />
                </ProtectedRoute>
            } />
            <Route path="/student/menu" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <StudentMenu />
                </ProtectedRoute>
            } />
            <Route path="/history" element={
                <ProtectedRoute allowedRoles={['student']}>
                    <History />
                </ProtectedRoute>
            } />
            <Route path="/meal-selection" element={
                <ProtectedRoute allowedRoles={['student', 'mess_manager', 'super_admin']}>
                    <MealSelection />
                </ProtectedRoute>
            } />

            {/* Protected Routes - Mess Manager */}
            <Route path="/mess-manager" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <MessManagerDashboard />
                </ProtectedRoute>
            } />

            {/* Mess Manager Feature Routes */}
            {/* Mess Manager Feature Routes */}
            <Route path="/mess-manager/inventory" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <InventoryManager />
                </ProtectedRoute>
            } />
            <Route path="/mess-manager/wastage/log" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <WastageLog />
                </ProtectedRoute>
            } />
            <Route path="/mess-manager/menu" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <MenuManager />
                </ProtectedRoute>
            } />
            <Route path="/mess-manager/reports" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <Reports />
                </ProtectedRoute>
            } />
            <Route path="/mess-manager/donations" element={
                <ProtectedRoute allowedRoles={['mess_manager', 'super_admin']}>
                    <Donations />
                </ProtectedRoute>
            } />

            {/* Protected Routes - Admin */}
            <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="User Management" />
                </ProtectedRoute>
            } />
            <Route path="/admin/hostels" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="Hostel Management" />
                </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="Analytics" />
                </ProtectedRoute>
            } />
            <Route path="/admin/inventory" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="Inventory Overview" />
                </ProtectedRoute>
            } />
            <Route path="/admin/donations" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="Donations" />
                </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminPage title="System Settings" />
                </ProtectedRoute>
            } />
            <Route path="/admin/feedback" element={
                <ProtectedRoute allowedRoles={['super_admin', 'mess_manager']}>
                    <FeedbackArchive />
                </ProtectedRoute>
            } />

            {/* 404 & Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
