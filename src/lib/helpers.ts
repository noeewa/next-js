/**
 * Format currency to Indonesian Rupiah
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Format large numbers with thousand separator
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('id-ID')
}

/**
 * Truncate text to specific length
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Get status badge color classes
 */
export const getStatusColor = (status: 'active' | 'draft' | 'inactive') => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
    case 'draft':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
    case 'inactive':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

/**
 * Get status label in Indonesian
 */
export const getStatusLabel = (status: 'active' | 'draft' | 'inactive'): string => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'draft':
      return 'Draft'
    case 'inactive':
      return 'Nonaktif'
    default:
      return status
  }
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Format relative time (e.g., "2 minutes ago")
 */
export const getRelativeTime = (date: Date | string): string => {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 60) return 'baru saja'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} hari lalu`

  return past.toLocaleDateString('id-ID')
}
