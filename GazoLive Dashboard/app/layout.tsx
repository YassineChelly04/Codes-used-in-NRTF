import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GazoLive Dashboard",
  description: "Monitoring dashboard for olive mill wastewater processing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <div className="hidden w-64 border-r md:block">
                <div className="flex h-14 items-center border-b px-6">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="GazoLive Logo" className="h-8 w-8" />
                    <span className="text-xl font-bold">GazoLive</span>
                  </div>
                </div>
                <SidebarNav />
                <div className="border-t p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">© 2025 GazoLive</div>
                    <div className="text-xs text-muted-foreground">v1.0.0</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
