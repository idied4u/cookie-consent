# 🍪 cookie-consent

- A minimalist, ethical cookie consent component for React + TypeScript.  
- No tracking, no third-party scripts — just a clean banner and real user choice.

---

## Features

- Built with React + TypeScript
- One-file component: easy to copy into any project
- Stores consent in `localStorage`
- Customizable message, button text, and callbacks
- Includes `useCookieConsent()` hook
- No external dependencies

---

## 🔧 How to Use

### 1. Copy `CookieConsent.tsx` into your `src/` folder

You can rename or place it wherever you want inside your React project.

---

### 2. Import and render the component

```tsx
import CookieConsent from './CookieConsent'; // adjust path as needed

function App() {
  return (
    <div>
      <CookieConsent />
      {/* ...rest of your app */}
    </div>
  );
}
