# PromptCraft AI — Database Layer 🗄️

> **Project 3 | DecodeLabs Full Stack Internship — Batch 2026**
> The memory vault of PromptCraft AI. A complete Oracle Database integration with full CRUD operations, RESTful API endpoints, and data persistence — connecting the frontend to permanent storage.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)

---

## 🔗 Related Repositories

| Project | Repository |
|---|---|
| 🎨 Frontend (Project 1) | [promptcraft-ai](https://github.com/Alveena-Zafar/promptcraft-ai) |
| ⚙️ Backend API (Project 2) | [promptcraft-api](https://github.com/Alveena-Zafar/promptcraft-api) |

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Database Setup](#-database-setup)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing with Thunder Client](#-testing-with-thunder-client)
- [What I Learned](#-what-i-learned)

---

## 🧠 Overview
Project 1 = Skin     (Frontend)

Project 2 = Brain    (Backend API)

Project 3 = Memory   (Database)

Project 3 connects the entire stack — the frontend now fetches real prompts from Oracle Database instead of static JavaScript objects. Contact form submissions are permanently saved to the database.

This project demonstrates:
- Designing a relational database schema with constraints
- Full CRUD operations via RESTful API
- Secure parameterized queries (SQL injection prevention)
- CLOB data type handling with oracledb v7
- Connecting frontend → backend → database end-to-end

---

## ⚠️ Prerequisites

Before running this project, make sure you have:

- **Node.js** v18 or higher
- **Oracle Database 19c** installed locally
- **Oracle SQL Developer** (to run the schema script)
- **dotenv** — credentials are stored in `.env` file (not included in repo)

---

## 🔐 Environment Setup

Create a `.env` file in the root folder:
DB_USER=your_oracle_username

DB_PASSWORD=your_oracle_password

DB_CONNECT=localhost:1521/your_service_name

---

## 🗄️ Database Setup

**Step 1** — Open Oracle SQL Developer

**Step 2** — Connect using your credentials

**Step 3** — Open `schema.sql` and run:
Ctrl + Enter

This will:
- Create `prompts` table with constraints
- Create `contacts` table
- Insert 12 sample prompts across all categories

---

## 📡 API Endpoints

### Prompts

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | /api/prompts | Get all prompts | 200 OK |
| GET | /api/prompts/:category | Get by category | 200 OK |
| POST | /api/prompts | Add new prompt | 201 Created |
| PUT | /api/prompts/:id | Update prompt | 200 OK |
| DELETE | /api/prompts/:id | Delete prompt | 200 OK |

### Contacts

| Method | Endpoint | Description | Status |
|---|---|---|---|
| POST | /api/contact | Save contact form | 201 Created |
| GET | /api/contacts | Get all contacts | 200 OK |

---

## 📁 Project Structure
promptcraft-db/

│

├── server.js          # All CRUD routes + Express setup

├── db.js              # Oracle Database connection config

├── schema.sql         # Database schema + sample data

├── package.json       # Dependencies

├── package-lock.json  # Locked versions

├── .gitignore         # node_modules + .env excluded

└── README.md          # You are here

---

## ⚡ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Alveena-Zafar/promptcraft-db.git

# 2. Navigate into folder
cd promptcraft-db

# 3. Install dependencies
npm install

# 4. Create .env file with your Oracle credentials

# 5. Run schema.sql in Oracle SQL Developer

# 6. Start the server
node server.js

# Server running on http://localhost:3001
```

---

## 🧪 Testing with Thunder Client

| Method | Endpoint | Body | Expected |
|---|---|---|---|
| GET | /api/test | — | 200 OK |
| GET | /api/prompts | — | 200 OK |
| GET | /api/prompts/coding | — | 200 OK |
| POST | /api/prompts | `{category, difficulty, prompt_text}` | 201 Created |
| PUT | /api/prompts/1 | `{prompt_text}` | 200 OK |
| DELETE | /api/prompts/13 | — | 200 OK |
| POST | /api/contact | `{name, email, message}` | 201 Created |
| GET | /api/contacts | — | 200 OK |

---

## 📖 What I Learned

- **Schema design matters** — constraints at DB level are the last line of defense
- **CLOB in oracledb v7** — `fetchAsString` fix for circular JSON serialization
- **Parameterized queries** — `:variable` syntax prevents SQL injection
- **CORS configuration** — required for frontend-backend communication
- **dotenv** — never hardcode credentials in source code
- **Full stack connection** — frontend `fetch()` → Express → Oracle → JSON response

---

## 👩‍💻 Author

**Alveena Zafar**

PromptCraft AI was designed and developed by Alveena Zafar as part of the DecodeLabs Full Stack Development Program (Batch 2026).

GitHub: https://github.com/Alveena-Zafar

---

## 📄 License

This project is licensed under the **MIT License** — feel free to fork, modify, and build on top of it.

---

<div align="center">

Made with ☕ and a lot of var(--mocha) by Alveena Zafar | DecodeLabs Full Stack Project 1

</div>
