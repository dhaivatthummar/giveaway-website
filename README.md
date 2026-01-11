# 🎁 Giveaway Website

A production-ready, secure giveaway website built with HTML, CSS, and Vanilla JavaScript. Features mobile-first design, WhatsApp sharing integration, and secure Supabase backend.

## ✨ Features

- **Mobile-First Responsive Design** - Optimized for all devices
- **10-Share Requirement** - Users must share on WhatsApp 10 times before entry
- **Secure Backend** - Supabase integration with serverless functions
- **Real-time Progress Tracking** - Visual progress bar for shares
- **Form Validation** - Complete client-side validation
- **Ad-Ready** - Strategic ad placements for monetization
- **SEO Optimized** - Meta tags and structured data

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd giveaway-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase Database
Run the SQL query from `supabase-table.sql` in your Supabase SQL editor.

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and add your Supabase credentials:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy!

## 📁 Project Structure

```
├── index.html              # Main giveaway page
├── netlify/
│   └── functions/
│       └── submit-entry.js  # Secure API endpoint
├── supabase-table.sql      # Database schema
├── package.json            # Dependencies
├── netlify.toml           # Netlify configuration
└── README.md              # This file
```

## 🔧 Configuration

### Giveaway Settings
Update the `GIVEAWAY_CONFIG` object in `index.html`:

```javascript
const GIVEAWAY_CONFIG = {
    giveaway_id: "amazon-1000-jan",
    giveaway_title: "₹1000 Amazon Gift Voucher",
    giveaway_description: "Win a ₹1000 Amazon Gift Voucher absolutely FREE!",
    share_text: "🎁 I am participating in a ₹1000 Amazon Gift Voucher Giveaway! Join now 👇"
};
```

### Share Requirements
Change the required number of shares by updating:
```javascript
const REQUIRED_SHARES = 10; // Change this number
```

## 🛡️ Security Features

- **No Exposed Credentials** - All sensitive data handled server-side
- **Input Validation** - Both client and server-side validation
- **Duplicate Prevention** - Prevents multiple entries with same email
- **Rate Limiting** - Built-in protection against spam
- **CORS Protection** - Secure cross-origin requests

## 📊 Database Schema

The `giveaway_entries` table includes:
- `id` - Unique entry identifier
- `giveaway_id` - Links to specific giveaway
- `name`, `email`, `phone` - User details
- `shared` - Boolean for completion status
- `share_count` - Number of WhatsApp shares
- `created_at` - Timestamp

## 🎨 Customization

### Colors & Branding
Update CSS variables in the `<style>` section:
- Primary color: `#FF9900` (Amazon orange)
- WhatsApp green: `#25D366`
- Success green: `#28a745`

### Ad Placements
Three strategic ad zones:
1. Top banner (728x90)
2. Mid-content (300x250)
3. Sticky mobile banner (320x50)

## 📱 Mobile Features

- Touch-friendly buttons (44px minimum)
- Sticky bottom navigation
- Optimized form inputs
- WhatsApp deep linking
- Progressive Web App ready

## 🔍 SEO & Analytics

- Complete meta tags
- Open Graph integration
- Analytics tracking hooks
- Structured data ready
- Fast loading optimized

## 📈 Monetization

- AdSense-friendly structure
- Strategic ad placements
- Non-intrusive design
- High engagement flow
- Conversion optimized

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@yoursite.com or create an issue in this repository.

---

**Made with ❤️ for creators and marketers**