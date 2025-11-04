# AI Crypto Journal

An intuitive and powerful user interface for an AI-powered crypto journaling application. Track, analyze, and automate your crypto portfolio with AI-driven insights, detailed portfolio management, and on-chain automation agents.

*(Note: Replace with an actual screenshot of the application)*

---

## ✨ Key Features

This application provides a comprehensive suite of tools for the modern crypto investor, organized into four main sections:

*   **📖 Journal**: A two-pane interface to browse and read a chronological feed of AI-generated insights. The view includes detailed analysis, key data points, and visualizations to support the AI's conclusions.
*   **📊 Portfolio**: A granular and functional overview of all crypto holdings. Features an interactive asset table that can be sorted and expanded to show recent transactions and price charts for individual assets.
*   **🤖 On-Chain Agents**: A powerful dashboard to create, monitor, and manage automated alerts and actions. Agents are displayed as clear, interactive cards, and a full trigger history is available for review.
*   **⚙️ Settings**: A consolidated, tabbed interface for all user management functions, including profile information, billing history, wallet connections, notification preferences, and a gallery for earned NFT badges.

---

## 🛠️ Technology Stack

This project is built with a modern, efficient, and scalable technology stack:

*   **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/akintun-cryptosight-journal.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd akintun-cryptosight-journal
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will now be running on `http://localhost:8080`.

---

## 📂 Project Structure

The codebase is organized to be clean, modular, and easy to navigate.

```
/src
├── components/
│   ├── ui/         # Auto-generated shadcn/ui components
│   └── Layout.tsx  # Main application shell with header and navigation
├── hooks/          # Custom React hooks (e.g., use-mobile)
├── lib/            # Utility functions (e.g., cn for classnames)
├── pages/          # Core views/routes for the application
│   ├── Agents.tsx
│   ├── Journal.tsx
│   ├── Portfolio.tsx
│   └── Settings.tsx
├── App.tsx         # Main component with routing logic
└── main.tsx        # Application entry point
```

---

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Starts the development server with hot-reloading.
*   `npm run build`: Bundles the app for production to the `dist` folder.
*   `npm run lint`: Lints the code to find and fix problems.
*   `npm run preview`: Serves the production build locally to preview it.
