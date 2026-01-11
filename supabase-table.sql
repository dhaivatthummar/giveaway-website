-- Create giveaway_entries table in Supabase
CREATE TABLE giveaway_entries (
    id BIGSERIAL PRIMARY KEY,
    giveaway_id VARCHAR(100) NOT NULL,
    giveaway_title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    shared BOOLEAN DEFAULT false,
    share_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_giveaway_entries_giveaway_id ON giveaway_entries(giveaway_id);
CREATE INDEX idx_giveaway_entries_email ON giveaway_entries(email);
CREATE INDEX idx_giveaway_entries_created_at ON giveaway_entries(created_at);

-- Create RLS (Row Level Security) policies
ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;

-- Policy to allow INSERT for anonymous users (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON giveaway_entries
    FOR INSERT 
    WITH CHECK (true);

-- Policy to prevent SELECT/UPDATE/DELETE for anonymous users (security)
CREATE POLICY "Prevent anonymous reads" ON giveaway_entries
    FOR SELECT 
    USING (false);

-- Optional: Create a view for admin dashboard (if needed)
CREATE OR REPLACE VIEW giveaway_stats AS
SELECT 
    giveaway_id,
    giveaway_title,
    COUNT(*) as total_entries,
    COUNT(CASE WHEN shared = true THEN 1 END) as completed_entries,
    DATE(created_at) as entry_date
FROM giveaway_entries 
GROUP BY giveaway_id, giveaway_title, DATE(created_at)
ORDER BY created_at DESC;