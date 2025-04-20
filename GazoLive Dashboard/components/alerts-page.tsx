"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, Filter, User, ThermometerSun, Droplets, Zap, Bell } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AlertsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const alerts = [
    {
      id: 1,
      timestamp: "2025-04-20 14:32:45",
      message: "pH level in Digester #2 below threshold (5.2)",
      severity: "critical",
      status: "unresolved",
      icon: Droplets,
    },
    {
      id: 2,
      timestamp: "2025-04-20 12:18:22",
      message: "MFC Unit #2 voltage drop detected",
      severity: "warning",
      status: "unresolved",
      icon: Zap,
    },
    {
      id: 3,
      timestamp: "2025-04-20 09:45:10",
      message: "Digester #1 temperature fluctuation",
      severity: "warning",
      status: "resolved",
      icon: ThermometerSun,
    },
    {
      id: 4,
      timestamp: "2025-04-19 22:12:33",
      message: "OMW intake flow rate irregular",
      severity: "info",
      status: "resolved",
      icon: Droplets,
    },
    {
      id: 5,
      timestamp: "2025-04-19 16:05:27",
      message: "System maintenance completed",
      severity: "info",
      status: "resolved",
      icon: CheckCircle,
    },
    {
      id: 6,
      timestamp: "2025-04-18 11:22:15",
      message: "Biogas production below expected range",
      severity: "warning",
      status: "resolved",
      icon: AlertTriangle,
    },
    {
      id: 7,
      timestamp: "2025-04-17 09:14:33",
      message: "Network connectivity issues detected",
      severity: "warning",
      status: "resolved",
      icon: AlertTriangle,
    },
  ]

  const actions = [
    {
      id: 1,
      timestamp: "2025-04-20 15:10:22",
      user: "Admin",
      action: "Adjusted pH buffer in Digester #2",
      target: "Digester #2",
    },
    {
      id: 2,
      timestamp: "2025-04-20 13:45:18",
      user: "Technician",
      action: "Inspected MFC Unit #2 and replaced membrane",
      target: "MFC Unit #2",
    },
    {
      id: 3,
      timestamp: "2025-04-20 10:22:05",
      user: "Operator",
      action: "Restarted temperature control system",
      target: "Digester #1",
    },
    {
      id: 4,
      timestamp: "2025-04-19 23:15:40",
      user: "System",
      action: "Automatic flow rate adjustment",
      target: "OMW Intake",
    },
    {
      id: 5,
      timestamp: "2025-04-19 16:00:12",
      user: "Maintenance",
      action: "Completed scheduled system maintenance",
      target: "All Units",
    },
  ]

  const handleAlertAction = (alertId: number) => {
    toast({
      title: `Alert #${alertId}`,
      description: "Alert marked as resolved",
    })
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>
      case "info":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Resolved
          </Badge>
        )
      case "unresolved":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Unresolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.alerts.title")}</h1>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Configure Notifications
          </Button>
        </div>

        <p className="text-muted-foreground">{t("page.alerts.description")}</p>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("alerts.title")}</CardTitle>
                  <div className="flex gap-2">
                    <Input placeholder="Search alerts..." className="w-[200px]" />
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{t("alerts.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="alerts">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="alerts">{t("alerts.alerts")}</TabsTrigger>
                    <TabsTrigger value="actions">{t("alerts.actions")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="alerts" className="space-y-4 pt-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 rounded-md border p-3 hover:bg-muted">
                        <div className="mt-0.5 flex-shrink-0">
                          {alert.icon && (
                            <alert.icon
                              className={`h-5 w-5 ${
                                alert.severity === "critical"
                                  ? "text-red-500"
                                  : alert.severity === "warning"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <p className="font-medium">{alert.message}</p>
                            <div className="flex flex-wrap gap-2">
                              {getSeverityBadge(alert.severity)}
                              {getStatusBadge(alert.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{alert.timestamp}</span>
                          </div>
                          {alert.status === "unresolved" && (
                            <div className="pt-2">
                              <Button size="sm" onClick={() => handleAlertAction(alert.id)}>
                                Mark as Resolved
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-4 pt-4">
                    {actions.map((action) => (
                      <div key={action.id} className="flex items-start gap-3 rounded-md border p-3 hover:bg-muted">
                        <div className="mt-0.5 flex-shrink-0">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <div>
                              <p className="font-medium">{action.action}</p>
                              <p className="text-sm text-muted-foreground">Target: {action.target}</p>
                            </div>
                            <Badge variant="outline">{action.user}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{action.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Alerts</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warning Alerts</span>
                    <Badge className="bg-yellow-500 text-white">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Info Alerts</span>
                    <Badge variant="outline">0</Badge>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-3">
                  <h3 className="mb-2 text-sm font-medium">Alert Settings</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Alert Priority</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Alerts</SelectItem>
                          <SelectItem value="critical">Critical Only</SelectItem>
                          <SelectItem value="warning">Warning & Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Time Range</label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">Last 24 Hours</SelectItem>
                          <SelectItem value="7d">Last 7 Days</SelectItem>
                          <SelectItem value="30d">Last 30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Export Alert Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
