# ChatbotAI - Multi-Tenant SaaS Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Firebase](https://img.shields.io/badge/firebase-8.10.1-orange.svg)
![Status](https://img.shields.io/badge/status-production-success.svg)

**Platform SaaS untuk membuat dan mengelola AI Chatbot dengan mudah**

[Demo](#) • [Documentation](#) • [Support](mailto:support@meera.id)

Powered by **Meera.id**

</div>

---

## 🎯 Overview

ChatbotAI adalah platform SaaS multi-tenant yang memungkinkan user untuk:
- 🤖 Membuat AI chatbot dengan knowledge base sendiri
- 📄 Upload dokumen untuk melatih chatbot (RAG)
- 🎨 Customize tampilan widget (warna, posisi, pesan)
- 🔗 Embed widget ke website dengan 1 baris kode
- 📊 Monitor analytics dan usage statistics
- 🔑 Manage API keys (admin-provided + custom)

## ✨ Features

### For End Users
- ✅ **Google OAuth & Email/Password Login**
- ✅ **Subscription System** dengan QRIS payment (Rp 25K/bulan)
- ✅ **Admin Approval Workflow** (max 24 jam)
- ✅ **User Dashboard** dengan chat playground
- ✅ **Document Upload** untuk training chatbot
- ✅ **Embed Widget Generator** dengan customization
- ✅ **API Key Management** (view admin keys + add custom)
- ✅ **Analytics Dashboard** (coming soon)

### For Admins
- ✅ **Admin Dashboard** untuk kelola subscriptions
- ✅ **Approve/Reject** pending subscriptions
- ✅ **Add Multiple API Keys** per user (Groq/Cerebras)
- ✅ **View Active Users** dan stats lengkap
- ✅ **Manage Admins** (add/remove admin access)
- ✅ **Audit Log** untuk track activities
- ✅ **System Config** (QRIS, pricing, maintenance mode)

### Technical Features
- 🔒 **Multi-tenant Architecture** dengan data isolation
- 🔐 **Firebase Security Rules** comprehensive
- 🚀 **Cloudflare Workers** backend proxy
- 💬 **Real-time Chat** dengan Firebase Realtime Database
- 📦 **RAG (Retrieval-Augmented Generation)** untuk knowledge base
- 🎨 **Modern UI** dengan gradient design, glassmorphism
- 📱 **Fully Responsive** (PC, tablet, mobile)
- 🌐 **Embed Widget** standalone JavaScript

## 🏗️ Architecture

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Frontend│  (index.html, login.html, dashboard.html, etc.)
    └────┬────┘
         │
    ┌────▼───────────────────────────────┐
    │  Firebase Auth & Realtime Database │
    └────┬───────────────────────────────┘
         │
    ┌────▼────────────┐
    │ Cloudflare Worker│  (Proxy API calls, hide keys)
    └────┬────────────┘
         │
    ┌────▼─────────────┐
    │ AI APIs (Groq/   │
    │ Cerebras/OpenAI) │
    └──────────────────┘
```

## 📁 Project Structure

```
ugm-chatbot/
├── index.html                    # Landing page (public home)
├── login.html                    # Login/register page
├── subscribe.html                # Subscription flow (3 steps)
├── waiting-approval.html         # Pending approval status
├── dashboard.html                # User dashboard (main app)
├── admin-dashboard.html          # Admin panel
├── settings.html                 # Legacy settings (can be merged)
├── training.html                 # Legacy training (can be merged)
├── speech.html                   # Speech recognition demo
├── widget-embed.js               # Widget embed script (floating button)
├── widget-chat.html              # Widget chat interface (iframe)
├── chatbot-widget.js             # Legacy widget (Cloudflare Worker approach)
│
├── js/
│   ├── firebase-config.js        # Firebase initialization
│   ├── auth.js                   # Authentication logic
│   ├── chat.js                   # Chat functionality
│   ├── groq.js                   # Groq API integration
│   ├── rag.js                    # RAG implementation
│   ├── storage.js                # Local/Firebase storage
│   ├── training.js               # Document training
│   └── speech.js                 # Speech-to-text
│
├── css/
│   ├── style.css                 # Main styles
│   └── speech.css                # Speech interface styles
│
├── database.rules.json           # Firebase security rules
├── DATABASE-SCHEMA.md            # Database structure documentation
├── FIREBASE-RULES-DEPLOYMENT.md  # Rules deployment guide
├── GOOGLE-AUTH-SETUP.md          # Google OAuth setup guide
├── WIDGET-DEPLOYMENT-GUIDE.md    # Widget deployment guide (legacy)
├── WIDGET-SIMPLE.md              # Simple widget guide (NEW - recommended!)
├── test-widget.html              # Widget demo/test page
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Firebase project (already created: `argamada-ac6cc`)
- Groq/Cerebras API keys (for admin to provision)
- Domain untuk hosting (meera.id recommended)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/chatbot-ai.git
cd chatbot-ai
```

#### 2. Configure Firebase
File `js/firebase-config.js` sudah configured untuk project `argamada-ac6cc`:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDQaH5K-OJz4zpK8MO9Z4Jb3--8YJVT-yU",
  authDomain: "argamada-ac6cc.firebaseapp.com",
  databaseURL: "https://argamada-ac6cc-asia-southeast1.firebaseapp.com",
  projectId: "argamada-ac6cc",
  // ... rest of config
};
```

#### 3. Deploy Firebase Rules
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select existing project)
firebase init database

# Deploy rules
firebase deploy --only database
```

#### 4. Enable Google Auth
Follow guide: [GOOGLE-AUTH-SETUP.md](GOOGLE-AUTH-SETUP.md)

#### 5. Create First Admin
```javascript
// Di Firebase Console → Realtime Database
// Manual create path:
/adminSettings/admins/{YOUR_UID}
{
  "email": "admin@meera.id",
  "addedAt": 1738800000000,
  "addedBy": "system"
}
```

#### 6. Deploy Frontend
```bash
# Option A: Firebase Hosting
firebase init hosting
firebase deploy --only hosting

# Option B: Vercel
vercel --prod

# Option C: Netlify
netlify deploy --prod
```

#### 7. Deploy Cloudflare Worker
See: [WIDGET-DEPLOYMENT-GUIDE.md](WIDGET-DEPLOYMENT-GUIDE.md#backend-api-cloudflare-worker)

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Publish
wrangler publish
```

## 📖 Documentation

### For Developers
- [Database Schema](DATABASE-SCHEMA.md) - Complete multi-tenant structure
- [Firebase Rules](FIREBASE-RULES-DEPLOYMENT.md) - Security rules & deployment
- [Widget Guide](WIDGET-DEPLOYMENT-GUIDE.md) - Embed widget setup

### For Admins
1. **Login** ke admin-dashboard.html
2. **List Akun** → View pending/active subscriptions
3. **Approve User**:
   - Klik "Approve" pada pending subscription
   - Add Groq/Cerebras API keys (minimal 1)
   - Klik "Approve" → User langsung dapat akses
4. **Manage Admins** → Add/remove admin users

### For Users
1. **Register** via login.html (Google atau Email)
2. **Subscribe** → Bayar Rp 25K via QRIS
3. **Wait Approval** → Max 24 jam (biasanya < 1 jam)
4. **Dashboard** → Chat playground, upload documents
5. **Embed** → Copy widget code, paste ke website

## 🎨 Design System

### Colors
- **Primary**: `#6366F1` (Indigo)
- **Primary Dark**: `#4F46E5`
- **Secondary**: `#EC4899` (Pink)
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

### Typography
- **Font**: Inter, -apple-system, BlinkMacSystemFont
- **Headings**: Font-weight 800, letter-spacing -0.02em
- **Body**: Font-weight 400-600

### Effects
- **Glassmorphism**: blur background, semi-transparent
- **Gradients**: Linear 135deg, primary to secondary
- **Animations**: Smooth transitions, slide-up, floating orbs
- **Shadows**: 0 4px 12px rgba(0,0,0,0.1) to 0 20px 60px

## 🔒 Security

### Firebase Security Rules
- ✅ Users can only read/write their own data
- ✅ Admin can access all data
- ✅ Public read for widget config (`/publicData`)
- ✅ Validation for all data types
- ✅ String length limits enforced
- ✅ Admin-only write for subscriptions

### API Keys Protection
- ✅ Admin keys hidden from users (stored in `/subscriptions/{userId}/adminKeys`)
- ✅ Backend proxy via Cloudflare Workers
- ✅ No direct client access to AI APIs
- ✅ Rate limiting in Workers

### Authentication
- ✅ Firebase Auth (Google + Email/Password)
- ✅ Session management automatic
- ✅ Admin role check before dashboard access

## 📊 Database Schema

### Main Collections

#### `/users/{userId}`
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "photoURL": "https://...",
  "createdAt": 1738800000000,
  "lastLoginAt": 1738800000000
}
```

#### `/subscriptions/{userId}`
```json
{
  "status": "active",  // pending, active, expired, cancelled
  "email": "user@example.com",
  "aiName": "Customer Support Bot",
  "price": 25000,
  "subscribedAt": 1738800000000,
  "approvedAt": 1738800000001,
  "approvedBy": "admin-uid",
  "expiresAt": 1741392000000,
  "adminKeys": {
    "groq": ["gsk_..."],
    "cerebras": ["csk_..."]
  },
  "userKeys": {
    "key-id": {
      "provider": "openai",
      "key": "sk-...",
      "addedAt": 1738800000000
    }
  }
}
```

#### `/knowledge/{userId}/{docId}`
```json
{
  "title": "FAQ Document",
  "content": "Q: ... A: ...",
  "chunks": 5,
  "fileType": "text/plain",
  "fileSize": 1024,
  "createdAt": 1738800000000
}
```

#### `/publicData/{userId}/widgetConfig`
```json
{
  "aiName": "My Bot",
  "primaryColor": "#6366F1",
  "position": "bottom-right",
  "welcomeMessage": "Hello!",
  "suggestedQuestions": ["Question 1", "Question 2"]
}
```

Full schema: [DATABASE-SCHEMA.md](DATABASE-SCHEMA.md)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register user via Google
- [ ] Register user via Email/Password
- [ ] Subscribe → Payment flow
- [ ] Admin approve subscription
- [ ] User access dashboard
- [ ] Upload document
- [ ] Send chat message
- [ ] Copy embed code
- [ ] Test widget on external site

### API Testing
```bash
# Test Cloudflare Worker
curl -X POST https://chatbot-api.meera.id/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user",
    "message": "Hello",
    "sessionId": "test-session",
    "history": []
  }'
