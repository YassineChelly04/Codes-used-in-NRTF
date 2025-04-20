"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, RefreshCw, ThermometerSun, Droplets, Zap, AlertTriangle } from "lucide-react"
import { predictOptimalTemperature, detectAnomalies } from "@/lib/onnx-models"

export function AIRecommendations() {
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([
    {
      type: "optimal",
      icon: ThermometerSun,
      title: "Increase temperature by 2°C",
      description: "Raising digester temperature to 37°C will optimize biogas production.",
      impact: "high",
    },
    {
      type: "anomaly",
      icon: Droplets,
      title: "Unusual pH drop detected",
      description: "Check OMW input quality for Digester #2.",
      impact: "critical",
    },
    {
      type: "forecast",
      icon: Zap,
      title: "MFC efficiency can be improved",
      description: "Adjust hydraulic retention time to 6 hours for better performance.",
      impact: "medium",
    },
  ])
  const [forecastOutput, setForecastOutput] = useState(1250)
  const [forecastChange, setForecastChange] = useState(8)

  const handleRefresh = async () => {
    setLoading(true)

    try {
      // Get current simulated values
      const currentTemp = 35
      const currentPh = 6.5
      const organicLoadingRate = 3.2
      const substrateType = 1
      const biogasProduction = 42
      const pressure = 1.05
      const conductivity = 1820

      // Use the simulated models to generate recommendations
      const optimalTemp = await predictOptimalTemperature(organicLoadingRate, currentPh, substrateType)
      const isAnomaly = await detectAnomalies(currentTemp, currentPh, biogasProduction, pressure, conductivity)

      // Calculate temperature difference
      const tempDiff = optimalTemp - currentTemp

      // Update recommendations based on model outputs
      const newRecommendations = []

      // Temperature recommendation
      if (Math.abs(tempDiff) > 0.5) {
        newRecommendations.push({
          type: "optimal",
          icon: ThermometerSun,
          title: `${tempDiff > 0 ? "Increase" : "Decrease"} temperature by ${Math.abs(tempDiff).toFixed(1)}°C`,
          description: `${tempDiff > 0 ? "Raising" : "Lowering"} digester temperature to ${optimalTemp.toFixed(1)}°C will optimize biogas production.`,
          impact: Math.abs(tempDiff) > 2 ? "high" : "medium",
        })
      }

      // Anomaly detection
      if (isAnomaly) {
        newRecommendations.push({
          type: "anomaly",
          icon: AlertTriangle,
          title: currentPh < 6.8 ? "Unusual pH drop detected" : "System parameters out of optimal range",
          description:
            currentPh < 6.8
              ? "Check OMW input quality for Digester #2."
              : "Multiple parameters showing abnormal values. Check system.",
          impact: "critical",
        })
      }

      // Always add a third recommendation for completeness
      newRecommendations.push({
        type: "forecast",
        icon: Zap,
        title: "MFC efficiency can be improved",
        description: "Adjust hydraulic retention time to 6 hours for better performance.",
        impact: "medium",
      })

      // Update forecast values with some randomness
      const newForecast = 1200 + Math.floor(Math.random() * 200)
      const newChange = 5 + Math.floor(Math.random() * 8)

      // Update state
      setRecommendations(newRecommendations)
      setForecastOutput(newForecast)
      setForecastChange(newChange)
    } catch (error) {
      console.error("Error refreshing AI recommendations:", error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  // Run once on component mount to simulate initial model predictions
  useEffect(() => {
    handleRefresh()
  }, [])

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500 text-white">High Impact</Badge>
      case "medium":
        return <Badge className="bg-blue-500 text-white">Medium Impact</Badge>
      case "critical":
        return <Badge className="bg-red-500 text-white">Critical</Badge>
      default:
        return <Badge>Low Impact</Badge>
    }
  }

  const getTypeIcon = (type: string, Icon: any) => {
    switch (type) {
      case "optimal":
        return <Icon className="h-5 w-5 text-green-500" />
      case "anomaly":
        return <Icon className="h-5 w-5 text-red-500" />
      case "forecast":
        return <Icon className="h-5 w-5 text-blue-500" />
      default:
        return <Icon className="h-5 w-5" />
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>AI-powered insights and predictions</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex gap-3 rounded-md p-2 hover:bg-muted">
              <div className="mt-0.5 flex-shrink-0">{getTypeIcon(recommendation.type, recommendation.icon)}</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{recommendation.title}</h3>
                  {getImpactBadge(recommendation.impact)}
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
            </div>
          ))}

          <div className="rounded-md bg-muted p-3">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Biogas Production Forecast</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Predicted output for next 24h: <span className="font-medium">{forecastOutput} m³</span>({forecastChange}%
              above current rate)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
