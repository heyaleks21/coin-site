-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT,
  price TEXT,
  coins TEXT,
  years TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  slide_type TEXT DEFAULT 'manual' CHECK (slide_type IN ('manual', 'product')),
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger for hero_slides
CREATE OR REPLACE FUNCTION update_hero_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_hero_slides_updated_at();

-- Insert the 5 original hero slides
INSERT INTO hero_slides (title, subtitle, image_url, price, coins, years, display_order, slide_type, is_active) VALUES
('COMPLETE SET', '$2 COMMEMORATIVE COIN COLLECTION', '/images/complete-2dollar-collection.svg', '$1,850', '57 Coins', '1988-2025', 1, 'manual', true),
('35TH ANNIVERSARY', '14 COIN SET', '/images/35th-anniversary-14-coin-set.svg', '$450', '14 Coins', '1988-2022', 2, 'manual', true),
('2022 REMEMBRANCE DAY', 'RED POPPY $2 COIN', '/images/2022-remembrance-day-red-poppy.svg', '$25', '1 Coin', '2022', 3, 'manual', true),
('COIN NOODLING', 'MYSTERY COIN ROLLS', '/images/coin-roll-noodling.svg', 'From $15', 'Various', 'Mixed Years', 4, 'manual', true),
('LUCKY DIPS', 'SURPRISE COIN PACKAGES', '/images/lucky-dips.svg', 'From $10', 'Various', 'Mixed Years', 5, 'manual', true);

-- Create storage bucket for hero images (if using Supabase storage)
-- This would typically be done through the Supabase dashboard or API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('hero-images', 'hero-images', true);

-- Set up RLS policies for hero_slides table
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active hero slides
CREATE POLICY "Public can view active hero slides" ON hero_slides
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage hero slides (admin only)
CREATE POLICY "Authenticated users can manage hero slides" ON hero_slides
  FOR ALL USING (auth.role() = 'authenticated');
