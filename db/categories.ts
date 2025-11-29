import { loadItem, saveItem } from "./storage";

const KEY = "categories";

export type Category = {
  id: number;
  name: string;
};

export async function getCategories(): Promise<Category[]> {
  return loadItem<Category[]>(KEY, []);
}

export async function addCategory(name: string): Promise<void> {
  const categories = await getCategories();
  const newCategory = { id: Date.now(), name };

  categories.push(newCategory);
  await saveItem(KEY, categories);
}

export async function deleteCategory(id: number): Promise<void> {
  const categories = await getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  await saveItem(KEY, filtered);
}
