import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Database,
  Settings,
  LogOut,
  Menu,
  X,
  Heart
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
  { name: 'Backup', path: '/admin/backup', icon: Database },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, adminUser } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 flex items-center justify-between px-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Admin Panel</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="hidden lg:block">
              <h1 className="font-bold text-white">Amrutha Clinic</h1>
              <p className="text-xs text-gray-400">Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="px-4 py-6 border-t border-gray-800 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {adminUser?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {adminUser?.email || 'Admin'}
                </p>
                <p className="text-xs text-gray-400">{adminUser?.role || 'Administrator'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600/10 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
