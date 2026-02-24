/**
 * ============================================
 * TIPE DATA / INTERFACE UNTUK CHATBOT AI PLATFORM
 * ============================================
 * 
 * Berikut adalah kumpulan interface yang digunakan
 * di seluruh aplikasi sesuai dengan struktur folder.
 */

// ============================================
// 1. INTERFACE DASAR (BASE)
// ============================================

/**
 * Props standar untuk komponen Next.js
 * Digunakan di semua file layout.tsx
 */
export type Props = {
    children: React.ReactNode;
};

/**
 * Props untuk halaman dengan parameter URL
 * Digunakan di folder [projectName]
 */
export type PropsWithParams<T> = {
    params: Promise<T>;
};

// ============================================
// 2. USER & AUTHENTICATION
// ============================================

/**
 * Data user yang login
 */
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: number;
    lastLoginAt: number;
}

/**
 * Tipe role user
 */
export type UserRole = 'user' | 'admin' | 'client';

// ============================================
// 3. PROJECT (PROYEK CHATBOT)
// ============================================

/**
 * Data proyek chatbot
 */
export interface Project {
    id: string;
    userId: string;
    name: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
    status: ProjectStatus;
}

/**
 * Status proyek
 */
export type ProjectStatus = 'draft' | 'active' | 'inactive' | 'pending';

/**
 * Parameter untuk halaman project detail
 * Cocok dengan folder [projectName]
 */
export interface ProjectParams {
    projectName: string;
}

// ============================================
// 4. SUBSCRIPTION & PAYMENT
// ============================================

/**
 * Data langganan/subscription user
 */
export interface Subscription {
    userId: string;
    email: string;
    status: SubscriptionStatus;
    price: number;
    subscribedAt: number;
    expiresAt: number;
    approvedAt?: number;
    approvedBy?: string;
    aiName?: string;
    adminKeys?: AdminKeys;
    userKeys?: Record<string, UserKey>;
}

/**
 * Status langganan
 */
export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'cancelled';

/**
 * Kunci API dari admin
 */
export interface AdminKeys {
    groq?: string[];
    cerebras?: string[];
    openai?: string[];
}

/**
 * Kunci API kustom dari user
 */
export interface UserKey {
    provider: 'openai' | 'groq' | 'cerebras';
    key: string;
    addedAt: number;
}

/**
 * Status pembayaran
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// ============================================
// 5. KNOWLEDGE BASE (DOKUMEN TRAINING)
// ============================================

/**
 * Dokumen untuk training chatbot
 */
export interface KnowledgeDocument {
    id: string;
    userId: string;
    projectId: string;
    title: string;
    content?: string;
    fileType: string;
    fileSize: number;
    chunks: number;
    status: DocumentStatus;
    createdAt: number;
    updatedAt: number;
}

/**
 * Status dokumen
 */
export type DocumentStatus = 'processing' | 'ready' | 'failed';

// ============================================
// 6. WIDGET CONFIG (KONFIGURASI CHAT WIDGET)
// ============================================

/**
 * Konfigurasi widget chatbot
 */
export interface WidgetConfig {
    userId: string;
    projectId: string;
    aiName: string;
    primaryColor: string;
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    welcomeMessage: string;
    suggestedQuestions?: string[];
    theme?: 'light' | 'dark';
}

// ============================================
// 7. ADMIN & MANAGEMENT
// ============================================

/**
 * Data admin
 */
export interface Admin {
    uid: string;
    email: string;
    addedAt: number;
    addedBy: string;
    role: 'super_admin' | 'admin';
}

/**
 * Settings admin global
 */
export interface AdminSettings {
    pricing: number;
    currency: string;
    qrisImage?: string;
    maintenanceMode: boolean;
    maxProjectsPerUser: number;
}

// ============================================
// 8. INTERFACE UNTUK SETIAP HALAMAN
// ============================================

/**
 * Props untuk halaman dashboard utama (/dashboard)
 */
export interface DashboardPageProps {
    // Nanti akan ditambahkan data user, projects, etc.
}

/**
 * Props untuk halaman create project (/dashboard/create)
 */
export interface CreateProjectPageProps {
    // Nanti akan ditambahkan form data
}

/**
 * Props untuk halaman payment (/dashboard/create/payment)
 */
export interface PaymentPageProps {
    // Nanti akan ditambahkan payment data
}

/**
 * Props untuk halaman project detail (/dashboard/[projectName])
 */
export interface ProjectDetailPageProps extends ProjectParams {
    // Nanti akan ditambahkan project data
}

/**
 * Props untuk halaman status payment (/dashboard/[projectName]/status)
 */
export interface StatusPaymentPageProps extends ProjectParams {
    // Nanti akan ditambahkan payment status
}

/**
 * Props untuk halaman admin (/dashboard/admin)
 */
export interface AdminPageProps {
    // Nanti akan ditambahkan admin data
}

/**
 * Props untuk halaman client (/dashboard/client)
 */
export interface ClientPageProps {
    // Nanti akan ditambahkan client data
}

// ============================================
// 9. API RESPONSE TYPES
// ============================================

/**
 * Response umum dari API
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Response untuk chat message
 */
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

/**
 * Request untuk chat API
 */
export interface ChatRequest {
    userId: string;
    projectId: string;
    message: string;
    sessionId: string;
    history: ChatMessage[];
}
