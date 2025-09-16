# React Machine Coding Challenges

## ToDo App

A simple, accessible ToDo application built with React. This app demonstrates state management using `useReducer`, accessibility best practices, and clean component structure.

---

## Addon: HolyGrailLayout

The **HolyGrailLayout** is a classic responsive web layout pattern with a header, footer, and three columns (left sidebar, main content, right sidebar). This addon demonstrates advanced layout techniques using modern CSS (Flexbox/Grid) and React component composition.

### HolyGrailLayout Features

- Responsive header, footer, and three-column layout
- Customizable sidebar and main content areas
- Fully accessible with semantic HTML and ARIA roles
- Easily reusable as a layout wrapper for any React content

---

## Addon: Accordion

The **Accordion** component allows users to expand and collapse sections of related content. It is accessible, supports keyboard navigation, and can be configured for single or multiple open panels.

### Accordion Features

- Expand/collapse content panels
- Supports single or multiple panels open at once
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for accessibility

---

## Addon: Tabs

The **Tabs** component provides a way to organize content into separate views where only one view is visible at a time. It is scalable, accessible, and supports keyboard navigation.

### Tabs Features

- Switch between multiple tabbed views
- Keyboard navigation (arrow keys)
- Fully accessible with ARIA roles and attributes
- Flexible and scalable for dynamic tab content

---

### Features (ToDo App)

- Add, edit, and mark todos as completed
- Bulk actions: clear all, mark all as completed
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for improved accessibility

---

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Accessibility

- All interactive elements are keyboard accessible.
- Proper use of ARIA roles and labels.
- Semantic HTML for lists, forms, and layout regions.
- HolyGrailLayout uses `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` for best practices.
- Accordion and Tabs components use appropriate ARIA attributes and keyboard navigation.

---

### Folder Structure

```
React-Interview-Prep-303/
├── src/
│   ├── ToDo/
│   │   ├── index.tsx
│   │   └── index.css
│   ├── HolyGrailLayout/
│   │   ├── HolyGrailLayout.tsx
│   │   └── HolyGrailLayout.css
│   ├── Accordion/
│   │   ├── index.tsx
│   │   └── index.css
│   ├── Tabs/
│   │   ├── index.tsx
│   │   └── index.css
│   └── ...
├── README.md
└── package.json
```

---

### License

This project is for educational purposes.
