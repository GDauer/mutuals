<div align="center">
  <img src="public/logo.png" alt="Mutuals Logo" width="200" />

  # Mutuals
  
  **Discover who doesn't follow you back on Instagram.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

<br />

## 📋 Table of Contents

- [About](#-about)
- [Demo](#-demo)
- [Features](#-features)
- [How to Use](#-how-to-use)
- [Installation](#-installation)
- [Technologies](#-technologies)

---

## 🚀 About

**Mutuals** is a modern and secure Single Page Application (SPA) that allows Instagram users to easily identify accounts they follow but that do not follow them back.

Unlike other applications, Mutuals focuses on **privacy and security**: all data processing is done **locally** in the user's browser. There is no login via Instagram API, and no data is sent to external servers.

---

## 🎥 Demo

<div align="center">
  <img src="public/demo.gif" alt="Mutuals Demo" width="100%" />
</div>

---

## ✨ Features

- **Local Processing**: Data analysis performed entirely in the browser.
- **Data Upload**: Support for uploading official Instagram JSON files (`following.json` and `followers_1.json`).
- **Non-Followers List**: Clear visualization of who doesn't follow you back.
- **Interactive Cards**: Direct links to Instagram profiles.
- **List Management**: Mark users as removed ("Delete") locally to organize your cleanup.
- **Modern Interface**: Responsive design with fluid animations, dark mode, and mouse visual effects.
- **Total Privacy**: Your data never leaves your device.

---

## 📖 How to Use

1. **Export your Instagram data**:
   - Go to "Your activity" > "Download your information".
   - Select "Download or transfer information".
   - Choose "Some of your information" and select "Followers and following".
   - Choose "Download to device".
   - **Important**: Select **JSON** format.

2. **Upload**:
   - In Mutuals, click "Connect with Instagram".
   - Drag and drop the `following.json` and `followers_1.json` files (or the ZIP containing them).

3. **Manage**:
   - See the list of users who don't follow you back.
   - Click on cards to open the profile and unfollow manually on Instagram.
   - Click "Delete" in the app to remove the user from the visual list.

---

## 💻 Installation

To run the project locally, follow the steps below:

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Step by Step

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mutuals.git
cd mutuals
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Access the project**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🛠 Technologies

The project was built using the following technologies:

- **[Next.js 14](https://nextjs.org/)**: React framework for production.
- **[React](https://reactjs.org/)**: Library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript superset with static typing.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[Framer Motion](https://www.framer.com/motion/)**: Animation library for React.
- **[Lucide React](https://lucide.dev/)**: Icon library.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/GDauer">GDauer</a>
</div>
