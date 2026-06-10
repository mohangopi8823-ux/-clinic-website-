import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export type Doctor = {
  id: string;
  doctor_name: string;
  specialization: string;
  qualification: string | null;
  experience_years: number | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
};

export type Service = {
  id: string;
  service_name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  is_active: boolean;
  created_at: string;
};

export type Appointment = {
  id: string;
  patient_name: string;
  patient_phone: string;
  doctor?: string | null;
  service?: string | null;
  doctor_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  symptoms: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'complete';
  notes: string | null;
  created_at: string;
  doctors?: Pick<Doctor, 'doctor_name' | 'specialization'> | null;
  services?: Pick<Service, 'service_name'> | null;
};

export type ClinicSettings = {
  id: string;
  clinic_name: string;
  phone: string | null;
  whatsapp_number: string | null;
  email: string | null;
  address: string | null;
  morning_opening_time: string | null;
  morning_closing_time: string | null;
  evening_opening_time: string | null;
  evening_closing_time: string | null;
  working_days: string[] | null;
  closed_days: string[] | null;
  google_map_link: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};