```

### Firebase Rules Testing
```javascript
// Test user isolation
firebase.database().ref('subscriptions/OTHER_USER_ID').once('value')
  .then(() => console.log('FAIL: Should be denied'))
  .catch(() => console.log('PASS: Correctly blocked'));
```

## 🐛 Known Issues & Roadmap

### Known Issues
- [ ] Speech recognition only works on HTTPS
- [ ] Large file uploads (>5MB) may timeout
- [ ] RAG search needs optimization for 1000+ docs

### Roadmap (v1.1.0)
- [ ] **Auto-renewal**: Subscription auto-renew via payment gateway
- [ ] **Email Notifications**: After approval, before expiry
- [ ] **Usage Limits**: Rate limiting per subscription tier
- [ ] **Advanced Analytics**: Charts, graphs, heatmaps
- [ ] **Multi-language**: English, Indonesian, etc.
- [ ] **Webhook Integration**: Slack, Discord notifications
- [ ] **API Access**: REST API untuk programmatic access

### Roadmap (v2.0.0)
- [ ] **Team Collaboration**: Multiple users per account
- [ ] **White-label**: Custom branding per client
- [ ] **A/B Testing**: Test different prompts/models
- [ ] **Voice Bot**: Phone integration
- [ ] **Marketplace**: Template chatbots

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 👥 Team

**Meera.id** - Building the future of conversational AI

- Website: https://meera.id
- Email: support@meera.id
- GitHub: [@meeraid](https://github.com/meeraid)

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com) - Backend infrastructure
- [Groq](https://groq.com) - Lightning-fast AI inference
- [Cerebras](https://cerebras.ai) - Ultra-fast LLM processing
- [Cloudflare Workers](https://workers.cloudflare.com) - Edge computing
- [Inter Font](https://rsms.me/inter/) - Beautiful typography

---

<div align="center">

**Built with ❤️ by Meera.id**

[Website](https://meera.id) • [Docs](https://docs.meera.id) • [Support](mailto:support@meera.id)

</div>
