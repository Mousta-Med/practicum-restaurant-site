-- Olive & Ember: our own tables.
-- The user, session, account and verification tables are created by Better Auth.
-- Safe to run more than once: IF NOT EXISTS skips tables that are already there.

-- One row per dish on the menu
CREATE TABLE IF NOT EXISTS menu_items (
  id          SERIAL PRIMARY KEY,                    -- unique number, assigned automatically (1, 2, 3...)
  name        TEXT NOT NULL UNIQUE,                  -- e.g. 'Charred halloumi'; no two dishes share a name
  category    TEXT NOT NULL
              CHECK (category IN ('Starters', 'Mains', 'Desserts')),
  description TEXT NOT NULL,                         -- e.g. 'Pomegranate, wildflower honey, fresh mint'
  price       NUMERIC(6, 2) NOT NULL CHECK (price >= 0),  -- exact money amount, e.g. 11.00
  image_url   TEXT NOT NULL,                         -- path to the photo, e.g. '/img/menu/halloumi.jpg'
  image_alt   TEXT NOT NULL,                         -- photo description for screen readers
  sort_order  INTEGER NOT NULL DEFAULT 0,            -- position on the menu (lowest first)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()     -- when the row was added
);
