"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplet, MapPin, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function OMWSourcesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const omwSources = [
    {
      id: 1,
      name: "Mill A",
      location: "Sfax, Tunisia",
      distance: 12.5,
      volume: 850,
      quality: "High",
      lastDelivery: "2025-04-18",
      turbidity: 320,
      conductivity: 1800,
      solidContent: 4.2,
    },
    {
      id: 2,
      name: "Mill B",
      location: "Sousse, Tunisia",
      distance: 28.3,
      volume: 620,
      quality: "Medium",
      lastDelivery: "2025-04-15",
      turbidity: 350,
      conductivity: 1950,
      solidContent: 4.7,
    },
    {
      id: 3,
      name: "Mill C",
      location: "Monastir, Tunisia",
      distance: 35.7,
      volume: 480,
      quality: "High",
      lastDelivery: "2025-04-12",
      turbidity: 310,
      conductivity: 1750,
      solidContent: 4.0,
    },
    {
      id: 4,
      name: "Mill D",
      location: "Mahdia, Tunisia",
      distance: 42.1,
      volume: 350,
      quality: "Medium",
      lastDelivery: "2025-04-10",
      turbidity: 330,
      conductivity: 1850,
      solidContent: 4.3,
    },
  ]

  const handleSourceClick = (sourceId: number) => {
    toast({
      title: `OMW Source #${sourceId}`,
      description: "Source details opened",
    })
  }

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "High":
        return <Badge className="bg-green-500 text-white">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "Low":
        return <Badge className="bg-red-500 text-white">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.omw.title")}</h1>
        </div>

        <p className="text-muted-foreground">{t("page.omw.description")}</p>

        <Card>
          <CardHeader>
            <CardTitle>{t("omw.source")}</CardTitle>
            <CardDescription>Olive mill wastewater sources and quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Volume (L)</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Last Delivery</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {omwSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {source.location}
                      </div>
                    </TableCell>
                    <TableCell>{source.volume}</TableCell>
                    <TableCell>{getQualityBadge(source.quality)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {source.lastDelivery}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleSourceClick(source.id)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("omw.quality_title")}</CardTitle>
              <CardDescription>Quality metrics for incoming OMW</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {omwSources.map((source) => (
                  <div key={source.id} className="rounded-md border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      {getQualityBadge(source.quality)}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">{t("omw.turbidity")}</div>
                        <div className="font-medium">{source.turbidity} NTU</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">{t("omw.conductivity")}</div>
                        <div className="font-medium">{source.conductivity} µS/cm</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">{t("omw.solid")}</div>
                        <div className="font-medium">{source.solidContent}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Source Locations</CardTitle>
              <CardDescription>Geographic distribution of OMW sources</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2">Interactive map would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
