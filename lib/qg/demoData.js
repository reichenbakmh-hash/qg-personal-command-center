/* Données de démonstration QG — à remplacer par les appels API (D1) au LOT suivant */
import { Flag, Target, CheckCircle2, Gauge, Clock, AlertTriangle } from "lucide-react";

export const CAMPAIGNS = [
  {
    id: "CMP-01",
    name: "Master Finance",
    objective: "Valider le Master 1 avant fin d'année académique.",
    status: "At Risk",
    priority: "Critical",
    progress: 78,
    deadline: "2026-09-05",
    missions: { total: 9, done: 6 },
    risk: "High",
    color: "#8B5CF6",
  },
  {
    id: "CMP-02",
    name: "QG — Refonte Produit",
    objective: "Livrer la V1 fonctionnelle du centre de commandement personnel.",
    status: "Active",
    priority: "High",
    progress: 41,
    deadline: "2026-10-20",
    missions: { total: 14, done: 6 },
    risk: "Medium",
    color: "#3B82F6",
  },
  {
    id: "CMP-03",
    name: "Japanese Language — N4",
    objective: "Atteindre un niveau N4 conversationnel et lecture.",
    status: "Active",
    priority: "Medium",
    progress: 63,
    deadline: "2027-01-15",
    missions: { total: 20, done: 13 },
    risk: "Low",
    color: "#10B981",
  },
  {
    id: "CMP-04",
    name: "Fondations Physiques",
    objective: "Reconstruire une base d'endurance et de force.",
    status: "Paused",
    priority: "Low",
    progress: 22,
    deadline: "2026-12-01",
    missions: { total: 8, done: 2 },
    risk: "Low",
    color: "#F59E0B",
  },
];

export const MISSIONS = [
  { id: "042", name: "Prepare Finance Exam", campaign: "Master Finance", priority: "High", status: "In Progress", deadline: "2026-08-18", est: "03h30", actual: "02h15" },
  { id: "043", name: "Réviser Chapitre 4 — Marchés dérivés", campaign: "Master Finance", priority: "Critical", status: "Blocked", deadline: "2026-08-15", est: "02h00", actual: "00h40" },
  { id: "044", name: "Soutenance orale — plan de dissertation", campaign: "Master Finance", priority: "Critical", status: "Planned", deadline: "2026-08-16", est: "01h30", actual: "—" },
  { id: "118", name: "Concevoir le schéma de données QG", campaign: "QG — Refonte Produit", priority: "High", status: "Completed", deadline: "2026-08-10", est: "04h00", actual: "03h20" },
  { id: "119", name: "Implémenter le moteur de scoring V2", campaign: "QG — Refonte Produit", priority: "High", status: "In Progress", deadline: "2026-08-22", est: "06h00", actual: "02h10" },
  { id: "120", name: "Corriger bug page blanche (auth Cloudflare)", campaign: "QG — Refonte Produit", priority: "Critical", status: "Ready", deadline: "2026-08-15", est: "01h00", actual: "—" },
  { id: "077", name: "Vocabulaire — Leçon 21 à 24", campaign: "Japanese Language — N4", priority: "Medium", status: "In Progress", deadline: "2026-08-19", est: "01h15", actual: "00h30" },
  { id: "078", name: "Session d'écoute — podcast N4", campaign: "Japanese Language — N4", priority: "Low", status: "Planned", deadline: "2026-08-21", est: "00h45", actual: "—" },
];

export const ALERTS = [
  {
    id: "a1",
    severity: "Critical",
    title: "Trois échéances simultanées",
    body: "La campagne « Master Finance » a trois missions dont l'échéance tombe entre le 15 et le 18 août.",
    impact: "Risque de surcharge et d'échec en cascade sur l'examen.",
    recommendation: "Reporter la mission #044 de 24h ou déléguer la révision du chapitre 4.",
    tag: "Collision",
  },
  {
    id: "a2",
    severity: "High",
    title: "Charge disponible insuffisante",
    body: "Le temps d'étude disponible cette semaine (11h) est inférieur au besoin estimé (16h).",
    impact: "5h de déficit — au moins une mission sera repoussée.",
    recommendation: "Libérer un créneau supplémentaire ou réduire le périmètre de la mission #043.",
    tag: "Resource",
  },
  {
    id: "a3",
    severity: "Medium",
    title: "Opportunité stratégique",
    body: "Terminer la mission #118 débloque deux missions dépendantes dans « QG — Refonte Produit ».",
    impact: "Accélère la campagne de +12% de progression estimée.",
    recommendation: "Prioriser #118 avant la fin de semaine.",
    tag: "Opportunity",
  },
];

export const CONTACTS = [
  { id: "c1", name: "Rina Andriamanjato", alias: "Directrice de mémoire", category: "Académique", last: "il y a 2 jours" },
  { id: "c2", name: "Tojo Rakoto", alias: "Binôme projet QG", category: "Projet", last: "hier" },
  { id: "c3", name: "Sensei Miyamoto", alias: "Professeur de japonais", category: "Formation", last: "il y a 5 jours" },
];

/* Le numéro WhatsApp est centralisé ici : ne pas le répéter ailleurs dans le code */
export const WHATSAPP_NUMBER = "261383089721";
export const QUICK_LINKS = [
  { id: "x", label: "X", href: "https://x.com/AzhellZettour" },
  { id: "discord", label: "Discord", href: "https://discord.gg/ZRnfkBnR/" },
  { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
];

export const KPIS = [
  { label: "Active Campaigns", value: "3", delta: "+1", trend: "up", icon: Flag, accent: "primary" },
  { label: "Open Missions", value: "12", delta: "+3", trend: "up", icon: Target, accent: "info" },
  { label: "Execution Rate", value: "81%", delta: "+4%", trend: "up", icon: CheckCircle2, accent: "success" },
  { label: "Current Load", value: "73%", delta: "+9%", trend: "up", icon: Gauge, accent: "warning" },
  { label: "Upcoming Deadlines", value: "5", delta: "0", trend: "flat", icon: Clock, accent: "info" },
  { label: "Critical Items", value: "2", delta: "+2", trend: "up", icon: AlertTriangle, accent: "danger" },
];

export const ACTIVITY = [
  { id: 1, text: "Mission #118 marquée Completed", time: "il y a 1h" },
  { id: 2, text: "Campagne « Master Finance » évaluée à risque élevé", time: "il y a 3h" },
  { id: 3, text: "Nouveau risque ajouté sur « QG — Refonte Produit »", time: "il y a 5h" },
  { id: 4, text: "Événement « Révision Finance » reprogrammé", time: "hier" },
  { id: 5, text: "Note liée à la campagne « Japanese Language — N4 »", time: "hier" },
];

export const AGENDA_DAYS = ["Lun 17", "Mar 18", "Mer 19", "Jeu 20", "Ven 21", "Sam 22", "Dim 23"];
export const AGENDA_EVENTS = {
  "Lun 17": [{ time: "09:00", title: "Révision Finance — Ch.4", tag: "Master Finance", color: "#8B5CF6" }],
  "Mar 18": [{ time: "14:00", title: "Examen blanc Finance", tag: "Master Finance", color: "#EF4444" }],
  "Mer 19": [{ time: "10:00", title: "Point projet QG", tag: "QG — Refonte", color: "#3B82F6" }],
  "Jeu 20": [{ time: "18:30", title: "Session japonais — écoute", tag: "Japanese N4", color: "#10B981" }],
  "Ven 21": [],
  "Sam 22": [{ time: "09:30", title: "Sport — endurance", tag: "Fondations physiques", color: "#F59E0B" }],
  "Dim 23": [],
};
