# Firebase Security Rules - Deployment Guide

## 📋 Overview
File `database.rules.json` berisi security rules untuk Firebase Realtime Database yang mengatur akses ke semua data dalam platform ChatbotAI.

## 🔒 Security Model

### 1. **Users Collection** (`/users/{userId}`)
- **Read**: User sendiri ATAU admin
- **Write**: User sendiri saja
- **Validasi**: Email, displayName, createdAt wajib ada

### 2. **Subscriptions Collection** (`/subscriptions/{userId}`)
- **Read**: User sendiri ATAU admin
- **Write**: Admin saja (untuk approve/cancel)
- **Validasi**: Status hanya bisa: pending, active, expired, cancelled
- **Admin Keys**: Hanya admin yang bisa tambah/edit
- **User Keys**: User atau admin bisa tambah/edit

### 3. **Knowledge Base** (`/knowledge/{userId}/{docId}`)
- **Read**: Semua authenticated users (untuk RAG public access)
- **Write**: User pemilik ATAU admin
- **Validasi**: Title max 200 chars, content max 1MB

### 4. **Chats** (`/chats/{userId}/{chatId}`)
- **Read**: User sendiri ATAU admin
- **Write**: User sendiri saja
- **Validasi**: Message role: user/assistant/system, content max 50KB

### 5. **Settings** (`/settings/{userId}`)
- **Read**: User sendiri ATAU admin
- **Write**: User sendiri saja
- **Validasi**: 
  - widgetColor: Must be hex format (#RRGGBB)
  - widgetPosition: Only bottom-right/left, top-right/left
  - temperature: 0-2
  - maxTokens: 1-10000

### 6. **Embed Stats** (`/embedStats/{userId}/{statId}`)
- **Read**: User sendiri ATAU admin
- **Write**: Semua authenticated users (untuk logging dari widget)
- **Validasi**: Date format YYYY-MM-DD, interactions >= 0

### 7. **Admin Settings** (`/adminSettings`)
- **Read**: Admin saja
- **Write**: Admin saja
- **Sub-collections**:
  - `/admins/{adminId}`: List of admin users
  - `/systemConfig`: Global system config (QRIS, pricing, maintenance mode)

### 8. **Audit Log** (`/auditLog/{logId}`)
- **Read**: Admin saja
- **Write**: Admin saja
- **Index**: timestamp, adminId untuk filtering

### 9. **Public Data** (`/publicData/{userId}`)
- **Read**: Public (tidak perlu auth)
- **Write**: User pemilik ATAU admin
- **Purpose**: Data untuk embed widget (widgetConfig)

## 🚀 Deployment Steps

### Method 1: Via Firebase Console (Recommended)

1. **Login ke Firebase Console**
   ```
   https://console.firebase.google.com
   ```

2. **Pilih Project**
   - Pilih project: `argamada-ac6cc`
   - Region: `asia-southeast1`

3. **Buka Realtime Database**
   - Sidebar → Build → Realtime Database
   - Tab "Rules"

4. **Copy Rules**
   - Buka file `database.rules.json`
   - Copy seluruh isi file
   - Paste ke Rules editor di Firebase Console

5. **Publish Rules**
   - Klik tombol "Publish"
   - Confirm deployment
   - ✅ Rules akan aktif dalam beberapa detik

### Method 2: Via Firebase CLI

1. **Install Firebase CLI** (jika belum)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login ke Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (jika belum)
   ```bash
   firebase init database
   ```
   - Pilih existing project: `argamada-ac6cc`
   - Database rules file: `database.rules.json`

4. **Deploy Rules**
   ```bash
   firebase deploy --only database
   ```

5. **Verify Deployment**
   ```bash
   firebase database:get / --pretty
   ```

## ✅ Testing Rules

### Test 1: User Can Read Own Data
```javascript
// Di browser console (logged in as user)
firebase.database().ref('subscriptions/' + firebase.auth().currentUser.uid).once('value')
  .then(snap => console.log('✓ Can read own subscription:', snap.val()))
  .catch(err => console.error('✗ Cannot read:', err));
```

### Test 2: User Cannot Read Other User Data
```javascript
// Try reading another user's data
firebase.database().ref('subscriptions/OTHER_USER_ID').once('value')
  .then(snap => console.log('✗ SECURITY BREACH! Should not work'))
  .catch(err => console.log('✓ Correctly blocked:', err.message));
```

### Test 3: Admin Can Read All Data
```javascript
// Logged in as admin
firebase.database().ref('subscriptions').once('value')
  .then(snap => console.log('✓ Admin can read all:', Object.keys(snap.val()).length, 'users'))
  .catch(err => console.error('✗ Admin blocked:', err));
```

### Test 4: User Cannot Write Subscription Status
```javascript
// Try to self-approve (should fail)
firebase.database().ref('subscriptions/' + firebase.auth().currentUser.uid).update({
  status: 'active'
})
  .then(() => console.log('✗ SECURITY BREACH! User approved self'))
  .catch(err => console.log('✓ Correctly blocked:', err.message));
```

### Test 5: Public Can Read Widget Config
```javascript
// Without authentication
firebase.database().ref('publicData/SOME_USER_ID/widgetConfig').once('value')
  .then(snap => console.log('✓ Public read works:', snap.val()))
  .catch(err => console.error('✗ Public read blocked:', err));
```

## 🔧 Troubleshooting

### Issue: "Permission Denied"
**Solution**: 
- Check if user is authenticated: `firebase.auth().currentUser`
- Verify rules deployed: Check timestamp in Firebase Console
- Check if admin exists in `/adminSettings/admins/{uid}`

### Issue: "Validation Failed"
**Solution**:
- Check required fields exist in data
- Verify data types match validation rules
- Check string lengths within limits

### Issue: Rules Not Updating
**Solution**:
- Wait 30-60 seconds after deployment
- Clear browser cache
- Re-authenticate: `firebase.auth().signOut()` then sign in again

## 📊 Performance Considerations

### Indexing
Rules sudah include `.indexOn` untuk:
- `knowledge/{userId}`: createdAt, title
- `chats/{userId}`: createdAt, updatedAt
- `embedStats/{userId}`: date
- `auditLog`: timestamp, adminId

### Query Optimization
```javascript
// ✓ Good: Uses index
firebase.database().ref('knowledge/' + userId)
  .orderByChild('createdAt')
  .limitToLast(10)

// ✗ Bad: No index, slow
firebase.database().ref('knowledge/' + userId)
  .orderByChild('fileSize')  // Not indexed!
```

## 🛡️ Security Best Practices

1. **Never Expose Admin Keys**: Admin keys stored in `/subscriptions/{userId}/adminKeys` tidak bisa dibaca oleh user
2. **Validate Client-Side First**: Check auth state before making requests
3. **Use Transactions**: For critical operations (increment counters, etc.)
4. **Rate Limiting**: Implement in Cloudflare Workers, bukan di rules
5. **Monitor Audit Log**: Check `/auditLog` regularly untuk suspicious activities

## 🔄 Updating Rules

### Safe Update Process:
1. **Backup current rules**: Export dari Console
2. **Test locally**: Use Firebase Emulator
3. **Deploy to staging**: (if you have staging environment)
4. **Monitor errors**: Check Console → Realtime Database → Usage
5. **Rollback if needed**: Restore dari backup

### Rules Version Control:
```bash
# Commit rules to git
git add database.rules.json
git commit -m "Update: Allow public widget config read"
git push
```

## 📝 Common Patterns

### Pattern 1: Admin-Only Write, User Read
```json
{
  ".read": "$userId === auth.uid",
  ".write": "root.child('adminSettings/admins/' + auth.uid).exists()"
}
```

### Pattern 2: Owner or Admin Full Access
```json
{
  ".read": "$userId === auth.uid || root.child('adminSettings/admins/' + auth.uid).exists()",
  ".write": "$userId === auth.uid || root.child('adminSettings/admins/' + auth.uid).exists()"
}
```

### Pattern 3: Public Read, Owner Write
```json
{
  ".read": true,
  ".write": "$userId === auth.uid"
}
```

## 🚨 Emergency Actions

### Temporarily Lock Database:
```json
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

### Allow Admin-Only Access:
```json
{
  "rules": {
    ".read": "root.child('adminSettings/admins/' + auth.uid).exists()",
    ".write": "root.child('adminSettings/admins/' + auth.uid).exists()"
  }
}
```

## ✅ Deployment Checklist

- [ ] Rules file syntax valid (JSON format)
- [ ] Admin user exists in `/adminSettings/admins`
- [ ] Test user authentication works
- [ ] Test user can read own data
- [ ] Test user cannot read others' data
- [ ] Test admin can access all data
- [ ] Test public widget config readable
- [ ] Monitor Console for "Permission Denied" errors
- [ ] Backup current rules before deployment
- [ ] Document changes in git commit

## 📞 Support

Jika ada error setelah deployment:
1. Check Firebase Console → Database → Usage tab
2. Look for spike in "Permission Denied" requests
3. Rollback rules immediately if critical
4. Review audit log for suspicious activities
5. Contact Firebase Support jika perlu

---

**Last Updated**: February 6, 2026
**Platform**: ChatbotAI Multi-tenant SaaS
**Company**: Meera.id
