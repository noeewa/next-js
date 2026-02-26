import { authCredentials } from "@/config/site"

// Simple authentication function for demo purposes
// In production, use proper Firebase Auth or NextAuth
export async function authenticateUser(username: string, password: string): Promise<{ success: boolean; user?: string; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Check credentials against config
  if (username === authCredentials.username && password === authCredentials.password) {
    return {
      success: true,
      user: username,
    }
  }

  return {
    success: false,
    error: "Invalid username or password",
  }
}

// Check if user is authenticated (simple session check)
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem("auth_user") !== null
}

// Get current user
export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem("auth_user")
}

// Login - store session
export function loginSession(username: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("auth_user", username)
  }
}

// Logout - clear session
export function logoutSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("auth_user")
  }
}
