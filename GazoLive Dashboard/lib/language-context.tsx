"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "fr"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// English translations
const enTranslations: Record<string, string> = {
  // Dashboard
  "dashboard.title": "Dashboard Overview",
  "dashboard.refresh": "Refresh Data",
  "dashboard.critical": "Critical Alert",
  "dashboard.ph_alert": "pH level in Digester #2 is below threshold (5.2). Immediate attention required.",

  // Tabs
  "tabs.ad": "Anaerobic Digestion",
  "tabs.mfc": "Microbial Fuel Cell",
  "tabs.omw": "OMW Input Monitoring",

  // System Status
  "system.status": "System Status",
  "system.health": "Overall System Health",
  "system.ok": "OK",

  // Biogas Production
  "biogas.title": "Biogas Production",
  "biogas.description": "Real-time biogas flow rate (m³/h)",
  "biogas.current": "Current Flow Rate",
  "biogas.daily": "Daily Production",
  "biogas.metrics": "Digester Metrics",
  "biogas.temperature": "Temperature",
  "biogas.ph": "pH Level",

  // MFC
  "mfc.title": "MFC Power Output",
  "mfc.description": "Real-time power generation (W)",
  "mfc.power": "Power",
  "mfc.voltage": "Voltage",
  "mfc.current": "Current",
  "mfc.output": "Current Power Output",
  "mfc.daily": "Daily Energy",
  "mfc.metrics": "MFC Metrics",
  "mfc.volt_current": "Voltage/Current",
  "mfc.efficiency": "Efficiency",

  // OMW
  "omw.title": "OMW Input Volume",
  "omw.description": "Daily olive mill wastewater intake (liters)",
  "omw.volume": "Volume",
  "omw.quality": "Quality",
  "omw.today": "Today's Volume",
  "omw.quality_title": "OMW Quality",
  "omw.turbidity": "Turbidity",
  "omw.conductivity": "Conductivity",
  "omw.solid": "Solid Content",
  "omw.source": "Source Distribution",

  // System Health
  "health.title": "System Health Overview",
  "health.description": "Status of process units and maintenance alerts",
  "health.units": "Process Units Status",
  "health.maintenance": "Maintenance Alerts",

  // AI Recommendations
  "ai.title": "AI Recommendations",
  "ai.description": "AI-powered insights and predictions",
  "ai.forecast": "Biogas Production Forecast",
  "ai.predicted": "Predicted output for next 24h:",
  "ai.above": "above current rate",

  // Historical Trends
  "trends.title": "Historical Data & Trends",
  "trends.description": "Energy production and efficiency over time",
  "trends.biogas": "Biogas",
  "trends.electricity": "Electricity",
  "trends.efficiency": "Efficiency",
  "trends.monthly": "Monthly Average:",
  "trends.growth": "Growth Rate:",

  // Environmental Impact
  "env.title": "Environmental Impact",
  "env.description": "Pollution reduction and resource recovery metrics",
  "env.diverted": "OMW Diverted",
  "env.diverted_desc": "Olive mill wastewater diverted from open basins this season",
  "env.co2": "CO₂ Emissions Avoided",
  "env.co2_desc": "Estimated reduction in CO₂ emissions this year",
  "env.water": "Water Recovery Potential",
  "env.water_desc": "Treated water available for agricultural reuse",
  "env.summary": "Environmental Impact Summary",
  "env.summary_desc":
    "Your GazoLive system has prevented the equivalent of 18 cars' annual emissions and recovered enough water to irrigate approximately 2.8 hectares of olive groves.",

  // Alerts & Logs
  "alerts.title": "User Alerts & Logs",
  "alerts.description": "Recent system alerts and user actions",
  "alerts.filter": "Filter",
  "alerts.alerts": "Alerts",
  "alerts.actions": "Actions",
  "alerts.critical": "Critical",
  "alerts.warning": "Warning",
  "alerts.info": "Info",
  "alerts.resolved": "Resolved",
  "alerts.unresolved": "Unresolved",

  // Navigation
  "nav.dashboard": "Dashboard",
  "nav.analytics": "Analytics",
  "nav.digesters": "Digesters",
  "nav.mfc_units": "MFC Units",
  "nav.omw_sources": "OMW Sources",
  "nav.environmental": "Environmental Impact",
  "nav.alerts": "Alerts",
  "nav.reports": "Reports",
  "nav.settings": "Settings",

  // Header
  "header.notifications": "Notifications",
  "header.profile": "Profile",
  "header.settings": "Settings",
  "header.logout": "Log out",
  "header.account": "My Account",

  // Footer
  "footer.copyright": "© 2025 GazoLive",
  "footer.version": "v1.0.0",

  // Language
  "language.switch": "Language",
  "language.en": "English",
  "language.fr": "French",

  // Pages
  "page.analytics.title": "Analytics Dashboard",
  "page.analytics.description": "Comprehensive data analysis and insights",
  "page.digesters.title": "Digesters Management",
  "page.digesters.description": "Monitor and control anaerobic digesters",
  "page.mfc.title": "MFC Units Dashboard",
  "page.mfc.description": "Microbial fuel cell monitoring and control",
  "page.omw.title": "OMW Sources",
  "page.omw.description": "Olive mill wastewater source management",
  "page.environmental.title": "Environmental Impact",
  "page.environmental.description": "Environmental benefits and sustainability metrics",
  "page.alerts.title": "Alerts Center",
  "page.alerts.description": "System alerts and notifications",
  "page.reports.title": "Reports",
  "page.reports.description": "Generate and view system reports",
  "page.settings.title": "System Settings",
  "page.settings.description": "Configure system parameters and preferences",

  // Common
  "common.target": "Target:",
  "common.complete": "Complete",
}

