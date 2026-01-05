# HEDAMO – Product Disclosure Listing Interface
*A High-Fidelity Frontend Assignment*

![Status](https://img.shields.io/badge/Status-Completed-success)
![Frontend](https://img.shields.io/badge/Frontend-React_|_Tailwind_|_Vite-blue)
![UI](https://img.shields.io/badge/UI-Institutional_|_Calm_|_Trust--Focused-purple)

---

## 🌐 Live Demo & Submission Links

- **Live Application:**  
  👉 https://product-page-sable-five.vercel.app  

- **Video Walkthrough (Concept + UI Explanation):**  
  🎥 https://www.loom.com/share/79f02dadb9f04cb6b0cf293da0338ed0  

---

## 🧭 Project Context

This project is a frontend implementation of **Hedamo’s Product Listing Interface**, designed as a **disclosure-first system** rather than a verification platform.

The UI emphasizes **clarity, neutrality, and institutional trust**, allowing producers to transparently declare product information while clearly communicating that **Hedamo does not verify, certify, or approve claims**.

The interface reflects how real-world compliance, procurement, or regulatory-facing platforms operate—calm, structured, and intentionally non-judgmental.

---

## ✨ Core Capabilities

### 🗂 Product Dashboard
- Instant product search by name
- Filter by **Category** and **Status**
- Sort by **Last Updated**
- Full-width, responsive layout

### 📑 Product Detail Drawer
- Slide-over panel for focused reading
- Producer-declared information with **clear disclaimer badges**
- **Version History Timeline** visualizing lifecycle transitions  
  *(Draft → Submitted → Published)*


### 💾 Local Persistence
- Browser **Local Storage** used to simulate backend behavior
- All changes persist across page refreshes

---

## 🧠 Design Philosophy

- **Disclosure over Verification**  
  The system records *what is declared*, not *what is proven*.

- **Institutional Calm UI**  
  No aggressive colors, no gamification—only clarity and hierarchy.

- **Trust through Transparency**  
  Disclaimers are visible, intentional, and non-ambiguous.

---

## 🛠 Technology Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:**  
  React `useState`, `useEffect`, `useRef`
- **Persistence:** Browser Local Storage

---

## 🗃 Project Structure

```text
src/
├── components/
│   ├── ProductList.jsx        # Dashboard (Search, Filter, Sort, Table)
│   ├── ProductDetail.jsx      # Slide-over Drawer & Timeline
│   ├── ProductFormModal.jsx   # Add/Edit Product Modal
│   └── StatusBadge.jsx        # Reusable Status Indicator
├── data.js                    # Initial Seed Data
├── App.jsx                    # Root Layout
├── main.jsx                   # App Entry Point
└── index.css                  # Global Styles & Tailwind Config


# Clone the repository
git clone <your-repo-link>

# Install dependencies
npm install

# Start development server
npm run dev

Open your browser and navigate to:
http://localhost:5173
```


---

**Developed by:**  
**Satyam Shrivastava**  
**IIT Patna**

**Role:** Full-Stack Web Developer  
**Tech Stack:** React, Node.js, Express.js, PostgreSQL, Tailwind CSS

📧 **Email:** satyamkum2020@gmail.com   
🌐 **Location:** India

> This project was designed and developed as part of a frontend assignment to demonstrate UI architecture, disclosure-based system thinking, and production-quality frontend implementation.

---
