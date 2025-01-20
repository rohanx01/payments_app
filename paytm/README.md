

# **Payments App**

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing user accounts, enabling secure authentication, and performing basic banking-like operations. This project demonstrates my skills in building scalable and secure web applications with modern frameworks and tools.

---

## **Features**

- **Authentication**: User signup and signin with password hashing for security.
- **User Management**: Update user details (password, first name, last name).
- **Account Management**: Automatic account creation with a random starting balance for new users.
- **Search Functionality**: Retrieve users by their first or last names using a bulk search API.
- **Frontend Routing**: Intuitive navigation with React Router (`/signup`, `/signin`, `/dashboard`, `/send`).
- **Secure Backend**: JWT-based authentication and middleware for protected routes.
- **MongoDB Integration**: Fully integrated with MongoDB Atlas for data storage.

---

## **Tech Stack**

### **Frontend**
- **React.js**: For building a responsive and dynamic user interface.
- **React Router**: For handling client-side routing.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: RESTful API server.
- **JWT**: JSON Web Token for secure user authentication.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.

### **Database**
- **MongoDB Atlas**: Cloud-based NoSQL database for secure and scalable storage.

---

## **Setup Instructions**

### **Pre-Requisites**
- [Node.js](https://nodejs.org/) and npm installed.
- MongoDB (Atlas or local).
- Git installed.

---

### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/payments-app.git
cd payments-app
```

---

### **2. Install Dependencies**

**Frontend:**
```bash
cd frontend/
npm install
```

**Backend:**
```bash
cd backend/
npm install
```

---

### **3. Configure Environment Variables**
Create a `.env` file in the **backend** directory and add:
```env
PORT=3000
JWT_SECRET=your-secret-key
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>
```
Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials.

---

### **4. Run the Application**

**Frontend:**
```bash
cd frontend/
npm run dev
```

**Backend:**
```bash
cd backend/
node index.js
```

---

### **5. Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api/v1`

---


## **API Endpoints**

### **User Routes**
| Method | Endpoint         | Description                    |
|--------|-------------------|--------------------------------|
| POST   | `/api/v1/signup`  | Create a new user.             |
| POST   | `/api/v1/signin`  | Authenticate and login user.   |
| PUT    | `/api/v1/`        | Update user information.       |
| GET    | `/api/v1/bulk`    | Search users by name.          |

---

## **Key Learnings**
- Implemented **JWT authentication** to secure sensitive user data.
- Designed a **RESTful API** with error handling and validation.
- Integrated **MongoDB Atlas** for database management.
- Built a fully functional frontend with **React.js** and **React Router**.
- Learned to manage environment variables for secure configuration.

---

## **Future Improvements**
- Add unit and integration tests for the backend and frontend.
- Implement transaction history for users.
- Introduce role-based access control for advanced authorization.
- Add a loading spinner and error handling on the frontend.

--
Feel free to customize this further! Let me know if you'd like help with any section.
