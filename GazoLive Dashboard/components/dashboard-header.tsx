"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, User, Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarNav } from "@/components/sidebar-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/components/ui/use-toast"

export function DashboardHeader() {
  const [notificationCount, setNotificationCount] = useState(3)
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleNotificationClick = () => {
    toast({
      title: t("header.notifications"),
      description: "You have 3 unread notifications",
    })
    setNotificationCount(0)
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-14 items-center border-b px-6">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="GazoLive Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">GazoLive</span>
              </div>
            </div>
            <SidebarNav />
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="GazoLive Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">GazoLive</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {notificationCount}
              </span>
            )}
          </Button>

          <LanguageSwitcher />
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("header.account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("header.profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("header.settings")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("header.logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
