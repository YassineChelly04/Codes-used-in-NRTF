"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BarChart3, Settings, AlertTriangle, FileText, Map, Droplets, Zap, Leaf } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function SidebarNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const items = [
    {
      title: t("nav.dashboard"),
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: t("nav.analytics"),
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: t("nav.digesters"),
      href: "/digesters",
      icon: Droplets,
    },
    {
      title: t("nav.mfc_units"),
      href: "/mfc-units",
      icon: Zap,
    },
    {
      title: t("nav.omw_sources"),
      href: "/omw-sources",
      icon: Map,
    },
    {
      title: t("nav.environmental"),
      href: "/environmental-impact",
      icon: Leaf,
    },
    {
      title: t("nav.alerts"),
      href: "/alerts",
      icon: AlertTriangle,
    },
    {
      title: t("nav.reports"),
      href: "/reports",
      icon: FileText,
    },
    {
      title: t("nav.settings"),
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid gap-2 px-2 py-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
