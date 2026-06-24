# Prescripto360Care

Prescripto360Care is a full-stack healthcare appointment platform for patients, administrators, and doctors. Patients can discover specialists, book appointments, manage their profile, and complete Razorpay payments. Administrators can manage doctors, appointments, availability, and dashboard metrics. Doctors can review appointments, update their profile, and manage appointment status from a dedicated panel.

## Live Deployment

- Patient app: `https://prescripto-care-360.vercel.app`
- Admin/doctor panel: `https://prescripto-care-360-admin.vercel.app`
- Backend API: `https://prescripto-care-360.onrender.com`

## Project Structure

```text
Prescripto360Care/
+-- frontend/   # Patient-facing React + Vite application
+-- admin/      # Admin and doctor React + Vite dashboard
+-- backend/    # Express API, MongoDB models, auth, uploads, payments
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Patient frontend | React, Vite, Tailwind CSS, Axios, React Router, React Toastify |
| Admin panel | React, Vite, Tailwind CSS, Axios, React Router, Recharts |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Authentication | JSON Web Tokens |
| File uploads | Multer, Cloudinary |
| Payments | Razorpay |
| Deployment | Vercel for frontends, Render for backend |

## Features

### Patient App

- Browse doctors by speciality
- View doctor details and availability
- Register, login, and manage profile
- Book and cancel appointments
- Pay appointment fees through Razorpay
- View appointment history

### Admin Panel

- Secure admin login
- Add doctors with profile image uploads
- View and manage doctors
- Change doctor availability
- View all appointments
- Cancel appointments
- Monitor dashboard statistics

### Doctor Panel

- Secure doctor login
- View assigned appointments
- Mark appointments as completed
- Cancel appointments
- View dashboard summaries
- Update doctor profile and availability details

## Environment Variables

Create environment files locally using the provided examples:

- `backend/.env.example`
- `frontend/.env.example`
- `admin/.env.example`

Never commit real `.env` files. They contain private credentials and are already ignored by Git.

### Backend

`backend/.env`

```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
MONGODB_DB_NAME=prescripto360care
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_strong_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

### Patient Frontend

`frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin Panel

`admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Local Development

Install dependencies in each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

Run the backend:

```bash
cd backend
npm start
```

Run the patient frontend:

```bash
cd frontend
npm run dev
```

Run the admin panel:

```bash
cd admin
npm run dev
```

Default local URLs:

- Backend: `http://localhost:4000`
- Patient app: `http://localhost:5173`
- Admin panel: `http://localhost:5174`

## Available Scripts

### Backend

```bash
npm start
```

Starts the production server with `node server.js`.

```bash
npm run server
```

Starts the development server with `nodemon server.js`.

### Frontend and Admin

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## API Overview

Base URL:

```text
http://localhost:4000
```

Production:

```text
https://prescripto-care-360.onrender.com
```

Primary route groups:

| Prefix | Purpose |
| --- | --- |
| `/api/user` | Patient registration, login, profile, appointments, payments |
| `/api/admin` | Admin login, doctor management, appointments, dashboard |
| `/api/doctor` | Doctor login, appointments, profile, dashboard |

Health check:

```http
GET /
```

Expected response:

```text
Application's API Working!!!
```

## Deployment Guide

### Backend on Render

1. Create a new Render Web Service.
2. Connect the GitHub repository.
3. Set root directory to `backend`.
4. Set build command:

```bash
npm install
```

5. Set start command:

```bash
npm start
```

6. Add all backend environment variables from `backend/.env.example`.
7. Deploy and verify the Render URL returns the health check response.

### Patient App on Vercel

1. Create a new Vercel project from the same repository.
2. Set root directory to `frontend`.
3. Use the Vite preset.
4. Set build command:

```bash
npm run build
```

5. Set output directory:

```text
dist
```

6. Add environment variables:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

7. Deploy.

### Admin Panel on Vercel

1. Create another Vercel project from the same repository.
2. Set root directory to `admin`.
3. Use the Vite preset.
4. Set build command:

```bash
npm run build
```

5. Set output directory:

```text
dist
```

6. Add environment variable:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

7. Deploy.

## Deployment Checklist

- Backend service is live and health check passes.
- MongoDB Atlas connection string is valid.
- Cloudinary credentials are configured.
- Razorpay keys are configured in backend and patient frontend.
- Patient app points to the production backend URL.
- Admin panel points to the production backend URL.
- Admin login works.
- Doctor creation with image upload works.
- New doctors appear in the patient app.
- Appointment booking, cancellation, and payment flows are tested.

## Security Notes

- Do not commit `.env` files or real secrets.
- Rotate any credentials that were exposed publicly or shared in chat.
- Use strong values for `JWT_SECRET` and `ADMIN_PASSWORD`.
- Restrict MongoDB Atlas network access appropriately for production.
- Use production Razorpay keys only when the app is ready for real payments.

## License

This project is provided for educational and portfolio use. Add a formal license before distributing or using it commercially.
