"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplet, CloudOff, TreePine, Sprout } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export function EnvironmentalImpactPage() {
  const { t } = useLanguage()

  const monthlyData = [
    { month: "Jan", omwDiverted: 6500, co2Avoided: 3.2, waterRecovered: 2100 },
    { month: "Feb", omwDiverted: 7200, co2Avoided: 3.5, waterRecovered: 2300 },
    { month: "Mar", omwDiverted: 8100, co2Avoided: 4.0, waterRecovered: 2600 },
    { month: "Apr", omwDiverted: 9000, co2Avoided: 4.4, waterRecovered: 2900 },
    { month: "May", omwDiverted: 9800, co2Avoided: 4.8, waterRecovered: 3200 },
    { month: "Jun", omwDiverted: 10500, co2Avoided: 5.2, waterRecovered: 3400 },
    { month: "Jul", omwDiverted: 11200, co2Avoided: 5.5, waterRecovered: 3600 },
    { month: "Aug", omwDiverted: 12000, co2Avoided: 5.9, waterRecovered: 3900 },
    { month: "Sep", omwDiverted: 12800, co2Avoided: 6.3, waterRecovered: 4100 },
    { month: "Oct", omwDiverted: 13500, co2Avoided: 6.7, waterRecovered: 4400 },
    { month: "Nov", omwDiverted: 14200, co2Avoided: 7.0, waterRecovered: 4600 },
    { month: "Dec", omwDiverted: 15000, co2Avoided: 7.4, waterRecovered: 4800 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.environmental.title")}</h1>
        </div>

        <p className="text-muted-foreground">{t("page.environmental.description")}</p>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                <CardTitle>{t("env.diverted")}</CardTitle>
              </div>
              <CardDescription>{t("env.diverted_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">85,000 L</div>
              <div className="space-y-2">
                <Progress value={85} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("common.target")}: 100,000 L</span>
                  <span>85% {t("common.complete")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CloudOff className="h-5 w-5 text-green-500" />
                <CardTitle>{t("env.co2")}</CardTitle>
              </div>
              <CardDescription>{t("env.co2_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">42 tons</div>
              <div className="space-y-2">
                <Progress value={70} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("common.target")}: 60 tons</span>
                  <span>70% {t("common.complete")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-500" />
                <CardTitle>{t("env.water")}</CardTitle>
              </div>
              <CardDescription>{t("env.water_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">28,000 L</div>
              <div className="space-y-2">
                <Progress value={56} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("common.target")}: 50,000 L</span>
                  <span>56% {t("common.complete")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>OMW Diverted & Water Recovered</CardTitle>
              <CardDescription>Monthly progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar yAxisId="left" dataKey="omwDiverted" fill="#3b82f6" name="OMW Diverted (L)" />
                      <Bar yAxisId="right" dataKey="waterRecovered" fill="#10b981" name="Water Recovered (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CO₂ Emissions Avoided</CardTitle>
              <CardDescription>Monthly progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="co2Avoided"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="CO₂ Avoided (tons)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("env.summary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <TreePine className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium">Environmental Benefits</h3>
                  <p className="text-muted-foreground">{t("env.summary_desc")}</p>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <CloudOff className="h-5 w-5 text-green-500" />
                        <span className="font-medium">18</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Cars' annual emissions equivalent</p>
                    </div>
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-green-500" />
                        <span className="font-medium">2.8</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Hectares of olive groves irrigated</p>
                    </div>
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-500" />
                        <span className="font-medium">85%</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Reduction in environmental pollution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
