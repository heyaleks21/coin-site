-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  image_url TEXT,
  price VARCHAR(50),
  coins VARCHAR(100),
  years VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  slide_type VARCHAR(20) DEFAULT 'manual' CHECK (slide_type IN ('manual', 'product')),
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order ON hero_slides(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_hero_slides_product ON hero_slides(product_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_hero_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_hero_slides_updated_at();

-- Insert default hero slides (migrating from hardcoded data)
INSERT INTO hero_slides (title, subtitle, image_url, price, coins, years, display_order, slide_type) VALUES
('COMPLETE SET', '$2 COMMEMORATIVE COIN COLLECTION', '/images/complete-2dollar-collection.svg', '$1,850', '57 Coins', '1988-2025', 1, 'manual'),
('LIMITED SERIES', '35TH ANNIVERSARY OF THE $2 COIN', '/images/35th-anniversary-14-coin-set.svg', '$395', '14 Coins', '2023', 2, 'manual'),
('RED POPPY', 'REMEMBRANCE DAY C MINTMARK', '/images/2022-remembrance-day-red-poppy.svg', '$125', '1 Coin', '2022', 3, 'manual'),
('COIN NOODLING', 'SEARCH FOR TREASURES IN COIN ROLLS', '/images/coin-roll-noodling.svg', '$45', '50 Coins', 'Mixed Years', 4, 'manual'),
('LUCKY DIPS', 'MYSTERY COIN COLLECTIONS', '/images/lucky-dips.svg', '$85', 'Random Selection', 'Various', 5, 'manual')
ON CONFLICT DO NOTHING;
