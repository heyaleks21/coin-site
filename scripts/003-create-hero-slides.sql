-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    image_url TEXT,
    price VARCHAR(100),
    coins VARCHAR(100),
    years VARCHAR(100),
    custom_link TEXT, -- For manual slides, custom URL to link to
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 1,
    slide_type VARCHAR(20) DEFAULT 'manual' CHECK (slide_type IN ('manual', 'product')),
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_display_order ON hero_slides(display_order);
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active);
CREATE INDEX IF NOT EXISTS idx_hero_slides_product_id ON hero_slides(product_id);

-- Insert the 5 hero slides
INSERT INTO hero_slides (title, subtitle, image_url, price, coins, years, custom_link, is_active, display_order, slide_type) VALUES
('COMPLETE SET', '$2 COMMEMORATIVE COIN COLLECTION', '/images/complete-2dollar-collection.svg', '$1,850', '57 Coins', '1988-2025', '/catalog', true, 1, 'manual'),
('35TH ANNIVERSARY', '14 COIN SET', '/images/35th-anniversary-14-coin-set.svg', '$450', '14 Coins', '1988-2023', '/catalog', true, 2, 'manual'),
('2022 REMEMBRANCE DAY', 'RED POPPY', '/images/2022-remembrance-day-red-poppy.svg', '$25', 'Single Coin', '2022', '/catalog', true, 3, 'manual'),
('COIN NOODLING', 'MYSTERY ROLLS', '/images/coin-roll-noodling.svg', 'From $15', 'Various', 'Mixed Years', '/catalog', true, 4, 'manual'),
('LUCKY DIPS', 'SURPRISE PACKAGES', '/images/lucky-dips.svg', 'From $10', 'Surprise!', 'Various', '/catalog', true, 5, 'manual');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_hero_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_slides_updated_at
    BEFORE UPDATE ON hero_slides
    FOR EACH ROW
    EXECUTE FUNCTION update_hero_slides_updated_at();
