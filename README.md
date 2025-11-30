**🛠️ Technologies Used**
**React Native**

- The core framework used to build the mobile application. React Native enables cross-platform development for both Android and iOS using JavaScript and TypeScript.

**Expo**
Used as the main development environment and toolchain, providing
- Fast development workflow with Expo Go
- Access to native APIs without writing native code
- Over-the-air updates
- Easy testing across devices

**Expo Router**

A file-based navigation system that organizes screens automatically.
It supports:
- Nested routes
- Stack navigation
- Tab navigation
- Clean folder-based structure with minimal configuration

**TypeScript**

Added static typing to improve:
- Code quality
- IntelliSense support
- Error detection
- Maintainability

**SQLite (expo-sqlite)**

A local database used for storing:
- Expenses
- Income
- Categories
- Monthly summaries
SQLite ensures offline-first performance, fast reads, and persistent local storage.

**Custom Hooks**

Implemented reusable hooks such as:
- useTransactions
- useBudget
These manage data loading, refreshing, and screen updates in a clean and modular way.

**React Native Components & Styling**

UI built using:
- StyleSheet API
- Custom reusable components (GlassCard, GlassButton, ExpenseCard)
- A consistent dark theme with neon green accents
- Modern and minimalistic layout

**Expo Vector Icons**

Provides the icons used in:
- Bottom tab bar
- Action buttons
- UI elements
Ensures a clean, polished, and consistent visual style.

**Charts (Pie & Bar Charts)**

Used to visualize:
- Spending by category
- Monthly expense trends
- Adds clarity and insight into the user’s financial data.

**Gesture Handler**
Enhanced user experience with smoother interactions using
react-native-gesture-handler.
