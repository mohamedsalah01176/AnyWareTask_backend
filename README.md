📌 API Endpoints
🔑 Authentication

POST /register → Register a new user

POST /login → Login user

📢 Announcements

GET /announcement → Get all announcements (auth required)

POST /announcement → Add announcement (teacher only)

PATCH /announcement/:id → Update announcement (teacher only)

DELETE /announcement/:id → Delete announcement (teacher only)

🎓 Courses

GET /course → Get all courses (auth required)

DELETE /course/:id → Delete course (teacher only)

📝 Quizzes

GET /quiz → Get all quizzes (auth required)

POST /quiz → Create quiz (teacher only)

PATCH /quiz/:quizId → Update quiz (teacher only)

DELETE /quiz/:quizId → Delete quiz (teacher only)

POST /quiz/:quizId/submit → Submit quiz (student)

GET /submitQuiz → Get all submitted quizzes (teacher only)

👤 Users

DELETE /user/:id → Delete user (admin/teacher)

👨‍💻 Technologies

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication
