📈 Stock Market Tracer
Stock Market Tracer is a full-stack stock market analysis and portfolio tracking application. It allows users to track real-time stock data, manage their investments, and access stock insights using a dynamic web dashboard and a browser extension. It also includes OTP-based email verification and Sign in with Google for secure and smooth authentication.

🔗 GitHub Repository

🌟 Features
🔐 Secure User Authentication

Email & Password Sign-up/Login with OTP verification

Google Sign-In with OAuth 2.0

📊 Real-time Stock Data

Fetches live data for multiple stock symbols using the Alpha Vantage API

Displays current price, percentage change, highs/lows, and trends

📁 Portfolio Management

Personalized dashboard with tracked stock symbols

Dynamic display of real-time stock updates

💡 Browser Extension

A lightweight extension to view stock information directly in the browser

🗂️ Project Structure
graphql
Copy
Edit
Stock-Market-Tracer/
├── frontEnd/           # React app for frontend (user dashboard, login/signup)
├── backEnd/            # Node.js + Express + MongoDB backend with API & auth
├── browserExtension/   # Chrome Extension for quick stock lookup
├── docs/               # Documentation and assets
🛠️ Technologies Used
Frontend (React)
React.js

Axios

Tailwind CSS

Google Identity Services SDK

React Router

Context API

Backend (Node.js)
Express.js

MongoDB with Mongoose

dotenv

nodemailer (for OTP email)

Google OAuth 2.0 (for Google Sign-In)

APIs
Alpha Vantage API (Stock data)

Other Tools
Git & GitHub for version control

Chrome Extension (Manifest V3)

Postman (for API testing)

🧪 Key Functionalities
🔐 Authentication
Signup with Email & Password

Generates a 6-digit OTP and sends via email using NodeMailer

User can only log in after successful OTP verification

Login with Email & Password

Validates credentials with the MongoDB database

Google Sign-In

Integrated via Google Identity Services (OAuth 2.0)

Secure token-based authentication

Automatically registers user on first sign-in

📈 Stock Dashboard
Fetches real-time stock data from Alpha Vantage API

Displays:

Stock name and symbol

Current price

Percentage gain/loss (green/red indicators)

Automatically maps and displays data for all supported stock symbols

🧩 Browser Extension
Injects a floating React widget on click

Displays:

Stock price

% high/low

Additional insights (extendable)

🚀 Getting Started
1️⃣ Clone the Repo
bash
Copy
Edit
git clone https://github.com/chaitya2208/Stock-Market-Tracer.git
cd Stock-Market-Tracer
2️⃣ Backend Setup
bash
Copy
Edit
cd backEnd
npm install
Create a .env file with:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
ALPHA_VANTAGE_API_KEY=your_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
bash
Copy
Edit
npm start
Runs on: http://localhost:5000

3️⃣ Frontend Setup
bash
Copy
Edit
cd ../frontEnd
npm install
npm start
Runs on: http://localhost:3000

4️⃣ Browser Extension
To install:

Go to chrome://extensions

Enable "Developer Mode"

Click "Load Unpacked"

Select the browserExtension/ folder

📧 Email OTP Flow
User signs up with email and password

Server generates a 6-digit OTP

Email sent using NodeMailer

User must enter OTP to complete verification

Upon success, account is activated

🔐 Google Sign-In Flow
User clicks "Sign in with Google"

Google OAuth 2.0 handles authentication

Token is verified server-side

If user doesn’t exist, they’re registered

User is redirected to dashboard

🤝 Contributing
Feel free to fork the repository and contribute!

bash
Copy
Edit
git checkout -b feature/myFeature
git commit -m "Added myFeature"
git push origin feature/myFeature
Then create a pull request. Let’s build together!

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.