// French translations
const frTranslations: Record<string, string> = {
  // Dashboard
  "dashboard.title": "Aperçu du Tableau de Bord",
  "dashboard.refresh": "Actualiser les Données",
  "dashboard.critical": "Alerte Critique",
  "dashboard.ph_alert":
    "Le niveau de pH dans le Digesteur #2 est inférieur au seuil (5,2). Attention immédiate requise.",

  // Tabs
  "tabs.ad": "Digestion Anaérobie",
  "tabs.mfc": "Pile à Combustible Microbienne",
  "tabs.omw": "Surveillance des Intrants OMW",

  // System Status
  "system.status": "État du Système",
  "system.health": "Santé Globale du Système",
  "system.ok": "OK",

  // Biogas Production
  "biogas.title": "Production de Biogaz",
  "biogas.description": "Débit de biogaz en temps réel (m³/h)",
  "biogas.current": "Débit Actuel",
  "biogas.daily": "Production Journalière",
  "biogas.metrics": "Métriques du Digesteur",
  "biogas.temperature": "Température",
  "biogas.ph": "Niveau de pH",

  // MFC
  "mfc.title": "Puissance de Sortie MFC",
  "mfc.description": "Production d'énergie en temps réel (W)",
  "mfc.power": "Puissance",
  "mfc.voltage": "Tension",
  "mfc.current": "Courant",
  "mfc.output": "Puissance Actuelle",
  "mfc.daily": "Énergie Journalière",
  "mfc.metrics": "Métriques MFC",
  "mfc.volt_current": "Tension/Courant",
  "mfc.efficiency": "Efficacité",

  // OMW
  "omw.title": "Volume d'Entrée OMW",
  "omw.description": "Apport quotidien d'eaux usées d'huilerie d'olive (litres)",
  "omw.volume": "Volume",
  "omw.quality": "Qualité",
  "omw.today": "Volume Aujourd'hui",
  "omw.quality_title": "Qualité OMW",
  "omw.turbidity": "Turbidité",
  "omw.conductivity": "Conductivité",
  "omw.solid": "Teneur en Solides",
  "omw.source": "Distribution des Sources",

  // System Health
  "health.title": "Aperçu de la Santé du Système",
  "health.description": "État des unités de traitement et alertes de maintenance",
  "health.units": "État des Unités de Traitement",
  "health.maintenance": "Alertes de Maintenance",

  // AI Recommendations
  "ai.title": "Recommandations IA",
  "ai.description": "Insights et prédictions alimentés par l'IA",
  "ai.forecast": "Prévision de Production de Biogaz",
  "ai.predicted": "Production prévue pour les prochaines 24h:",
  "ai.above": "au-dessus du taux actuel",

  // Historical Trends
  "trends.title": "Données Historiques & Tendances",
  "trends.description": "Production d'énergie et efficacité au fil du temps",
  "trends.biogas": "Biogaz",
  "trends.electricity": "Électricité",
  "trends.efficiency": "Efficacité",
  "trends.monthly": "Moyenne Mensuelle:",
  "trends.growth": "Taux de Croissance:",

  // Environmental Impact
  "env.title": "Impact Environnemental",
  "env.description": "Métriques de réduction de pollution et de récupération des ressources",
  "env.diverted": "OMW Détourné",
  "env.diverted_desc": "Eaux usées d'huilerie d'olive détournées des bassins ouverts cette saison",
  "env.co2": "Émissions de CO₂ Évitées",
  "env.co2_desc": "Réduction estimée des émissions de CO₂ cette année",
  "env.water": "Potentiel de Récupération d'Eau",
  "env.water_desc": "Eau traitée disponible pour réutilisation agricole",
  "env.summary": "Résumé de l'Impact Environnemental",
  "env.summary_desc":
    "Votre système GazoLive a évité l'équivalent des émissions annuelles de 18 voitures et récupéré suffisamment d'eau pour irriguer environ 2,8 hectares d'oliveraies.",

  // Alerts & Logs
  "alerts.title": "Alertes & Journaux Utilisateur",
  "alerts.description": "Alertes système récentes et actions utilisateur",
  "alerts.filter": "Filtrer",
  "alerts.alerts": "Alertes",
  "alerts.actions": "Actions",
  "alerts.critical": "Critique",
  "alerts.warning": "Avertissement",
  "alerts.info": "Info",
  "alerts.resolved": "Résolu",
  "alerts.unresolved": "Non Résolu",

  // Navigation
  "nav.dashboard": "Tableau de Bord",
  "nav.analytics": "Analytiques",
  "nav.digesters": "Digesteurs",
  "nav.mfc_units": "Unités MFC",
  "nav.omw_sources": "Sources OMW",
  "nav.environmental": "Impact Environnemental",
  "nav.alerts": "Alertes",
  "nav.reports": "Rapports",
  "nav.settings": "Paramètres",

  // Header
  "header.notifications": "Notifications",
  "header.profile": "Profil",
  "header.settings": "Paramètres",
  "header.logout": "Déconnexion",
  "header.account": "Mon Compte",

  // Footer
  "footer.copyright": "© 2025 GazoLive",
  "footer.version": "v1.0.0",

  // Language
  "language.switch": "Langue",
  "language.en": "Anglais",
  "language.fr": "Français",

  // Pages
  "page.analytics.title": "Tableau de Bord Analytique",
  "page.analytics.description": "Analyse de données complète et insights",
  "page.digesters.title": "Gestion des Digesteurs",
  "page.digesters.description": "Surveillance et contrôle des digesteurs anaérobies",
  "page.mfc.title": "Tableau de Bord des Unités MFC",
  "page.mfc.description": "Surveillance et contrôle des piles à combustible microbiennes",
  "page.omw.title": "Sources OMW",
  "page.omw.description": "Gestion des sources d'eaux usées d'huilerie d'olive",
  "page.environmental.title": "Impact Environnemental",
  "page.environmental.description": "Bénéfices environnementaux et métriques de durabilité",
  "page.alerts.title": "Centre d'Alertes",
  "page.alerts.description": "Alertes système et notifications",
  "page.reports.title": "Rapports",
  "page.reports.description": "Générer et consulter les rapports système",
  "page.settings.title": "Paramètres Système",
  "page.settings.description": "Configurer les paramètres et préférences du système",

  // Common
  "common.target": "Objectif:",
  "common.complete": "Complété",
}

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  fr: frTranslations,
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to get the language from localStorage, default to English
  const [language, setLanguageState] = useState<Language>("en")

  // Initialize language from localStorage when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
