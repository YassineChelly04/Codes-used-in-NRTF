"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Filter, User, ThermometerSun, Droplets, Zap } from "lucide-react"

export function AlertsLog() {
  const [activeTab, setActiveTab] = useState("alerts")

  const alerts = [
    {
      id: 1,
      timestamp: "2023-01-15 14:32:45",
      message: "pH level in Digester #2 below threshold (5.2)",
      severity: "critical",
      status: "unresolved",
      icon: Droplets,
    },
    {
      id: 2,
      timestamp: "2023-01-15 12:18:22",
      message: "MFC Unit #2 voltage drop detected",
      severity: "warning",
      status: "unresolved",
      icon: Zap,
    },
    {
      id: 3,
      timestamp: "2023-01-15 09:45:10",
      message: "Digester #1 temperature fluctuation",
      severity: "warning",
      status: "resolved",
      icon: ThermometerSun,
    },
    {
      id: 4,
      timestamp: "2023-01-14 22:12:33",
      message: "OMW intake flow rate irregular",
      severity: "info",
      status: "resolved",
      icon: Droplets,
    },
    {
      id: 5,
      timestamp: "2023-01-14 16:05:27",
      message: "System maintenance completed",
      severity: "info",
      status: "resolved",
      icon: CheckCircle,
    },
  ]

  const actions = [
    {
      id: 1,
      timestamp: "2023-01-15 15:10:22",
      user: "Admin",
      action: "Adjusted pH buffer in Digester #2",
      target: "Digester #2",
    },
    {
      id: 2,
      timestamp: "2023-01-15 13:45:18",
      user: "Technician",
      action: "Inspected MFC Unit #2 and replaced membrane",
      target: "MFC Unit #2",
    },
    {
      id: 3,
      timestamp: "2023-01-15 10:22:05",
      user: "Operator",
      action: "Restarted temperature control system",
      target: "Digester #1",
    },
    {
      id: 4,
      timestamp: "2023-01-14 23:15:40",
      user: "System",
      action: "Automatic flow rate adjustment",
      target: "OMW Intake",
    },
    {
      id: 5,
      timestamp: "2023-01-14 16:00:12",
      user: "Maintenance",
      action: "Completed scheduled system maintenance",
      target: "All Units",
    },
  ]

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Alerts & Logs</CardTitle>
            <CardDescription>Recent system alerts and user actions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted">
                <div className="mt-0.5 flex-shrink-0">
                  <alert.icon
                    className={`h-5 w-5 ${
                      alert.severity === "critical"
                        ? "text-red-500"
                        : alert.severity === "warning"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }`}
                  />
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
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            {actions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted">
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
  )
}
