PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS settings (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'system',       
  language TEXT NOT NULL DEFAULT 'fr',
  timezone TEXT NOT NULL DEFAULT 'Indian/Antananarivo',
  week_starts_on TEXT NOT NULL DEFAULT 'monday',
  notifications_enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  objective TEXT,
  status TEXT NOT NULL DEFAULT 'Planned',     
  priority TEXT NOT NULL DEFAULT 'Medium',    
  progress INTEGER NOT NULL DEFAULT 0,        
  color TEXT DEFAULT '#8B5CF6',
  deadline TEXT,
  risk_level TEXT DEFAULT 'Low',              
  is_archived INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_campaigns_user ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

CREATE TABLE IF NOT EXISTS objectives (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE CASCADE,
  parent_objective_id TEXT REFERENCES objectives(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'operational',   
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Planned',
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_objectives_campaign ON objectives(campaign_id);

CREATE TABLE IF NOT EXISTS missions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE CASCADE,
  objective_id TEXT REFERENCES objectives(id) ON DELETE SET NULL,
  code TEXT,                                  
  name TEXT NOT NULL,
  description TEXT,
  context TEXT,
  constraints TEXT,
  priority TEXT NOT NULL DEFAULT 'Medium',    
  difficulty TEXT DEFAULT 'Medium',
  status TEXT NOT NULL DEFAULT 'Planned',    
  deadline TEXT,
  estimated_minutes INTEGER,
  actual_minutes INTEGER,
  depends_on_mission_id TEXT REFERENCES missions(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_missions_campaign ON missions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status);
CREATE INDEX IF NOT EXISTS idx_missions_deadline ON missions(deadline);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_done INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tasks_mission ON tasks(mission_id);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  mission_id TEXT REFERENCES missions(id) ON DELETE SET NULL,
  contact_id TEXT REFERENCES contacts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT,
  priority TEXT DEFAULT 'Medium',
  color TEXT DEFAULT '#8B5CF6',
  recurrence_rule TEXT,                       
  is_completed INTEGER NOT NULL DEFAULT 0,
  reminder_minutes_before INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_events_user_start ON events(user_id, starts_at);


CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  mission_id TEXT REFERENCES missions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content_markdown TEXT,
  is_pinned INTEGER NOT NULL DEFAULT 0,
  is_archived INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id);

CREATE TABLE IF NOT EXISTS intelligence_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  mission_id TEXT REFERENCES missions(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'Fact',      
  title TEXT NOT NULL,
  content TEXT,
  source_reliability TEXT DEFAULT 'Medium',    
  information_confidence TEXT DEFAULT 'Medium',
  status TEXT NOT NULL DEFAULT 'Unprocessed',
  recorded_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_intel_user ON intelligence_records(user_id);

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'Time',         
  name TEXT NOT NULL,
  quantity_required REAL,
  quantity_available REAL,
  unit TEXT,                                   
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_resources_campaign ON resources(campaign_id);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  alias TEXT,
  category TEXT,
  notes TEXT,
  last_interaction_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_contacts_user ON contacts(user_id);

CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  context TEXT,
  problem TEXT NOT NULL,
  options_considered TEXT,                   
  decision_made TEXT NOT NULL,
  justification TEXT,
  expected_outcome TEXT,
  actual_outcome TEXT,
  decided_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_decisions_campaign ON decisions(campaign_id);

CREATE TABLE IF NOT EXISTS risks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE CASCADE,
  mission_id TEXT REFERENCES missions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  probability TEXT DEFAULT 'Medium',           
  impact TEXT DEFAULT 'Medium',               
  level TEXT DEFAULT 'Medium',                
  mitigation TEXT,
  status TEXT NOT NULL DEFAULT 'Open',        
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_risks_campaign ON risks(campaign_id);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,                         
  title TEXT NOT NULL,
  body TEXT,
  related_entity_type TEXT,                     
  related_entity_id TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

CREATE TABLE IF NOT EXISTS activity_log (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,                 
  entity_id TEXT,
  action TEXT NOT NULL,                        
  description TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_activity_user_time ON activity_log(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#8B5CF6',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, name)
);

CREATE TABLE IF NOT EXISTS entity_tags (
  id TEXT PRIMARY KEY,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,                
  entity_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(tag_id, entity_type, entity_id)
);
CREATE INDEX IF NOT EXISTS idx_entity_tags_entity ON entity_tags(entity_type, entity_id);
