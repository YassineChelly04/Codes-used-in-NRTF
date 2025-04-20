"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export function AnalyticsPage() {
  const { t } = useLanguage()

  // Sample data for analytics
  const monthlyData = [
    { month: "Jan", biogas: 32000, electricity: 4800, efficiency: 78 },
    { month: "Feb", biogas: 34000, electricity: 5100, efficiency: 80 },
    { month: "Mar", biogas: 36000, electricity: 5400, efficiency: 82 },
    { month: "Apr", biogas: 38000, electricity: 5700, efficiency: 83 },
    { month: "May", biogas: 40000, electricity: 6000, efficiency: 85 },
    { month: "Jun", biogas: 42000, electricity: 6300, efficiency: 86 },
    { month: "Jul", biogas: 44000, electricity: 6600, efficiency: 87 },
    { month: "Aug", biogas: 45000, electricity: 6750, efficiency: 88 },
    { month: "Sep", biogas: 43000, electricity: 6450, efficiency: 86 },
    { month: "Oct", biogas: 41000, electricity: 6150, efficiency: 85 },
    { month: "Nov", biogas: 39000, electricity: 5850, efficiency: 84 },
    { month: "Dec", biogas: 37000, electricity: 5550, efficiency: 82 },
  ]

  const sourceData = [
    { name: "Mill A", value: 35 },
    { name: "Mill B", value: 25 },
    { name: "Mill C", value: 20 },
    { name: "Mill D", value: 15 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.analytics.title")}</h1>
        </div>

        <p className="text-muted-foreground">{t("page.analytics.description")}</p>

        <Tabs defaultValue="production" className="space-y-4">
          <TabsList>
            <TabsTrigger value="production">{t("trends.biogas")}</TabsTrigger>
            <TabsTrigger value="electricity">{t("trends.electricity")}</TabsTrigger>
            <TabsTrigger value="efficiency">{t("trends.efficiency")}</TabsTrigger>
            <TabsTrigger value="sources">{t("omw.source")}</TabsTrigger>
          </TabsList>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("biogas.title")} - {t("trends.title")}
                </CardTitle>
                <CardDescription>{t("biogas.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="biogas" fill="#10b981" name="Biogas (m³)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="electricity">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("trends.electricity")} - {t("trends.title")}
                </CardTitle>
                <CardDescription>{t("mfc.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="electricity"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          name="Electricity (kWh)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("trends.efficiency")} - {t("trends.title")}
                </CardTitle>
                <CardDescription>{t("mfc.efficiency")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 90]} />
                        <Tooltip content={<ChartTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="efficiency"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Efficiency (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>{t("omw.source")}</CardTitle>
                <CardDescription>{t("omw.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={140}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
