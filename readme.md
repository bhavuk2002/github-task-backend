# GitHub Task Backend

A backend server for managing users and their friend relationships. This project is built using **TypeScript**, **Node.js**, **Express**, and **Sequelize**, with **MySQL** as the database. The server provides robust API endpoints for user management and relational operations.

## Tech Stack

- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for building APIs.
- **TypeScript**: Type-safe development.
- **Sequelize**: ORM for managing MySQL database operations.
- **MySQL**: Relational database for persistent data storage.
- **dotenv**: For environment variable management.
- **CORS**: To enable secure cross-origin requests.

---

## Project Structure

```
backend/
├── config/
│ └── database.ts # Sequelize database connection and models setup
├── controllers/ # Business logic for handling requests
│ └── friendController.ts
│ └── userController.ts
├── dist/ # Compiled JavaScript files
├── models/ # Sequelize model definitions
│ └── Friend.ts # Friend Schema
│ └── User.ts # User Schema
├── routers/ # Express route handlers
│ └── userRoutes.ts # User endpoints
├── services/
│ └── githubService.ts
├── .env # Environment variables
├── .gitignore # Files to not include in git
├── app.ts # Main express app
├── index.ts # Express configuration
├── package.json
├── package-lock.json
├── readme.md # Documentation
└── tsconfig.json # TypeScript configuration
```

---

## Models

### User

Represents a user in the system.

| Field        | Type    | Description                                      |
| ------------ | ------- | ------------------------------------------------ |
| id           | Integer | Primary key (auto-increment).                    |
| username     | String  | Unique username for the user.                    |
| avatar_url   | String  | URL of the user's avatar.                        |
| location     | String  | Location of the user (nullable).                 |
| blog         | String  | User's blog or website URL (nullable).           |
| bio          | Text    | Bio or description of the user (nullable).       |
| public_repos | Integer | Number of public repositories owned by the user. |
| public_gists | Integer | Number of public gists by the user.              |
| followers    | Integer | Number of followers the user has.                |
| following    | Integer | Number of users the user is following.           |
| createdAt    | Date    | Timestamp when the user was created.             |
| updatedAt    | Date    | Timestamp when the user was last updated.        |
| deletedAt    | Date    | Soft delete flag (null if not deleted).          |

### Friend

Represents a friendship relationship between users.

| Field    | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| id       | Integer | Primary key (auto-increment).  |
| userId   | Integer | Foreign key to the User model. |
| friendId | String  | Github UserId                  |

---

## API Endpoints

### Users

- **POST** `/api/users`: Create a new user.
- **GET** `/api/users`: Get all users sorted by different paramters.
- **GET** `/api/users/search?query=...`: Search users by username & location.
- **PATCH** `/api/users/:username`: Update user information.
- **DELETE** `/api/users/:username`: Soft delete a user.

### Friends

- **POST** `/api/users/:username/friends`: Add friends for a user.

---

## How It Works

1. **Database Synchronization**:

   - On server start, the app connects to the MySQL database using Sequelize and syncs all models.
   - Tables are automatically created (if they don't exist).

2. **User Management**:

   - Supports user creation, updating, deletion (soft delete), and searching.
   - Users can be sorted and filtered through API requests.

3. **Friendship Management**:
   - Users can add friends via the provided API.
   - Relationships between `User` are maintained through the `Friend` model.

---

## Prerequisites

Make sure the following are installed on your system:

1. **Node.js**: Version 16 or higher.
   - [Download Node.js](https://nodejs.org)
2. **npm** (comes with Node.js) or **yarn**.
3. **TypeScript**: Ensure TypeScript is installed globally or locally as a dev dependency.

   - To install TypeScript globally:
     ```bash
     npm install -g typescript
     ```
   - Alternatively, install it locally in the project:
     ```bash
     npm install --save-dev typescript
     ```

4. **ts-node-dev** (optional for development):
   - For hot-reloading during development, install `ts-node-dev`:
     ```bash
     npm install --save-dev ts-node-dev
     ```

## Running the Application

### 1. Clone the Repository

```bash
git clone https://github.com/bhavuk2002/github-task-backend.git
cd github-task-backend
```

### 2. Install Dependencies

```bash
npm install --include=dev
```

Also, make sure to spin up a MySQL database.
Make sure to install TypeScript also, if not installed.

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_HOST=your-database-host
DATABASE_NAME=your-database-name
DATABASE_USER=your-database-user
DATABASE_PASSWORD=your-database-password
```

### 4. Start the Server

#### Development Mode

Runs the server with TypeScript:

```bash
npm run dev
```

#### Build and Run

Build the project and run the compiled JavaScript:

```bash
npm run build
npm start
```

The server will be available at `http://localhost:3000`.

## Appendix

### Paranoid Mode (Soft Delete)

In this project, **paranoid mode** is enabled for the `User` model to implement **soft deletes**. This means that when a user is deleted, the record is not permanently removed from the database. Instead, the `deletedAt` timestamp is set, and the user is considered "deleted" but still present in the database. This allows for recovery of the deleted user if needed.

#### How Paranoid Mode Works:

- **Soft Deletion**: When a `DELETE` operation is performed on a user, the `deletedAt` field is set to the current timestamp.
- **Querying Active Users**: By default, queries will only return records that have **not** been marked as deleted (i.e., where `deletedAt` is `null`).
- **Restoration**: Soft-deleted users can be "restored" by setting the `deletedAt` field to `null`.

This section will be helpful for anyone unfamiliar with the concept of paranoid mode or soft deletes in Sequelize.
