-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Board configuration table
CREATE TABLE board_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  location_name VARCHAR(255) NOT NULL DEFAULT 'Masjid',
  city_id VARCHAR(10) NOT NULL DEFAULT '2622', -- MyQuran API city ID for prayer times
  fajr_iqomah_offset INTEGER DEFAULT 15, -- minutes after adhan
  dhuhr_iqomah_offset INTEGER DEFAULT 10,
  asr_iqomah_offset INTEGER DEFAULT 10,
  maghrib_iqomah_offset INTEGER DEFAULT 5,
  isha_iqomah_offset INTEGER DEFAULT 10,
  slide_duration_seconds INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(organization_id)
);

-- Board slides table
CREATE TABLE board_slides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500),
  background_color VARCHAR(7) DEFAULT '#ffffff',
  text_color VARCHAR(7) DEFAULT '#1a202c',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_board_configs_org ON board_configs(organization_id);
CREATE INDEX idx_board_slides_org_active ON board_slides(organization_id, is_active);
CREATE INDEX idx_board_slides_order ON board_slides(display_order);
CREATE INDEX idx_board_slides_dates ON board_slides(start_date, end_date);

-- Enable Row Level Security (RLS)
ALTER TABLE board_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_slides ENABLE ROW LEVEL SECURITY;


-- Create RLS policies for board_configs
CREATE POLICY "Users can view board configs of their organization" ON board_configs
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert board configs for their organization" ON board_configs
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update board configs of their organization" ON board_configs
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can delete board configs of their organization" ON board_configs
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Create RLS policies for board_slides
CREATE POLICY "Users can view board slides of their organization" ON board_slides
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert board slides for their organization" ON board_slides
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update board slides of their organization" ON board_slides
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can delete board slides of their organization" ON board_slides
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_board_configs_updated_at BEFORE UPDATE ON board_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_board_slides_updated_at BEFORE UPDATE ON board_slides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();