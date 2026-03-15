![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![AI](https://img.shields.io/badge/AI-Demand%20Prediction-purple)

# 🌱 ZeroBite

### AI-Driven Hostel Food Wastage Reduction System

ZeroBite is an intelligent food management platform designed to **reduce food wastage in hostel mess systems** using **data analytics, AI-based demand prediction, and NGO redistribution networks**.

The platform connects **students, chefs, NGOs, and administrators** into a unified ecosystem to optimize food preparation and ensure surplus food reaches those in need.

---

# 🚀 Problem Statement

Hostel mess systems often prepare food based on **estimated attendance**, which leads to:

* Significant **food wastage**
* Poor demand forecasting
* Lack of redistribution channels
* Resource inefficiency

ZeroBite solves this by introducing **AI demand prediction and real-time food redistribution**.

---

# 💡 Solution

ZeroBite integrates:

* 📊 **AI demand prediction**
* 🍽 **Meal booking system**
* 🧑‍🍳 **Chef production planning**
* 🏢 **NGO rescue network**
* 🛠 **Super Admin control panel**

This enables **smart food preparation and efficient surplus food distribution**.

---

# 🏗 System Architecture

```
Students → Meal Booking
          ↓
Chef Dashboard → Food Preparation
          ↓
AI Demand Predictor → Production Optimization
          ↓
Surplus Food Detection
          ↓
NGO Network → Food Redistribution
```

---

# 🖥 Platform Dashboards

## 👨‍🎓 Student Dashboard

Students can book meals and help improve demand prediction.

Features:

* Meal booking (breakfast / lunch / dinner)
* Weekly meal schedule
* Booking history
* Waste awareness metrics
* Sustainability participation

---

## 👨‍🍳 Chef Dashboard

Helps kitchen staff optimize food preparation.

Features:

* **AI Demand Predictor**
* Daily production planning
* Stock monitoring
* Waste tracking
* Student meal feedback
* Production analytics

Sections include:

* Kitchen Operations
* Production Planning
* Stock Check
* Waste & Demand Analytics
* Student Feedback

---

## 🤝 NGO Dashboard

Allows NGOs to monitor and collect surplus food.

Features:

* Live food donation alerts
* Smart donation map
* Pickup requests
* Donation analytics
* Food redistribution tracking
* Rescue history

---

## 🛠 Super Admin Dashboard

Central control panel for managing the entire platform.

Modules:

### Console

System-wide overview:

* Total hostels
* Active chefs
* Registered NGOs
* Food donated
* Waste reduction metrics

### Personnel Management

Manage platform users:

* Add Chef
* Add NGO
* Add Hostel Admin
* Enable / disable accounts
* Assign chefs to hostels

### Entities Management

Hostel administration:

* Add new hostels
* Edit hostel capacity
* Assign chefs to hostels

### Week Menu

Centralized weekly menu planning.

### Stock Management

Food inventory monitoring with alerts.

### System Metrics

Platform analytics:

* Waste reduction trends
* Meals served vs wasted
* NGO pickup frequency

### Hatchery (AI Engine)

AI model performance monitoring:

* Demand prediction accuracy
* Model retraining

### System Settings

Platform configuration:

* Waste threshold
* AI prediction settings
* Notification rules

---

# 🧠 AI Demand Prediction

ZeroBite predicts meal demand using:

* Historical consumption
* Student booking patterns
* Hostel occupancy
* Seasonal trends

Benefits:

* Reduce overproduction
* Improve kitchen efficiency
* Lower food waste

---

# 🛠 Tech Stack

### Frontend

* React (Vite)
* TailwindCSS
* Recharts (analytics)
* Leaflet / Maps

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* PostgreSQL
* Neon Database

---

# 🔌 API Structure

Key endpoints:

```
/api/auth/login
/api/auth/register

/api/hostels
/api/admin/users

/api/admin/hostels
/api/admin/assign-chef

/api/meals
/api/bookings

/api/donations
/api/ngos
```

---

# 📊 Key Features

✔ AI-based meal demand prediction
✔ Multi-role system (Student / Chef / NGO / Admin)
✔ Real-time food redistribution
✔ Waste monitoring analytics
✔ NGO pickup coordination
✔ Hostel inventory management

---

# 🌍 Impact

ZeroBite helps:

* Reduce **food wastage**
* Improve **mess efficiency**
* Support **NGO food rescue efforts**
* Promote **sustainable campuses**

---

# 📈 Future Enhancements

* IoT food weight sensors
* Mobile application
* AI model training pipeline
* Predictive supply chain management

---

# 👩‍💻 Author

Drashti Sojitra
B.Tech Computer Science (AI & ML)
Adani University

---

# ⭐ Acknowledgement

This project was developed as part of an academic initiative to explore **AI-driven sustainability solutions in campus food systems**.
