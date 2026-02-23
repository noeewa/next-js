# Database Schema - Multi-tenant SaaS Platform

## Firebase Realtime Database Structure

```json
{
  "users": {
    "{userId}": {
      "email": "user@example.com",
      "displayName": "John Doe",
      "photoURL": "https://...",
      "role": "user",  // "user" | "admin"
      "createdAt": 1234567890,
      "lastLogin": 1234567890
    }
  },
  
  "subscriptions": {
    "{userId}": {
      "status": "pending",  // "pending" | "active" | "expired" | "cancelled"
      "aiName": "Customer Support Bot",
      "email": "user@example.com",
      "plan": "basic",
      "price": 25000,
      "subscribedAt": 1234567890,
      "paidAt": 1234567890,
      "expiresAt": 1234567890,
      "approvedAt": null,
      "approvedBy": null,
      
      "adminKeys": {
        "groq": ["gsk_key1", "gsk_key2"],
        "cerebras": ["csk_key1"]
      },
      
      "userApiKey": {
        "provider": "openai",  // "openai" | "anthropic" | "google"
        "key": "sk-...",
        "addedAt": 1234567890
      },
      
      "paymentProof": "https://storage.../qris-screenshot.jpg",
      "notes": "Admin notes here"
    }
  },
  
  "knowledge": {
    "{userId}": {
      "{docId}": {
        "title": "Product Documentation",
        "content": "...",
        "category": "general",
        "timestamp": 1234567890,
        "suggestedQuestion": "Apa itu product X?"
      }
    }
  },
  
  "chats": {
    "{userId}": {
      "{chatId}": {
        "messages": [
          {
            "role": "user",
            "content": "Hello",
            "timestamp": 1234567890
          },
          {
            "role": "assistant",
            "content": "Hi there!",
            "timestamp": 1234567890
          }
        ],
        "createdAt": 1234567890,
        "lastMessage": 1234567890
      }
    }
  },
  
  "settings": {
    "{userId}": {
      "systemPrompt": "You are a helpful assistant...",
      "model": "llama-3.3-70b-versatile",
      "theme": "light",
      "welcomeMessage": "Hello! How can I help?",
      "widgetColor": "#1E40AF",
      "widgetPosition": "bottom-right"
    }
  },
  
  "embedStats": {
    "{userId}": {
      "totalViews": 0,
      "totalMessages": 0,
      "lastActive": 1234567890,
      "domains": {
        "example.com": {
          "views": 100,
          "messages": 50
        }
      }
    }
  },
  
  "adminSettings": {
    "admins": {
      "{adminUserId}": {
        "email": "admin@ugm.ac.id",
        "addedAt": 1234567890,
        "addedBy": "superAdminId"
      }
    },
    "masterPassword": "hashed_password",
    "qrisImage": "https://storage.../qris-static.jpg",
    "paymentInstructions": "Transfer ke QRIS..."
  },
  
  "auditLog": {
    "{logId}": {
      "action": "approve_subscription",
      "userId": "abc123",
      "adminId": "admin123",
      "timestamp": 1234567890,
      "details": {
        "aiName": "Support Bot",
        "keysAdded": 2
      }
    }
  }
}
```

## Security Rules

```json
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid || root.child('adminSettings/admins').child(auth.uid).exists()",
        ".write": "$userId === auth.uid || root.child('adminSettings/admins').child(auth.uid).exists()"
      }
    },
    
    "subscriptions": {
      "$userId": {
        ".read": "$userId === auth.uid || root.child('adminSettings/admins').child(auth.uid).exists()",
        ".write": "root.child('adminSettings/admins').child(auth.uid).exists()"
      }
    },
    
    "knowledge": {
      "$userId": {
        ".read": "true",
        "$docId": {
          ".write": "$userId === auth.uid || root.child('adminSettings/admins').child(auth.uid).exists()"
        }
      }
    },
    
    "chats": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    },
    
    "settings": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    },
    
    "embedStats": {
      "$userId": {
        ".read": "$userId === auth.uid || root.child('adminSettings/admins').child(auth.uid).exists()",
        ".write": "true"
      }
    },
    
    "adminSettings": {
      ".read": "root.child('adminSettings/admins').child(auth.uid).exists()",
      ".write": "root.child('adminSettings/admins').child(auth.uid).exists()"
    },
    
    "auditLog": {
      ".read": "root.child('adminSettings/admins').child(auth.uid).exists()",
      "$logId": {
        ".write": "!data.exists() && root.child('adminSettings/admins').child(auth.uid).exists()"
      }
    }
  }
}
```

## URL Structure

- `/` - Landing page (unauthenticated or redirect to dashboard)
- `/login` - Login page (Google OAuth + Email/Password)
- `/subscribe` - Subscription flow
- `/dashboard` - User dashboard (content per user)
- `/admin` - Admin dashboard
- `/embed/{userId}` - Public embed widget (iframe/script)
- `/chat/{userId}` - Public chat interface for embed

## User Flow

1. **New User**:
   - Land on `/` → See features
   - Click "Get Started" → `/login`
   - Login with Google/Email → `/subscribe`
   - Fill AI name + See QRIS → Wait approval
   - Status: `pending`

2. **Admin Approval**:
   - Admin login → `/admin`
   - See pending list
   - Click user → Modal with AI name, date
   - Add Groq/Cerebras API keys (multiple)
   - Click "Approve"
   - User gets email notification
   - Status: `active`

3. **Active User**:
   - Login → `/dashboard`
   - See sidebar: Home, Dokumen, Cara Memasang, API, Setting
   - Can chat, manage docs, get embed code
   - Can add 1 custom API key (optional)

4. **Embed Widget**:
   - User copies code from "Cara Memasang"
   - Paste in their website
   - Visitors see floating button
   - Click → popup chat with AI
   - Chat data isolated per user

## API Keys Priority

When user sends chat:
1. Check if user has custom API key → Use it
2. If not, use admin-provided keys (round-robin/failover)
3. Log usage for billing/stats
