"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Zap, Percent } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data
const mfcData = [
  { time: "00:00", voltage: 0.7, current: 0.5, power: 0.35, efficiency: 42 },
  { time: "02:00", voltage: 0.65, current: 0.48, power: 0.31, efficiency: 40 },
  { time: "04:00", voltage: 0.62, current: 0.45, power: 0.28, efficiency: 38 },
  { time: "06:00", voltage: 0.6, current: 0.42, power: 0.25, efficiency: 36 },
  { time: "08:00", voltage: 0.63, current: 0.46, power: 0.29, efficiency: 39 },
  { time: "10:00", voltage: 0.72, current: 0.52, power: 0.37, efficiency: 43 },
  { time: "12:00", voltage: 0.78, current: 0.58, power: 0.45, efficiency: 48 },
  { time: "14:00", voltage: 0.82, current: 0.62, power: 0.51, efficiency: 52 },
  { time: "16:00", voltage: 0.8, current: 0.6, power: 0.48, efficiency: 50 },
  { time: "18:00", voltage: 0.76, current: 0.56, power: 0.43, efficiency: 47 },
  { time: "20:00", voltage: 0.74, current: 0.54, power: 0.4, efficiency: 45 },
  { time: "22:00", voltage: 0.72, current: 0.52, power: 0.37, efficiency: 43 },
  { time: "24:00", voltage: 0.7, current: 0.5, power: 0.35, efficiency: 42 },
]

export function MFCOutputChart() {
  const currentPower = mfcData[mfcData.length - 1].power
  const previousPower = mfcData[mfcData.length - 2].power
  const powerChange = ((currentPower - previousPower) / previousPower) * 100

  const currentVoltage = mfcData[mfcData.length - 1].voltage
  const currentCurrent = mfcData[mfcData.length - 1].current
  const currentEfficiency = mfcData[mfcData.length - 1].efficiency

  const totalDailyEnergy = mfcData.reduce((sum, item) => sum + item.power, 0) * 2 // Assuming 2 hours between readings

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-medium">MFC Power Output</CardTitle>
            <CardDescription>Real-time power generation (W)</CardDescription>
          </div>
          <Tabs defaultValue="power">
            <TabsList>
              <TabsTrigger value="power">Power</TabsTrigger>
              <TabsTrigger value="voltage">Voltage</TabsTrigger>
              <TabsTrigger value="current">Current</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mfcData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="power" stroke="#f59e0b" strokeWidth={2} dot={false} name="Power (W)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Power Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{currentPower.toFixed(2)}</span>
                <span className="ml-1 text-sm text-muted-foreground">W</span>
              </div>
              <Badge
                className={`flex items-center gap-1 ${powerChange >= 0 ? "bg-green-500" : "bg-red-500"} text-white`}
              >
                {powerChange >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span>{Math.abs(powerChange).toFixed(1)}%</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{totalDailyEnergy.toFixed(2)}</span>
              <span className="ml-1 text-sm text-muted-foreground">kWh/day</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MFC Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="text-xl font-bold">
                    {currentVoltage.toFixed(2)}V / {currentCurrent.toFixed(2)}A
                  </div>
                  <div className="text-xs text-muted-foreground">Voltage/Current</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-xl font-bold">{currentEfficiency}%</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
