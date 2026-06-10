import { useState } from 'react';
import { Download, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function BackupManager() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const downloadCSV = async () => {
    setDownloading(true);
    setMessage(null);

    try {
      let query = supabase
        .from('appointments')
        .select('*, doctors(doctor_name), services(service_name)')
        .order('appointment_date', { ascending: false });

      if (fromDate) {
        query = query.gte('appointment_date', fromDate);
      }
      if (toDate) {
        query = query.lte('appointment_date', toDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data || data.length === 0) {
        setMessage({ type: 'error', text: 'No appointments found for the selected date range.' });
        setDownloading(false);
        return;
      }

      // Generate CSV
      const headers = [
        'patient_name',
        'patient_phone',
        'doctor',
        'service',
        'appointment_date',
        'appointment_time',
        'symptoms',
        'status',
        'notes',
        'created_at'
      ];

      const csvRows = [
        headers.join(','),
        ...data.map((apt: any) =>
          headers.map((header) => {
            const value =
              header === 'doctor'
                ? apt.doctors?.doctor_name
                : header === 'service'
                  ? apt.services?.service_name
                  : apt[header];
            if (value === null || value === undefined) return '';
            // Escape quotes and wrap in quotes if contains comma
            const str = String(value).replace(/"/g, '""');
            return str.includes(',') || str.includes('"') ? `"${str}"` : str;
          }).join(',')
        )
      ];

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `amrutha_clinic_appointments_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: `Downloaded ${data.length} appointments successfully.` });
    } catch (err) {
      console.error('Error downloading backup:', err);
      setMessage({ type: 'error', text: 'Failed to download backup. Please try again.' });
    } finally {
      setDownloading(false);
    }
  };

  const deleteOldAppointments = async () => {
    setDeleting(true);
    setMessage(null);

    try {
      // Calculate date 90 days ago
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const cutoffDate = ninetyDaysAgo.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('appointments')
        .delete()
        .lt('appointment_date', cutoffDate)
        .select('id');

      if (error) throw error;

      const deletedCount = data?.length || 0;

      if (deletedCount === 0) {
        setMessage({ type: 'success', text: 'No appointments older than 90 days found.' });
      } else {
        setMessage({ type: 'success', text: `Successfully deleted ${deletedCount} old appointments.` });
      }

      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Error deleting old appointments:', err);
      setMessage({ type: 'error', text: 'Failed to delete old appointments. Please try again.' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Backup & Data Management</h1>
        <p className="text-gray-600 mt-1">Download appointments backup and manage old records</p>
      </div>

      {/* Alert Message */}
      {message && (
        <div className={`flex items-start gap-3 p-4 rounded-xl ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* Download Backup Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Download Appointments Backup</h2>
            <p className="text-gray-600 text-sm">Export appointments data as CSV file</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date (Optional)
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date (Optional)
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={downloadCSV}
          disabled={downloading}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
        >
          {downloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download Backup (CSV)
            </>
          )}
        </button>
      </div>

      {/* Delete Old Records Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Old Appointments</h2>
            <p className="text-gray-600 text-sm">Remove appointments older than 90 days to keep database small</p>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Important Warning</p>
              <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                <li>This will permanently delete all appointments older than 90 days</li>
                <li>Please download a backup before deleting</li>
                <li>This action cannot be undone</li>
                <li>Only appointments are deleted (doctors, services, settings remain)</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
        >
          <Trash2 className="w-5 h-5" />
          Delete Old Appointments (90+ days)
        </button>
      </div>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                  <p className="text-gray-600 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete appointments older than 90 days?
                Please make sure you have downloaded a backup first.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteOldAppointments}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
