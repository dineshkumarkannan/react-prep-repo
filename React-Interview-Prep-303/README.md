# React Machine Coding Challenges

A collection of accessible, scalable React components and layout patterns, designed for interviews and real-world projects.

---

## ToDo App

A simple, accessible ToDo application built with React. Demonstrates state management using `useReducer`, accessibility best practices, and clean component structure.

### Features

- Add, edit, and mark todos as completed
- Bulk actions: clear all, mark all as completed
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for improved accessibility

---

## Addons

### HolyGrailLayout

A classic responsive web layout pattern with a header, footer, and three columns (left sidebar, main content, right sidebar). Demonstrates advanced layout techniques using modern CSS (Flexbox/Grid) and React component composition.

**Features:**

- Responsive header, footer, and three-column layout
- Customizable sidebar and main content areas
- Fully accessible with semantic HTML and ARIA roles
- Easily reusable as a layout wrapper for any React content

---

### Accordion

Allows users to expand and collapse sections of related content. Accessible, supports keyboard navigation, and can be configured for single or multiple open panels.

**Features:**

- Expand/collapse content panels
- Supports single or multiple panels open at once
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for accessibility

---

### Tabs

Organizes content into separate views where only one view is visible at a time. Scalable, accessible, and supports keyboard navigation.

**Features:**

- Switch between multiple tabbed views
- Keyboard navigation (arrow keys)
- Fully accessible with ARIA roles and attributes
- Flexible and scalable for dynamic tab content

---

### Carousel

Displays a set of images in a sliding, scrollable view. Supports keyboard navigation, is responsive, and can show multiple images per slide.

**Features:**

- Slide through images with next/prev buttons
- Configurable images per slide
- Responsive and touch-friendly
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for accessibility

---

### Pagination

Divides large sets of data into pages, allowing users to navigate between them efficiently.

**Features:**

- Navigate through data pages with next/prev and page numbers
- Keyboard and screen reader accessible
- Semantic HTML and ARIA attributes for accessibility
- Handles dynamic data and edge cases gracefully

---

### Accessibility

- All interactive elements are keyboard accessible.
- Proper use of ARIA roles and labels.
- Semantic HTML for lists, forms, and layout regions.
- HolyGrailLayout uses `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` for best practices.
- Accordion, Tabs, Carousel, and Pagination components use appropriate ARIA attributes and keyboard navigation.

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
│   ├── Carousel/
│   │   ├── index.tsx
│   │   └── index.css
│   ├── Pagination/
│   │   ├── index.tsx
│   │   └── index.css
│   └── ...
├── README.md
└── package.json
```

---

### License

This project is for educational purposes and open for learning and improvement.
