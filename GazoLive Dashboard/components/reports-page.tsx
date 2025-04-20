"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, Filter, Printer, BarChart3, PieChart, LineChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const reports = [
    {
      id: 1,
      name: "Monthly Performance Report",
      type: "Performance",
      date: "2025-04-01",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: 2,
      name: "Biogas Production Analysis",
      type: "Analysis",
      date: "2025-04-05",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      id: 3,
      name: "Environmental Impact Assessment",
      type: "Environmental",
      date: "2025-04-10",
      size: "3.2 MB",
      format: "PDF",
    },
    {
      id: 4,
      name: "System Maintenance Log",
      type: "Maintenance",
      date: "2025-04-15",
      size: "1.1 MB",
      format: "PDF",
    },
    {
      id: 5,
      name: "Energy Efficiency Report",
      type: "Performance",
      date: "2025-04-20",
      size: "2.7 MB",
      format: "PDF",
    },
  ]

  const reportTemplates = [
    {
      id: 1,
      name: "Daily Performance Summary",
      description: "Daily overview of system performance metrics",
      icon: BarChart3,
    },
    {
      id: 2,
      name: "Monthly Environmental Impact",
      description: "Monthly assessment of environmental benefits",
      icon: PieChart,
    },
    {
      id: 3,
      name: "Quarterly Efficiency Analysis",
      description: "Detailed analysis of system efficiency over time",
      icon: LineChart,
    },
  ]

  const handleDownload = (reportId: number) => {
    toast({
      title: "Report Downloaded",
      description: `Report #${reportId} has been downloaded`,
    })
  }

  const handleGenerateReport = (templateId: number) => {
    toast({
      title: "Generating Report",
      description: `Report template #${templateId} is being generated`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("page.reports.title")}</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Reports
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground">{t("page.reports.description")}</p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Available Reports</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="analysis">Analysis</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Generated reports available for download</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleDownload(report.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Generate new reports from templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="rounded-md border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <template.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">{template.name}</h3>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{template.description}</p>
                    <Button size="sm" className="w-full" onClick={() => handleGenerateReport(template.id)}>
                      Generate Report
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
