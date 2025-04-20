"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Clock, Wrench } from "lucide-react"

export function SystemHealthOverview() {
  const units = [
    { name: "Digester #1", status: "operational", nextMaintenance: "15 days" },
    { name: "Digester #2", status: "critical", nextMaintenance: "Immediate" },
    { name: "MFC Unit #1", status: "operational", nextMaintenance: "7 days" },
    { name: "MFC Unit #2", status: "warning", nextMaintenance: "3 days" },
    { name: "OMW Intake", status: "operational", nextMaintenance: "21 days" },
    { name: "Water Treatment", status: "operational", nextMaintenance: "10 days" },
    { name: "pH Sensor #1", status: "operational", nextMaintenance: "30 days" },
    { name: "pH Sensor #2", status: "warning", nextMaintenance: "2 days" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const maintenanceAlerts = [
    { unit: "pH Sensor #2", task: "Clean pH sensor", dueIn: "2 days" },
    { unit: "MFC Unit #2", task: "Replace membrane", dueIn: "3 days" },
    { unit: "Digester #2", task: "Check temperature probe", dueIn: "Immediate" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>System Health Overview</CardTitle>
        <CardDescription>Status of process units and maintenance alerts</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">Process Units Status</h3>
            <div className="grid grid-cols-1 gap-2">
              {units.map((unit) => (
                <div key={unit.name} className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-muted">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(unit.status)}
                    <span className="text-sm">{unit.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{unit.nextMaintenance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Maintenance Alerts</h3>
            <div className="grid grid-cols-1 gap-2">
              {maintenanceAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between rounded-md bg-muted px-2 py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{alert.task}</span>
                    <span className="text-xs text-muted-foreground">{alert.unit}</span>
                  </div>
                  <Badge
                    variant={alert.dueIn === "Immediate" ? "destructive" : "outline"}
                    className="flex items-center gap-1"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>{alert.dueIn}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
