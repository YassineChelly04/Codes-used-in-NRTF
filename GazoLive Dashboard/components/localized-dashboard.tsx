"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SystemStatus } from "@/components/system-status"
import { BiogasProductionChart } from "@/components/biogas-production-chart"
import { MFCOutputChart } from "@/components/mfc-output-chart"
import { OMWInputMonitoring } from "@/components/omw-input-monitoring"
import { SystemHealthOverview } from "@/components/system-health-overview"
import { AIRecommendations } from "@/components/ai-recommendations"
import { HistoricalTrends } from "@/components/historical-trends"
import { EnvironmentalImpact } from "@/components/environmental-impact"
import { AlertsLog } from "@/components/alerts-log"
import { LiveClock } from "@/components/live-clock"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/components/ui/use-toast"

export function LocalizedDashboard() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleRefresh = () => {
    toast({
      title: t("dashboard.refresh"),
      description: "Data refreshed successfully",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <div className="flex items-center gap-4">
            <LiveClock />
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("dashboard.refresh")}
            </Button>
          </div>
        </div>

        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950/50">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>{t("dashboard.critical")}</AlertTitle>
          <AlertDescription>{t("dashboard.ph_alert")}</AlertDescription>
        </Alert>

        <SystemStatus />

        <Tabs defaultValue="ad-panel" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ad-panel">{t("tabs.ad")}</TabsTrigger>
            <TabsTrigger value="mfc-panel">{t("tabs.mfc")}</TabsTrigger>
            <TabsTrigger value="omw-panel">{t("tabs.omw")}</TabsTrigger>
          </TabsList>

          <TabsContent value="ad-panel" className="space-y-4">
            <BiogasProductionChart />
          </TabsContent>

          <TabsContent value="mfc-panel" className="space-y-4">
            <MFCOutputChart />
          </TabsContent>

          <TabsContent value="omw-panel" className="space-y-4">
            <OMWInputMonitoring />
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SystemHealthOverview />
          <AIRecommendations />
          <HistoricalTrends />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnvironmentalImpact />
          <AlertsLog />
        </div>
      </main>
    </div>
  )
}
