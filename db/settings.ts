import { loadItem, saveItem } from "./storage";

const KEY = "settings";

export type Settings = {
  currency: string;
  daily_reminder: boolean;
  budget_limit: number;
};

// Get settings (or default)
export async function getSettings(): Promise<Settings> {
  return loadItem<Settings>(KEY, {
    currency: "€",
    daily_reminder: false,
    budget_limit: 0,
  });
}

// Save settings
export async function saveSettings(settings: Settings): Promise<void> {
  await saveItem(KEY, settings);
}
