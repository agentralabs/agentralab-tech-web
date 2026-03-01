import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistPixelGrid } from 'geist/font/pixel'
import { RootProvider } from "fumadocs-ui/provider/next"
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/lib/site'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'AGENTRA LABS | AgenticMemory, AgenticVision, AgenticCodebase, AgenticIdentity, AgenticTime, AgenticContract, AgenticComm',
    template: '%s | AGENTRA LABS',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: 'AGENTRA LABS | Agentic Systems for Memory, Vision, Code Intelligence, Identity, Temporal Intelligence, Contract Governance, and Communication',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AGENTRA LABS — AgenticMemory, AgenticVision, AgenticCodebase, AgenticIdentity, AgenticTime, AgenticContract, AgenticComm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENTRA LABS | Memory, Vision, Code Intelligence, Identity, Temporal Intelligence, Contract Governance, and Communication',
    description: siteConfig.description,
    creator: siteConfig.xHandle,
    images: ['/twitter-image'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F2F1EA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/agentra-logo-current.svg`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: siteConfig.contactEmail,
        },
      ],
      sameAs: [siteConfig.githubOrgUrl, 'https://x.com/agentralab'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticMemory',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Persistent graph memory for AI agents. Facts, decisions, and corrections stored as traversable cognitive events in portable .amem files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticVision',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Persistent visual memory for AI agents. Capture, compare, diff, and search screenshots across sessions in portable .avis files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticCodebase',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Semantic code intelligence for AI agents. Compile repositories into concept graphs with impact analysis, coupling detection, and breakage prediction.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticIdentity',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Cryptographic trust anchors for AI agents. Ed25519 identity, signed action receipts, scoped trust grants, and tamper-evident audit trails in portable .aid files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticTime',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Temporal reasoning for AI agents. Deadlines, recurring schedules, PERT estimation, decay models, and timeline fork analysis in portable .atime files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticContract',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Policy engine for AI agents. Risk limits, approval workflows, obligation tracking, and self-healing governance in portable .acon files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AgenticComm',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: 'Structured communication runtime for AI agents. Channels, messaging, pub/sub, and delivery acknowledgments in portable .acomm files.',
      url: `${siteConfig.url}/projects`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ]

  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${GeistPixelGrid.variable}`} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
