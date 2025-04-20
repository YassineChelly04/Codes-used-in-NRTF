"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle, Zap, Percent, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function MFCUnitsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const mfcUnits = [
    {
      id: 1,
      name: "MFC Unit #1",
      status: "operational",
      voltage: 0.78,
      current: 0.58,
      power: 0.45,
      efficiency: 48,
      temperature: 32.5,
      uptime: 1245,
    },
    {
      id: 2,
      name: "MFC Unit #2",
      status: "warning",
      voltage: 0.65,
      current: 0.48,
      power: 0.31,
      efficiency: 40,
      temperature: 33.2,
      uptime: 980,
    },
    {
      id: 3,
      name: "MFC Unit #3",
      status: "operational",
      voltage: 0.72,
      current: 0.52,
      power: 0.37,
      efficiency: 43,
      temperature: 32.8,
      uptime: 1120,
    },
  ]

  const handleControlClick = (unitId: number) => {
    toast({
      title: `${t("nav.mfc_units")} #${unitId}`,
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
          <h1 className="text-2xl font-bold">{t("page.mfc.title")}</h1>
        </div>

        <p className="text-muted-foreground">{t("page.mfc.description")}</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mfcUnits.map((unit) => (
            <Card key={unit.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{unit.name}</CardTitle>
                  <Badge className={`flex items-center gap-1 ${getStatusColor(unit.status)}`}>
                    {getStatusIcon(unit.status)}
                    <span>{unit.status === "operational" ? t("system.ok") : unit.status.toUpperCase()}</span>
                  </Badge>
                </div>
                <CardDescription>ID: {unit.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{t("mfc.power")}</span>
                    </div>
                    <div className="text-xl font-bold">{unit.power.toFixed(2)} W</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{t("mfc.efficiency")}</span>
                    </div>
                    <div className="text-xl font-bold">{unit.efficiency}%</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t("mfc.efficiency")}</span>
                    <span className="text-sm font-medium">{unit.efficiency}%</span>
                  </div>
                  <Progress value={unit.efficiency} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("mfc.voltage")}:</span> {unit.voltage.toFixed(2)} V
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("mfc.current")}:</span> {unit.current.toFixed(2)} A
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("biogas.temperature")}:</span> {unit.temperature}°C
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uptime:</span> {unit.uptime} h
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={unit.status === "critical" ? "destructive" : "default"}
                  onClick={() => handleControlClick(unit.id)}
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
