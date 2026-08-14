import React, { useState } from "react";
import { StickyNote, BookOpenText, Archive, Boxes, FileText, Bell, Settings } from "lucide-react";

import { themes, FONT_STACK } from "../lib/qg/theme";
import { TITLES } from "../lib/qg/nav";

import Sidebar from "../components/qg/Sidebar";
import Header from "../components/qg/Header";
import BottomNav from "../components/qg/BottomNav";
import SearchModal from "../components/qg/SearchModal";

import SituationView from "../features/situation/SituationView";
import WarRoomView from "../features/warroom/WarRoomView";
import AgendaView from "../features/agenda/AgendaView";
import CampaignsView from "../features/campaigns/CampaignsView";
import MissionsView from "../features/missions/MissionsView";
import ContactsView from "../features/contacts/ContactsView";
import AnalyticsView from "../features/analytics/AnalyticsView";
import StubView from "../features/shared/StubView";

export default function QGApp() {
  const [isDark, setIsDark] = useState(true);
  const [view, setView] = useState("situation");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const renderView = () => {
    switch (view) {
      case "situation": return <SituationView t={t} setView={setView} />;
      case "warroom": return <WarRoomView t={t} />;
      case "agenda": return <AgendaView t={t} />;
      case "campaigns": return <CampaignsView t={t} />;
      case "missions": return <MissionsView t={t} />;
      case "contacts": return <ContactsView t={t} />;
      case "analytics": return <AnalyticsView t={t} />;
      case "notes": return <StubView t={t} icon={StickyNote} title="Aucune note" body="Capturez vos idées, checklists et références. Elles pourront être liées à vos campagnes, missions et contacts." actionLabel="Nouvelle note" />;
      case "intel": return <StubView t={t} icon={BookOpenText} title="Aucun renseignement" body="Centralisez sources, observations et hypothèses avec un indicateur de fiabilité et de confiance." actionLabel="Ajouter un renseignement" />;
      case "archives": return <StubView t={t} icon={Archive} title="Archives vides" body="Les missions, campagnes et rapports terminés apparaîtront ici pour consultation ultérieure." actionLabel="Voir les critères d'archivage" />;
      case "resources": return <StubView t={t} icon={Boxes} title="Aucune ressource déclarée" body="Déclarez le temps, budget, équipement et compétences nécessaires à vos campagnes pour détecter les déficits." actionLabel="Ajouter une ressource" />;
      case "reports": return <StubView t={t} icon={FileText} title="Aucun rapport généré" body="Générez un brief quotidien, une revue hebdomadaire ou un rapport de campagne exportable." actionLabel="Générer un rapport" />;
      case "notifications": return <StubView t={t} icon={Bell} title="Aucune alerte en attente" body="Les échéances, risques, conflits et ressources critiques apparaîtront ici en temps réel." actionLabel="Configurer les alertes" />;
      case "settings": return <StubView t={t} icon={Settings} title="Réglages" body="Profil, apparence, notifications, calendrier et gestion des données seront configurables ici." actionLabel="Ouvrir les réglages" />;
      default: return <SituationView t={t} setView={setView} />;
    }
  };

  const [group, label] = TITLES[view] || ["QG", "Situation"];

  return (
    <div style={{ fontFamily: FONT_STACK, height: "100vh", width: "100%", background: t.bg, color: t.text, display: "flex", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${t.borderStrong}; border-radius: 8px; }
        button { font-family: inherit; }
        .qg-mobile-only, .qg-mobile-only-flex { display: none; }
        .qg-desktop-only { display: block; }
        .qg-desktop-only-flex { display: flex; }
        @media (max-width: 860px) {
          .qg-mobile-only { display: block !important; }
          .qg-mobile-only-flex { display: flex !important; }
          .qg-desktop-only { display: none !important; }
          .qg-desktop-only-flex { display: none !important; }
          .qg-grid-stack { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Sidebar t={t} view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isDark={isDark} setIsDark={setIsDark} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        <Header t={t} title={label} breadcrumb={`QG / ${group}`} setMobileOpen={setMobileOpen} setSearchOpen={setSearchOpen} isDark={isDark} setIsDark={setIsDark} />
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", paddingBottom: 84 }}>
          {renderView()}
        </div>
      </div>

      <BottomNav t={t} view={view} setView={setView} setMobileOpen={setMobileOpen} />
      {searchOpen && <SearchModal t={t} onClose={() => setSearchOpen(false)} setView={setView} />}
    </div>
  );
}
