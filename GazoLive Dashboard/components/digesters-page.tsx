"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle, Thermometer, Activity, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function DigestersPage() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const digesters = [
    {
      id: 1,
      name: "Digester #1",
      status: "operational",
      temperature: 36.5,
      ph: 7.1,
      pressure: 1.05,
      loadingRate: 3.2,
      retentionTime: 24,
      biogasProduction: 45,
    },
    {
      id: 2,
      name: "Digester #2",
      status: "critical",
      temperature: 34.2,
      ph: 5.2,
      pressure: 1.12,
      loadingRate: 2.8,
      retentionTime: 22,
      biogasProduction: 32,
    },
    {
      id: 3,
      name: "Digester #3",
      status: "operational",
      temperature: 35.8,
      ph: 7.0,
      pressure: 1.08,
      loadingRate: 3.0,
      retentionTime: 24,
      biogasProduction: 42,
    },
  ]

  const handleControlClick = (digesterId: number) => {
    toast({
      title: `${t("nav.digesters")} #${digesterId}`,
      description: "Control panel opened",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "critical":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertCircle className="h-4 w-4" />
      case "critical":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.digesters.title")}</h1>
        </div>

        <p className="text-muted-foreground">{t("page.digesters.description")}</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {digesters.map((digester) => (
            <Card key={digester.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{digester.name}</CardTitle>
                  <Badge className={`flex items-center gap-1 ${getStatusColor(digester.status)}`}>
                    {getStatusIcon(digester.status)}
                    <span>{digester.status === "operational" ? t("system.ok") : digester.status.toUpperCase()}</span>
                  </Badge>
                </div>
                <CardDescription>ID: {digester.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">{t("biogas.temperature")}</span>
                    </div>
                    <div className="text-xl font-bold">{digester.temperature}°C</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{t("biogas.ph")}</span>
                    </div>
                    <div className="text-xl font-bold">{digester.ph}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t("biogas.title")}</span>
                    <span className="text-sm font-medium">{digester.biogasProduction} m³/h</span>
                  </div>
                  <Progress value={digester.biogasProduction * 2} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pressure:</span> {digester.pressure} bar
                  </div>
                  <div>
                    <span className="text-muted-foreground">Loading Rate:</span> {digester.loadingRate} kg/m³
                  </div>
                  <div>
                    <span className="text-muted-foreground">Retention:</span> {digester.retentionTime} h
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={digester.status === "critical" ? "destructive" : "default"}
                  onClick={() => handleControlClick(digester.id)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Control Panel
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
