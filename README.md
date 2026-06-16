<div align="center">
  <h1>🍽️ Recipe Finder</h1>
  <p><strong>A sleek, high-performance recipe discovery application built with React 19 and Tailwind CSS v4.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-4.2-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TheMealDB-API-FFCA28?style=for-the-badge&logo=json" alt="TheMealDB" />
  </p>
</div>

---

## 🌟 Overview

**Recipe Finder** is a modern, responsive web application designed to help users discover their next favorite meal. Powered by **TheMealDB API**, it allows users to search thousands of recipes by ingredient, browse by country of origin, filter by dietary preferences (e.g., Vegetarian), or explore alphabetically. 

Featuring a premium dark-mode aesthetic with elegant gold accents, the app provides a seamless user experience with instant search results and local storage for saving favorite recipes.

## ✨ Key Features

- **🔍 Comprehensive Search**: Search for meals by keyword, main ingredient, or browse alphabetically.
- **🌍 Global Cuisine Filter**: Instantly filter recipes by their country of origin.
- **🥦 Dietary Filters**: One-click toggle to show exclusively vegetarian options.
- **🎲 Random Meal Generator**: Let the app surprise you with a random recipe suggestion.
- **❤️ Local Favorites**: Save recipes to your personal favorites list using persistent browser `localStorage`.
- **📱 Responsive UI**: A fully responsive grid layout that looks perfect on mobile, tablet, and desktop displays.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React.js (v19) |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS (v4) |
| **Routing** | React Router DOM |
| **Data Source** | TheMealDB REST API |
| **State Management** | React Hooks (`useState`, `useEffect`) & LocalStorage |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### 1. Clone the Repository
```bash
git clone https://github.com/Arrowpac/Recipe-Finder.git
cd Recipe-Finder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
```

## 📂 Project Structure

```text
src/
├── assets/          # Static images and icons
├── components/      # Reusable UI components
│   ├── Navbar.jsx      # Global navigation
│   ├── RecipeCard.jsx  # Individual recipe display
│   ├── RecipeGrid.jsx  # Grid layout for search results
│   └── SearchBar.jsx   # Input logic for queries
├── pages/           # Application routes
│   ├── Home.jsx        # Main discovery interface
│   └── Favorites.jsx   # Saved recipes view
├── App.jsx          # Root component & Routing setup
└── main.jsx         # Application entry point
```

## 🎨 UI/UX Design

The application implements a custom dark theme (`#0f0f0f` base background) with refined gold highlight accents (`#e8c547`). It avoids heavy libraries, relying on streamlined Tailwind CSS v4 utilities to deliver fluid hover states and transition animations.

---
<div align="center">
  <p>Built by <a href="https://github.com/Arrowpac">Arrowpac</a></p>
</div>
