/* Structure de navigation QG (sidebar + bottom nav + titres de page) */
import {
  Radar, Swords, CalendarDays, Flag, Target, StickyNote, BookOpenText,
  Archive, Users, Boxes, LineChart, FileText, Bell, Settings, Menu,
} from "lucide-react";

export const NAV = [
  { section: "COMMAND", items: [
    { id: "situation", label: "Situation", icon: Radar },
    { id: "warroom", label: "War Room", icon: Swords },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "campaigns", label: "Campagnes", icon: Flag },
    { id: "missions", label: "Missions", icon: Target },
  ]},
  { section: "INTELLIGENCE", items: [
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "intel", label: "Renseignements", icon: BookOpenText },
    { id: "archives", label: "Archives", icon: Archive },
  ]},
  { section: "RESOURCES", items: [
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "resources", label: "Ressources", icon: Boxes },
  ]},
  { section: "ANALYSIS", items: [
    { id: "analytics", label: "Analytics", icon: LineChart },
    { id: "reports", label: "Rapports", icon: FileText },
  ]},
  { section: "SYSTEM", items: [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]},
];

export const MOBILE_NAV = [
  { id: "situation", label: "Situation", icon: Radar },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "missions", label: "Missions", icon: Target },
  { id: "campaigns", label: "Campagnes", icon: Flag },
  { id: "more", label: "Plus", icon: Menu },
];

export const TITLES = {
  situation: ["Command", "Situation"],
  warroom: ["Command", "War Room"],
  agenda: ["Command", "Agenda"],
  campaigns: ["Command", "Campagnes"],
  missions: ["Command", "Missions"],
  notes: ["Intelligence", "Notes"],
  intel: ["Intelligence", "Renseignements"],
  archives: ["Intelligence", "Archives"],
  contacts: ["Resources", "Contacts"],
  resources: ["Resources", "Ressources"],
  analytics: ["Analysis", "Analytics"],
  reports: ["Analysis", "Rapports"],
  notifications: ["System", "Notifications"],
  settings: ["System", "Settings"],
};
