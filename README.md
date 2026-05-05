# Smart Personal Budget Tracker

Smart Personal Budget Tracker is a mobile application designed to help users manage their finances effectively. It allows users to track income, expenses, and spending categories, visualize financial data through charts, and set monthly budget limits. Built with React Native and Expo, the app ensures a seamless cross-platform experience for both Android and iOS.

---

## 🛠️ Technologies Used

- **React Native** – Core framework for building the mobile app.
- **Expo** – Fast development, testing with Expo Go, and access to native APIs.
- **Expo Router** – File-based navigation with tabs and stack screens.
- **TypeScript** – Improves code quality, maintainability, and error detection.
- **SQLite / expo-sqlite** – Local database for storing transactions, categories, and settings.
- **Custom Hooks** – Reusable hooks such as `useTransactions` and `useBudget`.
- **React Native Components & Styling** – Built with reusable components and a dark neon-themed UI.
- **Expo Vector Icons** – Icons for tabs, buttons, and UI elements.
- **Charts** – Pie and bar charts for financial visualization.
- **Gesture Handler** – Smooth mobile interactions.

---

## 📂 Project Structure

```bash
smart-personal-budget-tracker/
├── app/
│   ├── dashboard.tsx
│   ├── add-transaction.tsx
│   ├── reports.tsx
│   ├── categories.tsx
│   └── settings.tsx
├── components/
│   ├── GlassCard.tsx
│   ├── GlassButton.tsx
│   └── ExpenseCard.tsx
├── hooks/
│   ├── useTransactions.ts
│   └── useBudget.ts
├── db/
│   ├── database.ts
│   ├── queries.ts
│   └── reports.ts
├── assets/
├── package.json
└── README.md
```

## 🚀 Features

- **Dashboard**: View total balance, income, expenses, and budget usage.
- **Add Transactions**: Add income or expenses with categories and descriptions.
- **Reports**: Visualize spending trends and category totals with charts.
- **Categories**: Track spending by category.
- **Scan Receipts**: Use OCR to extract totals from receipts.
- **Settings**: Customize currency, set budget limits, and enable daily reminders.
- **Offline Support**: All data is stored locally using SQLite.

---

## 🧩 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/smart-personal-budget-tracker.git
   cd smart-personal-budget-tracker

   ```

2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm start`
