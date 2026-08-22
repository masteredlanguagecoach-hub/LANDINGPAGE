# Mastered Language Coach — Speaking Challenge Landing Page & Payment System

Production-ready, high-converting, mobile-first landing page, email-verified enrollment system, secure Razorpay Standard Checkout payment engine, Google Sheets student database, and transactional HTML email dispatcher for **Mastered Language Coach: Speaking Challenge**.

**Brand:** Mastered Language Coach  
**Tagline:** Speak With Confidence  

---

## Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Crimson `#E50914` palette matching official logo)
- **Payment Gateway**: Razorpay Standard Checkout (HMAC SHA-256 server verification + Webhook)
- **Database**: Google Sheets API (`googleapis` with Service Account auth)
- **Email Service**: Transactional HTML Email Engine (Nodemailer / SMTP)
- **Email Verification**: Instant server-side MX record & deliverability check (`dns.resolveMx`)

---

## 1. Local Setup Guide

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your actual environment values:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET_KEY
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET

GOOGLE_PROJECT_ID=mastered-language-coach
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here

EMAIL_FROM="Mastered Language Coach" <support@masteredlanguagecoach.com>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@masteredlanguagecoach.com
SMTP_PASS=your_smtp_app_password

PRACTICE_WEBAPP_URL=https://practice.masteredlanguagecoach.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

COURSE_MALAYALAM_ENGLISH_PRICE=499
COURSE_HINDI_ENGLISH_PRICE=499
```

### Step 3: Google Sheets Setup
1. Create a new Google Sheet named **Mastered Language Coach Enrollments**.
2. Create two tab worksheets inside the sheet:
   - `PAID_STUDENTS`
   - `PAYMENT_LOGS`
3. Share the Google Sheet with your Service Account email (`GOOGLE_CLIENT_EMAIL`) with **Editor** permissions.
4. Copy the Sheet ID from the URL (`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`) into `GOOGLE_SHEET_ID`.

---

## 2. Running Locally

Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Test Cases Verification Matrix (15 Scenarios)

| # | Test Scenario | Action | Expected Result |
|---|---|---|---|
| 1 | **Invalid Name** | Leave name blank or enter 1 character. | Button disabled / field error: *"Please enter your full name."* |
| 2 | **Invalid Email** | Enter `invalid-email-format`. | Click "Verify Email" shows: *"Invalid email format."* |
| 3 | **Unverified Email** | Fill all fields but skip clicking "Verify Email". | Payment button remains disabled with warning notice. |
| 4 | **Fake / Non-Existent Email Domain** | Enter `student@domaindoesnotexist999.com`. | Server MX check fails; email marked unverified. |
| 5 | **Real Email Address** | Enter valid active email address (e.g. `yourname@gmail.com`) and click "Verify Email". | Server checks MX records and displays `✓ Email Verified`. |
| 6 | **Invalid WhatsApp Number** | Enter fewer than 10 digits (e.g. `1234`). | Field error: *"Enter a valid 10-digit WhatsApp number."* |
| 7 | **No Course Selected** | Try submitting without selecting a course. | Prevented; default course selected automatically. |
| 8 | **Razorpay Cancelled** | Open Razorpay modal and close it via 'X'. | Modal closes cleanly; returns to form with notice. No sheet entry created. |
| 9 | **Razorpay Payment Failed** | Use Razorpay failure test card. | Payment failed message shown; no row written in `PAID_STUDENTS`. |
| 10 | **Tampered Payment Response** | Send fake signature payload to `/api/payment/verify`. | Server HMAC SHA-256 check fails; returns HTTP 400 error; no student enrolled. |
| 11 | **Successful Verified Payment** | Complete test payment on Razorpay modal. | Server verifies HMAC SHA-256 signature; appends row to `PAID_STUDENTS` & `PAYMENT_LOGS`; dispatches HTML email; displays Success Page. |
| 12 | **Price Manipulation Attack** | Modify client payload amount to `₹1`. | Server ignores client price and uses authoritative server price (`COURSE_MALAYALAM_ENGLISH_PRICE`). |
| 13 | **Duplicate Callback Sent** | Resend payment verification callback with same Payment ID. | System checks Payment ID in sheet; skips duplicate insertion idempotently. |
| 14 | **Webhook Retry** | Deliver identical Razorpay webhook event multiple times. | Handled idempotently; no duplicate rows created. |
| 15 | **Email Service Interruption** | Simulate SMTP outage during verified payment. | Student remains enrolled in `PAID_STUDENTS` with `Email Delivery Status = FAILED`. Resend button enabled for single-click retry. |

---

## 4. Vercel Deployment Checklist

1. Push code repository to GitHub/GitLab.
2. Import project into Vercel dashboard.
3. Configure all Environment Variables in Vercel project settings.
4. Set up Razorpay Webhook endpoint in Razorpay Dashboard:
   - Webhook URL: `https://your-domain.vercel.app/api/razorpay/webhook`
   - Events: `payment.captured`, `order.paid`
   - Secret: Matches `RAZORPAY_WEBHOOK_SECRET`
5. Test live transaction in Razorpay Test Mode first, then replace with Live credentials.
