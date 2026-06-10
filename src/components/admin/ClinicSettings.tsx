import { useState, useEffect } from 'react';
import { Save, Building, Phone, Mail, Clock, MapPin, Globe, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ClinicSettings as ClinicSettingsType } from '../../lib/supabase';

export function ClinicSettings() {
  const [settings, setSettings] = useState<ClinicSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('clinic_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching settings:', error);
        setMessage({ type: 'error', text: 'Clinic settings are not available right now.' });
        return;
      }

      if (data) {
        setSettings(data as ClinicSettingsType);
      } else {
        setMessage({ type: 'error', text: 'Clinic settings have not been created yet.' });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setMessage({ type: 'error', text: 'Clinic settings are not available right now.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('clinic_settings')
        .update({
          clinic_name: settings.clinic_name,
          phone: settings.phone,
          whatsapp_number: settings.whatsapp_number,
          email: settings.email,
          address: settings.address,
          morning_opening_time: settings.morning_opening_time,
          morning_closing_time: settings.morning_closing_time,
          evening_opening_time: settings.evening_opening_time,
          evening_closing_time: settings.evening_closing_time,
          google_map_link: settings.google_map_link,
          website: settings.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Clinic Settings</h1>
        <p className="text-gray-600 mt-1">Manage clinic information and timings</p>
      </div>

      {/* Alert Message */}
      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-xl ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {settings && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Clinic Information */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Clinic Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Name
                </label>
                <input
                  type="text"
                  name="clinic_name"
                  value={settings.clinic_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="website"
                    value={settings.website || ''}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone || ''}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="whatsapp_number"
                    value={settings.whatsapp_number || ''}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={settings.email || ''}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={settings.address || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  name="google_map_link"
                  value={settings.google_map_link || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Clinic Timings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-4">Morning Session</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Opening Time</label>
                    <input
                      type="text"
                      name="morning_opening_time"
                      value={settings.morning_opening_time || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="10:30 AM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Closing Time</label>
                    <input
                      type="text"
                      name="morning_closing_time"
                      value={settings.morning_closing_time || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="1:30 PM"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-4">Evening Session</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Opening Time</label>
                    <input
                      type="text"
                      name="evening_opening_time"
                      value={settings.evening_opening_time || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="6:30 PM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Closing Time</label>
                    <input
                      type="text"
                      name="evening_closing_time"
                      value={settings.evening_closing_time || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="9:30 PM"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-red-50 rounded-xl">
              <p className="text-sm text-red-700">
                <span className="font-medium">Closed Days:</span> Sunday all day. Wednesday morning session closed.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="p-6 bg-gray-50">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
