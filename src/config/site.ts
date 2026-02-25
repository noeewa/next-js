/**
 * Site Configuration
 */

export const siteConfig = {
  name: 'ChatBot Builder',
  description:
    'Platform untuk membuat dan menjual template chatbot AI. Otomatisasi layanan pelanggan dengan AI cerdas yang mudah diintegrasikan.',
  url: 'https://chatbot-builder.example.com',
  ogImage: 'https://chatbot-builder.example.com/og.jpg',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
}

/**
 * App Metadata
 */
export const appMetadata = {
  title: {
    default: `${siteConfig.name} - Jual Template Chatbot AI`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'chatbot AI',
    'template chatbot',
    'customer service bot',
    'AI automation',
    'chatbot builder',
  ],
  authors: [{ name: 'ChatBot Builder' }],
  creator: 'ChatBot Builder',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@chatbotbuilder',
  },
}

/**
 * App Navigation
 */
export const mainNav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

/**
 * Footer Links
 */
export const footerLinks = {
  product: [
    { label: 'Fitur', href: '#features' },
    { label: 'Harga', href: '#pricing' },
    { label: 'FAQ', href: '/faq' },
  ],
  company: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontak', href: '/contact' },
  ],
  legal: [
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}
