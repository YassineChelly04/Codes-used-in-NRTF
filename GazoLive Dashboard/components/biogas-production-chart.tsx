"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Thermometer, Activity } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { predictBiogasProduction } from "@/lib/onnx-models"

// Sample data
const initialBiogasData = [
  { time: "00:00", production: 42, temperature: 35, ph: 7.1 },
  { time: "02:00", production: 38, temperature: 34, ph: 7.0 },
  { time: "04:00", production: 35, temperature: 34, ph: 6.9 },
  { time: "06:00", production: 32, temperature: 33, ph: 6.8 },
  { time: "08:00", production: 36, temperature: 34, ph: 6.9 },
  { time: "10:00", production: 45, temperature: 35, ph: 7.0 },
  { time: "12:00", production: 52, temperature: 36, ph: 7.1 },
  { time: "14:00", production: 58, temperature: 37, ph: 7.2 },
  { time: "16:00", production: 55, temperature: 37, ph: 7.2 },
  { time: "18:00", production: 50, temperature: 36, ph: 7.1 },
  { time: "20:00", production: 48, temperature: 36, ph: 7.0 },
  { time: "22:00", production: 45, temperature: 35, ph: 7.0 },
  { time: "24:00", production: 43, temperature: 35, ph: 7.1 },
]

export function BiogasProductionChart() {
  const [timeRange, setTimeRange] = useState("24h")
  const [biogasData, setBiogasData] = useState(initialBiogasData)
  const [isLoading, setIsLoading] = useState(false)

  // Use the ONNX model to update the last data point periodically
  useEffect(() => {
    const updateData = async () => {
      setIsLoading(true)

      try {
        // Get the latest data point
        const lastPoint = biogasData[biogasData.length - 1]

        // Use the model to predict the next production value
        const predictedProduction = await predictBiogasProduction(
          lastPoint.temperature,
          lastPoint.ph,
          3.5, // organic loading rate
          24, // hydraulic retention time
        )

        // Create a new data array with updated values
        const newData = [...biogasData]

        // Update the last point with the predicted value
        if (predictedProduction !== null) {
          newData[newData.length - 1] = {
            ...lastPoint,
            production: Math.round(predictedProduction * 10) / 10,
          }
        }

        // Update the state
        setBiogasData(newData)
      } catch (error) {
        console.error("Error updating biogas data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial update
    updateData()

    // Set up interval to update every 30 seconds
    const intervalId = setInterval(updateData, 30000)

    // Clean up on unmount
    return () => clearInterval(intervalId)
  }, [])

  const currentProduction = biogasData[biogasData.length - 1].production
  const previousProduction = biogasData[biogasData.length - 2].production
  const productionChange = ((currentProduction - previousProduction) / previousProduction) * 100

  const currentTemperature = biogasData[biogasData.length - 1].temperature
  const currentPh = biogasData[biogasData.length - 1].ph

  const totalDailyProduction = biogasData.reduce((sum, item) => sum + item.production, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-medium">Biogas Production</CardTitle>
            <CardDescription>Real-time biogas flow rate (m³/h)</CardDescription>
          </div>
          <Tabs defaultValue="24h" onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={biogasData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="production"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorProduction)"
                    name="Biogas (m³/h)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Flow Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{currentProduction}</span>
                <span className="ml-1 text-sm text-muted-foreground">m³/h</span>
              </div>
              <Badge
                className={`flex items-center gap-1 ${productionChange >= 0 ? "bg-green-500" : "bg-red-500"} text-white`}
              >
                {productionChange >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span>{Math.abs(productionChange).toFixed(1)}%</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{totalDailyProduction}</span>
              <span className="ml-1 text-sm text-muted-foreground">m³/day</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Digester Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="text-xl font-bold">{currentTemperature}°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-xl font-bold">{currentPh}</div>
                  <div className="text-xs text-muted-foreground">pH Level</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
