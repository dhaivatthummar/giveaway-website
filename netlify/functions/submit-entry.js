// Netlify/Vercel Serverless Function
// File: netlify/functions/submit-entry.js or api/submit-entry.js

const { createClient } = require('@supabase/supabase-js');

// Environment variables (set in Netlify/Vercel dashboard)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key, not anon key

const supabase = createClient(supabaseUrl, supabaseServiceKey);

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const data = JSON.parse(event.body);

        // Validate required fields
        const { giveaway_id, giveaway_title, name, email, phone, shared, share_count } = data;

        if (!giveaway_id || !name || !email || !phone) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid email format' })
            };
        }

        // Validate phone format (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid phone format' })
            };
        }

        // Check if email already exists for this giveaway
        const { data: existingEntry } = await supabase
            .from('giveaway_entries')
            .select('id')
            .eq('giveaway_id', giveaway_id)
            .eq('email', email)
            .single();

        if (existingEntry) {
            return {
                statusCode: 409,
                headers,
                body: JSON.stringify({ error: 'Email already registered for this giveaway' })
            };
        }

        // Insert new entry
        const { data: insertData, error } = await supabase
            .from('giveaway_entries')
            .insert([{
                giveaway_id,
                giveaway_title,
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.trim(),
                shared: shared || false,
                share_count: share_count || 0,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Database error' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Entry submitted successfully',
                entry_id: insertData[0].id 
            })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};