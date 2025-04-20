"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { detectAnomalies } from "@/lib/onnx-models"

export function SystemStatus() {
  const [systemHealth, setSystemHealth] = useState(85) // Percentage of system health
  const [systems, setSystems] = useState([
    { name: "Digester #1", status: "operational" },
    { name: "Digester #2", status: "critical" },
    { name: "MFC Unit #1", status: "operational" },
    { name: "MFC Unit #2", status: "warning" },
    { name: "OMW Intake", status: "operational" },
    { name: "Water Treatment", status: "operational" },
  ])

  // Use the anomaly detection model to update system status periodically
  useEffect(() => {
    const updateSystemStatus = async () => {
      try {
        // Check for anomalies in Digester #1
        const digester1Anomaly = await detectAnomalies(36, 7.0, 45, 1.1, 1750)

        // Check for anomalies in MFC Unit #1
        const mfcUnit1Anomaly = await detectAnomalies(35, 6.9, 42, 1.05, 1820)

        // Update system statuses based on anomaly detection
        const updatedSystems = [...systems]

        // Update Digester #1 status
        updatedSystems[0] = {
          ...updatedSystems[0],
          status: digester1Anomaly ? "warning" : "operational",
        }

        // Update MFC Unit #1 status
        updatedSystems[2] = {
          ...updatedSystems[2],
          status: mfcUnit1Anomaly ? "warning" : "operational",
        }

        // Calculate new system health based on statuses
        const criticalCount = updatedSystems.filter((s) => s.status === "critical").length
        const warningCount = updatedSystems.filter((s) => s.status === "warning").length

        const newHealth = 100 - criticalCount * 15 - warningCount * 5

        // Update state
        setSystems(updatedSystems)
        setSystemHealth(newHealth)
      } catch (error) {
        console.error("Error updating system status:", error)
      }
    }

    // Initial update
    updateSystemStatus()

    // Set up interval to update every minute
    const intervalId = setInterval(updateSystemStatus, 60000)

    // Clean up on unmount
    return () => clearInterval(intervalId)
  }, [])

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Overall System Health</span>
            <span className="text-sm font-medium">{systemHealth}%</span>
          </div>
          <Progress value={systemHealth} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {systems.map((system) => (
            <div key={system.name} className="flex flex-col items-center gap-1 text-center">
              <Badge className={`flex items-center gap-1 ${getStatusColor(system.status)}`}>
                {getStatusIcon(system.status)}
                <span>{system.status === "operational" ? "OK" : system.status.toUpperCase()}</span>
              </Badge>
              <span className="text-xs">{system.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
