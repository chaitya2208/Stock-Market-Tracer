# Stock Market Tracer 📈

A full-stack stock market tracking web application with real-time stock updates, user authentication (including Google Sign-In and OTP verification), and a dynamic dashboard displaying stock performance.

## 🔥 Live Demo
[Visit Live App](https://stock-market-tracer.vercel.app) *(if deployed)*

---

## 🧠 Features

### ✅ User Authentication
- **Email + Password Sign Up & Login**
- **OTP Email Verification** for new signups
- **Google Sign-In** via Google Cloud OAuth

### 📊 Stock Market Dashboard
- Real-time stock data fetched from **Alpha Vantage API**
- Track multiple stocks (name, symbol, current price, daily % change)
- Green for gains, Red for losses
- Responsive cards showing:
  - Stock Name & Symbol
  - Live Price
  - High-Low Percentage

### 👤 User Portfolio
- Personalized stock display based on selection (future enhancement: saving preferences)
- Seamless UI transitions between login/signup/dashboard

---

## 🚀 Tech Stack

### 🌐 Frontend
- **React.js**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Google Identity Services SDK** for Google login
- **Framer Motion** for animations

### 🌍 Backend
- **Node.js** with **Express.js**
- **MongoDB** via **Mongoose** for database
- **Nodemailer** for sending OTP emails

### 📦 APIs Used
- **Alpha Vantage API** for real-time stock data

---

## 🔐 Security Features

- OTP-based email verification during signup
- Google Sign-In integration
- Passwords and sensitive data handled securely on backend

---

## 📁 Project Structure (Simplified)
```
client/              → React Frontend
  └── src/
      └── components/
      └── pages/
      └── App.jsx

server/              → Node + Express Backend
  └── models/
  └── routes/
  └── controllers/
  └── config/
```

---

## 🛠️ How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/chaitya2208/Stock-Market-Tracer.git
cd Stock-Market-Tracer
```

### 2. Setup Backend
```bash
cd server
npm install
# Set up your MongoDB URI and email credentials in .env
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm start
```

---

## 🧪 Future Improvements

- Buy/Sell simulation functionality
- Saving portfolios to user profiles
- Android App (in progress using React + Capacitor)

---

## 👤 Author

**Chaitya Shah**  
🚀 130+ LeetCode problems | 🥇 ACPC Gujarat Rank 135 | 🎓 Nirma University Scholar  
🔗 [LinkedIn](https://www.linkedin.com/in/chaitya-shah-658984285/)

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).