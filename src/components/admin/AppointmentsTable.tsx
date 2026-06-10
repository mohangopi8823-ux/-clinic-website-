import { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Edit,
  MessageCircle,
  X,
  Save
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Appointment } from '../../lib/supabase';

export function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching appointments:', error);
        alert(`Failed to fetch appointments: ${error.message}`);
        setAppointments([]);
        setLoadMessage('Appointments are not available right now.');
        return;
      }

      console.log('Fetched appointments:', data);
      setAppointments((data || []) as Appointment[]);
      setLoadMessage('');
    } catch (err) {
      console.error('Error fetching appointments:', err);
      alert('Failed to fetch appointments. Please check the console for details.');
      setAppointments([]);
      setLoadMessage('Appointments are not available right now.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating appointment status:', error);
        alert(`Failed to update appointment status: ${error.message}`);
        return;
      }

      await fetchAppointments();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update appointment status. Please check the console for details.');
    } finally {
      setUpdating(false);
    }
  };

  const updateNotes = async () => {
    if (!selectedAppointment) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ notes: editNotes })
        .eq('id', selectedAppointment.id);

      if (error) {
        console.error('Error updating appointment notes:', error);
        alert(`Failed to update appointment notes: ${error.message}`);
        return;
      }

      setShowNotesModal(false);
      await fetchAppointments();
    } catch (err) {
      console.error('Error updating notes:', err);
      alert('Failed to update appointment notes. Please check the console for details.');
    } finally {
      setUpdating(false);
    }
  };

  const generateWhatsAppConfirmation = (appointment: Appointment) => {
    const message = `Hello ${appointment.patient_name},

Your appointment at Amrutha Clinic is confirmed.

Doctor: Dr. Nalini T
Service: ${appointment.service || appointment.service_id || 'Selected service'}
Date: ${appointment.appointment_date}
Time: ${appointment.appointment_time}

Address:
Amrutha Clinic, B.N Reddy Nagar, Hyderabad.

Please arrive 10 minutes early.

Thank you,
Amrutha Clinic`;

    return encodeURIComponent(message);
  };

  const handleConfirmAndSendWhatsApp = async (appointment: Appointment) => {
    // Update status to confirmed
    await updateStatus(appointment.id, 'confirmed');

    // Open WhatsApp with pre-filled message
    const phone = appointment.patient_phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/91${phone}?text=${generateWhatsAppConfirmation(appointment)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'complete': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const openNotesModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditNotes(appointment.notes || '');
    setShowNotesModal(true);
  };

  const filteredAppointments = search.trim()
    ? appointments.filter(
        (apt) =>
          apt.patient_name.toLowerCase().includes(search.toLowerCase()) ||
          apt.patient_phone.includes(search)
      )
    : appointments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600 mt-1">Manage all patient appointments</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    {loadMessage || 'No appointments found'}
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{apt.patient_name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-600 text-sm">{apt.patient_phone}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-600 text-sm">
                        {apt.doctor || apt.doctor_id || 'Doctor not found'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-600 text-sm">
                        {apt.service || apt.service_id || 'Service not found'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{apt.appointment_date}</p>
                        <p className="text-gray-600 text-sm">{apt.appointment_time}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {apt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirmAndSendWhatsApp(apt)}
                              disabled={updating}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                              title="Confirm and Send WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                              Confirm + WhatsApp
                            </button>
                            <button
                              onClick={() => updateStatus(apt.id, 'cancelled')}
                              disabled={updating}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-3 h-3" />
                              Cancel
                            </button>
                          </>
                        )}
                        {apt.status === 'confirmed' && (
                          <>
                            <a
                              href={`https://wa.me/91${apt.patient_phone.replace(/[^0-9]/g, '')}?text=${generateWhatsAppConfirmation(apt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                            >
                              <MessageCircle className="w-3 h-3" />
                              Send WhatsApp
                            </a>
                            <button
                              onClick={() => updateStatus(apt.id, 'complete')}
                              disabled={updating}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Complete
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => openNotesModal(apt)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Notes</h3>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Patient: <span className="font-medium text-gray-900">{selectedAppointment.patient_name}</span></p>
                <p className="text-sm text-gray-600 mt-1">Date: <span className="font-medium text-gray-900">{selectedAppointment.appointment_date} at {selectedAppointment.appointment_time}</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Add notes about this appointment..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={updateNotes}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
