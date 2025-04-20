"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplet, CloudOff } from "lucide-react"

export function EnvironmentalImpact() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Impact</CardTitle>
        <CardDescription>Pollution reduction and resource recovery metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">OMW Diverted</h3>
              </div>
              <span className="text-sm font-medium">85,000 L</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Olive mill wastewater diverted from open basins this season
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 100,000 L</span>
              <span>85% Complete</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudOff className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">CO₂ Emissions Avoided</h3>
              </div>
              <span className="text-sm font-medium">42 tons</span>
            </div>
            <div className="text-xs text-muted-foreground">Estimated reduction in CO₂ emissions this year</div>
            <Progress value={70} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 60 tons</span>
              <span>70% Complete</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-500" />
                <h3 className="font-medium">Water Recovery Potential</h3>
              </div>
              <span className="text-sm font-medium">28,000 L</span>
            </div>
            <div className="text-xs text-muted-foreground">Treated water available for agricultural reuse</div>
            <Progress value={56} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 50,000 L</span>
              <span>56% Complete</span>
            </div>
          </div>

          <div className="rounded-md bg-muted p-3">
            <h3 className="mb-1 text-sm font-medium">Environmental Impact Summary</h3>
            <p className="text-xs text-muted-foreground">
              Your GazoLive system has prevented the equivalent of 18 cars' annual emissions and recovered enough water
              to irrigate approximately 2.8 hectares of olive groves.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
