"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplet, BarChart3, MapIcon, ArrowUp, ArrowDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data
const omwData = [
  { date: "Jan 1", volume: 2500, turbidity: 320, conductivity: 1800, solidContent: 4.2 },
  { date: "Jan 2", volume: 2200, turbidity: 310, conductivity: 1750, solidContent: 4.0 },
  { date: "Jan 3", volume: 2800, turbidity: 340, conductivity: 1900, solidContent: 4.5 },
  { date: "Jan 4", volume: 3000, turbidity: 350, conductivity: 1950, solidContent: 4.7 },
  { date: "Jan 5", volume: 2700, turbidity: 330, conductivity: 1850, solidContent: 4.3 },
  { date: "Jan 6", volume: 2400, turbidity: 315, conductivity: 1780, solidContent: 4.1 },
  { date: "Jan 7", volume: 2600, turbidity: 325, conductivity: 1820, solidContent: 4.2 },
]

const sourceData = [
  { name: "Mill A", value: 35 },
  { name: "Mill B", value: 25 },
  { name: "Mill C", value: 20 },
  { name: "Mill D", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function OMWInputMonitoring() {
  const currentVolume = omwData[omwData.length - 1].volume
  const previousVolume = omwData[omwData.length - 2].volume
  const volumeChange = ((currentVolume - previousVolume) / previousVolume) * 100

  const currentTurbidity = omwData[omwData.length - 1].turbidity
  const currentConductivity = omwData[omwData.length - 1].conductivity
  const currentSolidContent = omwData[omwData.length - 1].solidContent

  const totalWeeklyVolume = omwData.reduce((sum, item) => sum + item.volume, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-medium">OMW Input Volume</CardTitle>
            <CardDescription>Daily olive mill wastewater intake (liters)</CardDescription>
          </div>
          <Tabs defaultValue="volume">
            <TabsList>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={omwData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="volume" fill="#3b82f6" name="Volume (L)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{currentVolume}</span>
                <span className="ml-1 text-sm text-muted-foreground">L</span>
              </div>
              <Badge
                className={`flex items-center gap-1 ${volumeChange >= 0 ? "bg-green-500" : "bg-red-500"} text-white`}
              >
                {volumeChange >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span>{Math.abs(volumeChange).toFixed(1)}%</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OMW Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Turbidity</span>
                </div>
                <span className="font-medium">{currentTurbidity} NTU</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Conductivity</span>
                </div>
                <span className="font-medium">{currentConductivity} µS/cm</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapIcon className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Solid Content</span>
                </div>
                <span className="font-medium">{currentSolidContent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Source Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[150px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
