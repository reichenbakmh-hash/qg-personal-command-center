import React from "react";
import { EmptyState } from "../../components/qg/Primitives";

/* Vue générique pour les modules pas encore développés (Notes, Renseignements,
   Archives, Ressources, Rapports, Notifications, Settings) — état vide travaillé. */
export default function StubView({ t, icon, title, body, actionLabel }) {
  return <EmptyState t={t} icon={icon} title={title} body={body} actionLabel={actionLabel} />;
}
