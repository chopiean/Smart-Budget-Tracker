import { Platform } from "react-native";

let db;

if (Platform.OS === "web") {
  db = require("./web").default;
} else {
  db = require("./native").default;
}

export default db;

// Re-export functions so other files can import cleanly
export const {
  addTransaction,
  getTransactions,
  addCategory,
  getCategories,
  initDB,
} = db;
