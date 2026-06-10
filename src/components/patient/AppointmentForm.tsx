import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, MessageSquare, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Doctor, Service } from '../../lib/supabase';

export function AppointmentForm() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadMessage, setLoadMessage] = useState('');

  const [formData, setFormData] = useState({
    patient_name: '',
    patient_phone: '',
    doctor: '',
    service: '',
    appointment_date: '',
    appointment_time: '',
    symptoms: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (formData.appointment_date) {
      validateDate();
    }
  }, [formData.appointment_date]);

  const fetchInitialData = async () => {
    try {
      const [doctorsRes, servicesRes] = await Promise.all([
        supabase.from('doctors').select('*').eq('is_active', true),
        supabase.from('services').select('*').eq('is_active', true).order('service_name')
      ]);

      if (doctorsRes.error || servicesRes.error) {
        console.error('Error fetching appointment options:', doctorsRes.error || servicesRes.error);
        setLoadMessage('Appointment options are not available right now. Please call the clinic to book.');
        return;
      }

      const activeDoctors = (doctorsRes.data || []) as Doctor[];
      const activeServices = (servicesRes.data || []) as Service[];
      setDoctors(activeDoctors);
      setServices(activeServices);

      if (activeDoctors.length === 0 || activeServices.length === 0) {
        setLoadMessage('Appointment options will be updated soon. Please call the clinic to book.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadMessage('Appointment options are not available right now. Please call the clinic to book.');
    } finally {
      setLoading(false);
    }
  };

  const validateDate = () => {
    const selectedDate = new Date(formData.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setErrors(prev => ({ ...prev, appointment_date: 'Cannot select a past date' }));
      return false;
    }

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      setErrors(prev => ({ ...prev, appointment_date: 'Clinic is closed on Sundays' }));
      return false;
    }

    // Check if Wednesday morning
    if (dayOfWeek === 3 && formData.appointment_time.includes('AM')) {
      setErrors(prev => ({ ...prev, appointment_date: 'Morning session is closed on Wednesdays' }));
      return false;
    }

    setErrors(prev => ({ ...prev, appointment_date: '' }));
    return true;
  };

  const getTimeSlots = () => {
    const slots: { value: string; label: string; disabled: boolean }[] = [];
    const morningTimes = ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'];
    const eveningTimes = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];

    const selectedDate = formData.appointment_date ? new Date(formData.appointment_date) : null;
    const today = new Date();
    const isToday = selectedDate && selectedDate.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    // Check if Wednesday
    const isWednesday = selectedDate?.getDay() === 3;

    // Morning slots
    if (!isWednesday) {
      morningTimes.forEach(time => {
        let disabled = false;
        if (isToday) {
          const hour = time.includes('AM') ? parseInt(time) : (parseInt(time) + 12);
          if (hour < currentHour || (hour === currentHour && currentMinute > 30)) {
            disabled = true;
          }
        }
        slots.push({ value: time, label: time, disabled });
      });
    }

    // Evening slots
    eveningTimes.forEach(time => {
      let disabled = false;
      if (isToday) {
        const hour = parseInt(time) + 12; // All PM times
        if (hour < currentHour || (hour === currentHour && currentMinute > 30)) {
          disabled = true;
        }
      }
      slots.push({ value: time, label: time, disabled });
    });

    return slots;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient_name.trim()) newErrors.patient_name = 'Patient name is required';
    if (!formData.patient_phone.trim()) newErrors.patient_phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.patient_phone)) newErrors.patient_phone = 'Enter valid 10-digit phone number';
    if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.appointment_date) newErrors.appointment_date = 'Please select a date';
    if (!formData.appointment_time) newErrors.appointment_time = 'Please select a time';

    if (!validateDate()) return false;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('appointments').insert({
        patient_name: formData.patient_name,
        patient_phone: formData.patient_phone,
        doctor: formData.doctor,
        service: formData.service,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        symptoms: formData.symptoms || null,
        status: 'pending'
      });

      if (error) throw error;

      const selectedDoctor = doctors.find(d => d.doctor_name === formData.doctor);
      const selectedService = services.find(s => s.service_name === formData.service);

      setAppointmentData({
        ...formData,
        doctor: selectedDoctor?.doctor_name || formData.doctor,
        service: selectedService?.service_name || formData.service,
        doctorInfo: selectedDoctor,
        serviceInfo: selectedService
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Unable to submit your appointment right now. Please call the clinic or try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!appointmentData) return '';
    return encodeURIComponent(`Hello Amrutha Clinic, I want to book an appointment.

Patient Details:
Name: ${appointmentData.patient_name}
Phone: ${appointmentData.patient_phone}
Appointment Details:
Doctor: ${appointmentData.doctor}
Service: ${appointmentData.service}
Date: ${appointmentData.appointment_date}
Time: ${appointmentData.appointment_time}

Problem/Symptoms:
${appointmentData.symptoms || 'Not specified'}

Please confirm my appointment.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Request Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment request has been submitted. Clinic reception will confirm your appointment shortly.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Appointment Summary</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Patient:</span> {appointmentData?.patient_name}</p>
            <p><span className="font-medium">Service:</span> {appointmentData?.service}</p>
            <p><span className="font-medium">Doctor:</span> {appointmentData?.doctor}</p>
            <p><span className="font-medium">Date:</span> {appointmentData?.appointment_date}</p>
            <p><span className="font-medium">Time:</span> {appointmentData?.appointment_time}</p>
          </div>
        </div>

        <a
          href={`https://wa.me/7013791243?text=${generateWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium mb-4"
        >
          <MessageCircle className="w-5 h-5" />
          Send to WhatsApp
        </a>

        <button
          onClick={() => navigate('/')}
          className="block w-full text-teal-600 hover:text-teal-700 font-medium mt-4"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Book an Appointment</h2>
        <p className="text-teal-100">Fill in your details to schedule a consultation</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {loadMessage && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800 text-sm">
            {loadMessage}
          </div>
        )}

        {/* Patient Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" />
            Patient Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.patient_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.patient_name && <p className="text-red-500 text-sm mt-1">{errors.patient_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="patient_phone"
                value={formData.patient_phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.patient_phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit phone number"
              />
              {errors.patient_phone && <p className="text-red-500 text-sm mt-1">{errors.patient_phone}</p>}
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Appointment Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor <span className="text-red-500">*</span>
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.doctor ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{doctors.length === 0 ? 'No active doctors available' : 'Choose a doctor'}</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.doctor_name}>
                    {doctor.doctor_name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {errors.doctor && <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{services.length === 0 ? 'No active services available' : 'Choose a service'}</option>
                {services.map(service => (
                  <option key={service.id} value={service.service_name}>
                    {service.service_name}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.appointment_date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.appointment_date && <p className="text-red-500 text-sm mt-1">{errors.appointment_date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Time <span className="text-red-500">*</span>
              </label>
              <select
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.appointment_time ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select time slot</option>
                <optgroup label="Morning (10:30 AM - 1:30 PM)">
                  {getTimeSlots().filter(s => s.value.includes('AM') || s.value === '12:00 PM' || s.value === '12:30 PM' || s.value === '1:00 PM' || s.value === '1:30 PM').map(slot => (
                    <option key={slot.value} value={slot.value} disabled={slot.disabled}>
                      {slot.label} {slot.disabled ? '(Passed)' : ''}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Evening (6:30 PM - 9:30 PM)">
                  {getTimeSlots().filter(s => s.value.includes('PM') && !['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'].includes(s.value)).map(slot => (
                    <option key={slot.value} value={slot.value} disabled={slot.disabled}>
                      {slot.label} {slot.disabled ? '(Passed)' : ''}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.appointment_time && <p className="text-red-500 text-sm mt-1">{errors.appointment_time}</p>}
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Symptoms / Problem
          </label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Describe your symptoms or health concerns..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium disabled:bg-gray-400"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Appointment Request
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-sm">
          By submitting, you agree to be contacted by the clinic for appointment confirmation.
        </p>
      </form>
    </div>
  );
}
