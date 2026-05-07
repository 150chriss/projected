# CRPMS API Testing Guide

Base URL: `http://localhost:5000`

---

## Prerequisites
1. XAMPP running (MySQL green)
2. Database imported from `database/crpms.sql`
3. Backend running: `npm run dev` inside `/backend`

---

## 1. AUTH ROUTES (No token needed)

### Register
- Method: POST
- URL: `http://localhost:5000/auth/register`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- Expected: `201` → `{ "message": "User registered successfully" }`

---

### Login
- Method: POST
- URL: `http://localhost:5000/auth/login`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- Expected: `200` → `{ "token": "eyJ...", "username": "admin", "userId": 1 }`
- **Copy the token — paste it in all requests below**

---

## 2. HOW TO ADD TOKEN IN POSTMAN

In every request below:
- Go to **Authorization** tab
- Type: **Bearer Token**
- Token: paste your token here

---

## 3. CAR ROUTES

### Add Car
- Method: POST
- URL: `http://localhost:5000/cars`
- Body:
```json
{
  "plateNumber": "RAB 123A",
  "type": "Sedan",
  "model": "Toyota Corolla",
  "manufacturingYear": 2020,
  "driverPhone": "0781234567",
  "mechanicName": "John Doe"
}
```
- Expected: `201` → `{ "message": "Car added successfully" }`

---

### Get All Cars
- Method: GET
- URL: `http://localhost:5000/cars`
- Expected: `200` → array of cars

---

## 4. SERVICE ROUTES

### Add Service
- Method: POST
- URL: `http://localhost:5000/services`
- Body:
```json
{
  "serviceName": "Oil Change",
  "servicePrice": 25.00
}
```
- Expected: `201` → `{ "message": "Service added successfully" }`

---

### Get All Services
- Method: GET
- URL: `http://localhost:5000/services`
- Expected: `200` → array of services

---

## 5. SERVICE RECORD ROUTES (Full CRUD)

### Create Record
- Method: POST
- URL: `http://localhost:5000/records`
- Body:
```json
{
  "serviceDate": "2026-04-15",
  "plateNumber": "RAB 123A",
  "serviceCode": 1
}
```
- Expected: `201` → `{ "message": "Record created", "recordNumber": 1 }`

---

### Get All Records
- Method: GET
- URL: `http://localhost:5000/records`
- Expected: `200` → array of records with joined car and service info

---

### Update Record
- Method: PUT
- URL: `http://localhost:5000/records/1`
- Body:
```json
{
  "serviceDate": "2026-04-16",
  "plateNumber": "RAB 123A",
  "serviceCode": 1
}
```
- Expected: `200` → `{ "message": "Record updated" }`

---

### Delete Record
- Method: DELETE
- URL: `http://localhost:5000/records/1`
- Expected: `200` → `{ "message": "Record deleted" }`

---

## 6. PAYMENT ROUTES

### Record Payment
- Method: POST
- URL: `http://localhost:5000/payments`
- Body:
```json
{
  "amountPaid": 25.00,
  "paymentDate": "2026-04-15",
  "recordNumber": 1
}
```
- Expected: `201` → `{ "message": "Payment recorded" }`

---

### Get All Payments
- Method: GET
- URL: `http://localhost:5000/payments`
- Expected: `200` → array of payments with joined details

---

## 7. REPORT ROUTES

### Get Invoice
- Method: GET
- URL: `http://localhost:5000/reports/invoice/1`
- Expected: `200` → full invoice object
```json
{
  "paymentNumber": 1,
  "amountPaid": "25.00",
  "paymentDate": "2026-04-15",
  "plateNumber": "RAB 123A",
  "model": "Toyota Corolla",
  "serviceName": "Oil Change",
  "receivedBy": "admin"
}
```

---

### Get Daily Report
- Method: GET
- URL: `http://localhost:5000/reports/daily?date=2026-04-15`
- Expected: `200`
```json
{
  "date": "2026-04-15",
  "report": [
    {
      "plateNumber": "RAB 123A",
      "model": "Toyota Corolla",
      "mechanicName": "John Doe",
      "services": [
        {
          "serviceName": "Oil Change",
          "servicePrice": "25.00",
          "amountPaid": "25.00"
        }
      ],
      "total": 25
    }
  ]
}
```

---

## 8. ERROR CASES TO TEST

| Scenario | Expected |
|----------|----------|
| Login with wrong password | `401` Invalid credentials |
| Register same username twice | `409` Username already exists |
| Request without token | `401` No token provided |
| Request with expired/fake token | `403` Invalid or expired token |
| Add car with duplicate plate | `409` Plate number already exists |
| Get invoice with wrong ID | `404` Invoice not found |

---

## 9. QUICK ROUTE SUMMARY

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /auth/register | No | Register user |
| POST | /auth/login | No | Login, get token |
| POST | /cars | Yes | Add car |
| GET | /cars | Yes | Get all cars |
| POST | /services | Yes | Add service |
| GET | /services | Yes | Get all services |
| POST | /records | Yes | Create service record |
| GET | /records | Yes | Get all records |
| PUT | /records/:id | Yes | Update record |
| DELETE | /records/:id | Yes | Delete record |
| POST | /payments | Yes | Record payment |
| GET | /payments | Yes | Get all payments |
| GET | /reports/invoice/:id | Yes | Get invoice |
| GET | /reports/daily?date= | Yes | Get daily report |
