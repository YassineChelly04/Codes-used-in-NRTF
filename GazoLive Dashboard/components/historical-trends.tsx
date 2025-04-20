"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data
const monthlyData = [
  { month: "Jan", biogas: 32000, electricity: 4800, efficiency: 78 },
  { month: "Feb", biogas: 34000, electricity: 5100, efficiency: 80 },
  { month: "Mar", biogas: 36000, electricity: 5400, efficiency: 82 },
  { month: "Apr", biogas: 38000, electricity: 5700, efficiency: 83 },
  { month: "May", biogas: 40000, electricity: 6000, efficiency: 85 },
  { month: "Jun", biogas: 42000, electricity: 6300, efficiency: 86 },
]

export function HistoricalTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Historical Data & Trends</CardTitle>
        <CardDescription>Energy production and efficiency over time</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <Tabs defaultValue="biogas">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="biogas">Biogas</TabsTrigger>
            <TabsTrigger value="electricity">Electricity</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="biogas" className="space-y-4">
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="biogas" fill="#10b981" name="Biogas (m³)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm">
                <span className="font-medium">Monthly Average:</span> 37,000 m³
              </p>
              <p className="text-sm">
                <span className="font-medium">Growth Rate:</span> +5.6% per month
              </p>
            </div>
          </TabsContent>

          <TabsContent value="electricity" className="space-y-4">
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="electricity"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={true}
                      name="Electricity (kWh)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm">
                <span className="font-medium">Monthly Average:</span> 5,550 kWh
              </p>
              <p className="text-sm">
                <span className="font-medium">Growth Rate:</span> +5.6% per month
              </p>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={true}
                      name="Efficiency (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm">
                <span className="font-medium">Current Efficiency:</span> 86%
              </p>
              <p className="text-sm">
                <span className="font-medium">Improvement:</span> +8% in 6 months
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
