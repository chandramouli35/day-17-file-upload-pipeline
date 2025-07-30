# Day 17 – Secure File Upload Pipeline with Preview, Validation & API Integration

This project is part of my 150-day developer preparation streak, focused on building feature-grade systems that scale across real-world products. On Day 17, I engineered a robust file upload flow — not just UI fluff, but a validated upload pipeline with full API sync and live preview.

## ✅ What I Practiced:
- Controlled file input using `type="file"`  
- Preview logic for images and PDFs  
- File size restriction (max 2MB per file)  
- Max file count restriction (limit: 3 files)  
- Axios POST using `FormData` to backend mock/API  
- Upload states: loading, success, error  
- Optional drag-and-drop area with hover feedback

## 🧠 Key Concepts Covered:
- Multi-file state management in React (array of objects)  
- Dynamic preview rendering via FileReader or URL.createObjectURL  
- FormData setup with multiple attachments  
- Toast notifications for API feedback  
- UX clarity during upload and validation stage  
- Input type safety and MIME filtering

## 🛠 Features:
- Upload .jpg, .png, or .pdf files  
- Instant preview thumbnails or icons based on file type  
- Validation: reject files over 2MB or beyond the limit  
- API POST request with multipart/form-data payload  
- Upload feedback: spinner → toast → clear/reset option  
- Optional: Drag-and-drop zone for style upgrades  
- Optional: Dark mode toggle for upload interface

## ⚙️ Tech Stack:
- React.js (Hooks: useState, useEffect)  
- Axios for API requests  
- Tailwind CSS for layout and styling  
- JavaScript validation logic  
- Optional: React Dropzone or drag handler

## 🔥 Why This Matters:
File uploads power the backbone of portals — resumes in hiring apps, documents in KYC flows, thumbnails in e-commerce tools. This build mimics a **full product-grade upload system**, with user feedback, security, and real-time preview logic that matters in production.

> Day 17 complete. Upload experience engineered — from input validation to API handshake. No filler. All product.
