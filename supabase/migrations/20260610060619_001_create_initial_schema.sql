CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  qualification TEXT,
  experience_years INTEGER,
  phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  duration_minutes INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  symptoms TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'complete')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clinic_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT NOT NULL DEFAULT 'Amrutha Clinic',
  phone TEXT DEFAULT '096404 10062',
  whatsapp_number TEXT DEFAULT '096404 10062',
  email TEXT,
  address TEXT DEFAULT 'Shop No: 1, 2, 3, 4, Padmavathi Shopping Complex, Amrutha Clinic, Nagarjuna Sagar Road, behind Sri Sarada Visaka Peetha Paalitha Venkateshwara Swamy Devasthanam, Sree Puram Colony, B.N Reddy Nagar, Hyderabad, Telangana 500112',
  morning_opening_time TEXT DEFAULT '10:30 AM',
  morning_closing_time TEXT DEFAULT '1:30 PM',
  evening_opening_time TEXT DEFAULT '6:30 PM',
  evening_closing_time TEXT DEFAULT '9:30 PM',
  working_days TEXT[] DEFAULT ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  closed_days TEXT[] DEFAULT ARRAY['Sunday'],
  google_map_link TEXT,
  website TEXT DEFAULT 'amruthaclinic.com',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read active doctors" ON doctors;
CREATE POLICY "Anyone can read active doctors"
  ON doctors FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Anyone can read active services" ON services;
CREATE POLICY "Anyone can read active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Anyone can create appointments" ON appointments;
CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read appointments" ON appointments;
CREATE POLICY "Admins can read appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE admin_users.email = auth.email()
        AND admin_users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update appointment status and notes" ON appointments;
CREATE POLICY "Admins can update appointment status and notes"
  ON appointments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE admin_users.email = auth.email()
        AND admin_users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE admin_users.email = auth.email()
        AND admin_users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Anyone can read clinic settings" ON clinic_settings;
CREATE POLICY "Anyone can read clinic settings"
  ON clinic_settings FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can manage clinic settings" ON clinic_settings;
CREATE POLICY "Admins can manage clinic settings"
  ON clinic_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE admin_users.email = auth.email()
        AND admin_users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE admin_users.email = auth.email()
        AND admin_users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can read admin users" ON admin_users;
CREATE POLICY "Admins can read admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (email = auth.email() OR role = 'admin');

INSERT INTO clinic_settings (clinic_name, phone, whatsapp_number, address, website)
VALUES (
  'Amrutha Clinic',
  '096404 10062',
  '096404 10062',
  'Shop No: 1, 2, 3, 4, Padmavathi Shopping Complex, Amrutha Clinic, Nagarjuna Sagar Road, behind Sri Sarada Visaka Peetha Paalitha Venkateshwara Swamy Devasthanam, Sree Puram Colony, B.N Reddy Nagar, Hyderabad, Telangana 500112',
  'amruthaclinic.com'
)
ON CONFLICT DO NOTHING;

INSERT INTO doctors (doctor_name, specialization, qualification, experience_years, phone, is_active)
VALUES ('Dr. Nalini T', 'Cardiology & Diabetology', 'MBBS, PGDCC Clinical Cardiology, Diploma in Diabetology', 10, '096404 10062', true)
ON CONFLICT DO NOTHING;

INSERT INTO services (service_name, description, price, duration_minutes, is_active) VALUES
('Cardiology', 'Comprehensive heart care and cardiac consultations', NULL, 30, true),
('Diabetology', 'Diabetes management and treatment', NULL, 30, true),
('ECG', 'Electrocardiogram for heart monitoring', NULL, 15, true),
('2D Echo Cardiogram', 'Detailed heart imaging and analysis', NULL, 30, true),
('TMT / Treadmill Test', 'Stress test for cardiac evaluation', NULL, 45, true),
('24hrs/48hrs Holter Monitoring', 'Continuous heart rhythm monitoring', NULL, 30, true),
('Loop Recorders', 'Long-term cardiac monitoring (5, 7, 14, 30 days)', NULL, 30, true),
('ABPM / BP Monitoring', '24hrs/48hrs blood pressure monitoring', NULL, 30, true),
('Sleep Study / Polysomnography', 'Comprehensive sleep analysis', NULL, 60, true),
('Diabetes Care', 'Complete diabetes management program', NULL, 30, true),
('General Consultation', 'Routine health checkups', NULL, 30, true),
('Lab Reports Review', 'Review of diagnostic reports', NULL, 20, true),
('Follow-up Visits', 'Post-treatment follow-up consultations', NULL, 20, true)
ON CONFLICT DO NOTHING;

INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin@amruthaclinic.com', '$2a$10$XOPbrlQqmJZQ4pW9YxQYJOKQJZQ4pW9YxQYJOKQJZQ4pW9YxQYJOKQJ', 'admin')
ON CONFLICT (email) DO NOTHING;
