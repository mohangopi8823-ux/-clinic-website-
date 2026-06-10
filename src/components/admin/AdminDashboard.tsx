import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    fetchStats();
    fetchRecentAppointments();
  }, []);

  const fetchStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [
        totalRes,
        todayRes,
        pendingRes,
        confirmedRes,
        completedRes,
        cancelledRes,
      ] = await Promise.all([
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('appointment_date', today),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'complete'),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
      ]);

      const firstError = [totalRes, todayRes, pendingRes, confirmedRes, completedRes, cancelledRes]
        .find((res) => res.error)?.error;

      if (firstError) {
        console.error('Error fetching stats:', firstError);
        setLoadMessage('Appointment statistics are not available right now.');
        return;
      }

      setStats({
        total: totalRes.count || 0,
        today: todayRes.count || 0,
        pending: pendingRes.count || 0,
        confirmed: confirmedRes.count || 0,
        completed: completedRes.count || 0,
        cancelled: cancelledRes.count || 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, doctors(doctor_name, specialization), services(service_name)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching recent appointments:', error);
        setLoadMessage('Recent appointments are not available right now.');
        return;
      }

      setRecentAppointments(data || []);
    } catch (err) {
      console.error('Error fetching recent appointments:', err);
      setLoadMessage('Recent appointments are not available right now.');
    }
  };

  const statCards = [
    { label: 'Total Appointments', value: stats.total, icon: Calendar, color: 'teal' },
    { label: 'Today\'s Appointments', value: stats.today, icon: Clock, color: 'blue' },
    { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'yellow' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'green' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'purple' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'complete': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back to Amrutha Clinic Admin</p>
        </div>
        <Link
          to="/admin/appointments"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          View All Appointments
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      {loadMessage && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
          {loadMessage}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 ${
              stat.color === 'teal' ? 'bg-teal-100' :
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'yellow' ? 'bg-yellow-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'
            }`}>
              <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${
                stat.color === 'teal' ? 'text-teal-600' :
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'purple' ? 'text-purple-600' : 'text-red-600'
              }`} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
            <Link
              to="/admin/appointments"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left">Patient</th>
                <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">Phone</th>
                <th className="px-4 md:px-6 py-3 text-left hidden lg:table-cell">Service</th>
                <th className="px-4 md:px-6 py-3 text-left">Date</th>
                <th className="px-4 md:px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
                recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{apt.patient_name}</p>
                        <p className="text-xs text-gray-500 md:hidden">{apt.patient_phone}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden md:table-cell text-gray-600">
                      {apt.patient_phone}
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden lg:table-cell text-gray-600">
                      {apt.services?.service_name || 'Service not found'}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-600">
                      <div>
                        <p className="text-sm">{apt.appointment_date}</p>
                        <p className="text-xs text-gray-500">{apt.appointment_time}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
