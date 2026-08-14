/* Fonctions utilitaires de couleur/statut QG — utilisées par tous les composants */
export function accentColor(t, accent) {
  return { primary: t.primary, info: t.info, success: t.success, warning: t.warning, danger: t.danger }[accent] || t.primary;
}
export function accentSoft(t, accent) {
  return { primary: t.primarySoft, info: t.infoSoft, success: t.successSoft, warning: t.warningSoft, danger: t.dangerSoft }[accent] || t.primarySoft;
}
export function severityColor(t, sev) {
  if (sev === "Critical") return t.danger;
  if (sev === "High") return t.warning;
  return t.info;
}
export function priorityColor(t, p) {
  if (p === "Critical") return t.danger;
  if (p === "High") return t.warning;
  if (p === "Medium") return t.info;
  return t.textFaint;
}
export function statusColor(t, s) {
  if (["Completed", "Active"].includes(s)) return t.success;
  if (["Blocked", "Failed", "At Risk"].includes(s)) return t.danger;
  if (["In Progress"].includes(s)) return t.info;
  if (["Ready", "Planned", "Paused"].includes(s)) return t.warning;
  return t.textFaint;
}
export function daysUntil(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date("2026-08-14T00:00:00");
  return Math.round((d - now) / 86400000);
}
