## 📌 API Endpoints

### 🔑 Authentication
- **POST** `/register` → Register a new user
- **POST** `/login` → Login user

---

### 📢 Announcements
- **GET** `/announcement` → Get all announcements _(auth required)_
- **POST** `/announcement` → Add announcement _(teacher only)_
- **PATCH** `/announcement/:id` → Update announcement _(teacher only)_
- **DELETE** `/announcement/:id` → Delete announcement _(teacher only)_

---

### 🎓 Courses
- **GET** `/course` → Get all courses _(auth required)_
- **DELETE** `/course/:id` → Delete course _(teacher only)_

---

### 📝 Quizzes
- **GET** `/quiz` → Get all quizzes _(auth required)_
- **POST** `/quiz` → Create quiz _(teacher only)_
- **PATCH** `/quiz/:quizId` → Update quiz _(teacher only)_
- **DELETE** `/quiz/:quizId` → Delete quiz _(teacher only)_
- **POST** `/quiz/:quizId/submit` → Submit quiz _(student)_
- **GET** `/submitQuiz` → Get all submitted quizzes _(teacher only)_

---

### 👤 Users
- **DELETE** `/user/:id` → Delete user _(admin/teacher)_

---

## 👨‍💻 Technologies
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
