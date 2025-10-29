# Minimalist Chat App UI

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)


A modern, minimalist chat application UI built with React, TypeScript, and Vite. This project demonstrates a clean, responsive chat interface with authentication, chat rooms, and message handling, designed for easy integration with backend services like Supabase.


## Tech Stack

- **Frontend Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules, Tailwind CSS (if used)
- **Authentication & Backend:** Supabase
- **Package Manager:** npm or yarn


## Features

- **Authentication**: Login and signup pages with context-based auth management
- **Chat Interface**: Sidebar for chat rooms, chat area, message list, and input
- **Responsive Design**: Mobile-friendly layout and adaptive components
- **Reusable UI Components**: Built with a custom UI library for buttons, dialogs, forms, and more
- **Supabase Integration**: Ready for real-time backend with Supabase (see `src/utils/supabase`)
- **Vite Powered**: Fast development and build with Vite

## Project Structure

```
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   │   ├── auth-layout.tsx
│   │   ├── chat-area.tsx
│   │   ├── chat-header.tsx
│   │   ├── chat-sidebar.tsx
│   │   ├── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ChatContext.tsx
│   ├── database/
│   ├── guidelines/
│   ├── imports/
│   ├── styles/
│   ├── supabase/
│   ├── utils/
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SahilKundu19/LeetCode_Problem.git
cd Minimalist\ Chat\ App\ UI

# Install dependencies
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default.

## Customization
- Update Supabase credentials in `src/utils/supabase/client.ts` to connect to your backend.
- Modify UI components in `src/components/` to fit your branding or feature needs.

## Folder Overview
- `src/components/`: All UI and page components
- `src/contexts/`: React context providers for auth and chat state
- `src/utils/`: Utility functions and Supabase client
- `src/styles/`: Global and component styles
- `src/database/`: Database schema and related files

## License

This project is licensed under the MIT License.

---

**Attributions**: See `src/Attributions.md` for third-party resources and credits.
