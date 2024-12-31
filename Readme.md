# Blog Platform

Welcome to the **Blog Platform**! This platform allows users to create, manage, and share blogs. The platform provides different functionalities for both regular users and admins. This guide will help you understand how to interact with the system as a user.

## Technologies Used

- **TypeScript**: A superset of JavaScript, adding static types for better maintainability and developer experience.
- **Node.js**: A runtime environment for executing JavaScript on the server-side.
- **Express.js**: A fast and minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing blog posts, user data, and other content.
- **Mongoose**: An ODM (Object Data Modelling) library for MongoDB and Node.js, providing a straightforward way to model data.

## Live Server Link

You can access the live version of the platform here: [Blog Platform Live](https://bloging-server-two.vercel.app)

## Key Features

### For Users:

- **Register**: Create an account to start writing and managing your own blogs.
- **Login**: Log in to your account to access blog-related features.
- **Create Blogs**: Write and publish your own blog posts.
- **Update Blogs**: Edit your blogs if you want to make any changes.
- **Delete Blogs**: Remove blogs you no longer want to keep.
- **Read Blogs**: Explore blogs written by other users. You can search, sort, and filter blogs based on title, author, or content.

### For Admins:

- **Block Users**: Admins can block users to prevent them from logging in or interacting with the platform.
- **Delete Blogs**: Admins can delete any blog post, even if it's not theirs.

## Getting Started

### Steps to get started:

1. **Sign up**: Register on the platform with your name, email, and password.
2. **Log in**: Once registered, log in with your email and password to start managing your blogs.
3. **Create a Blog**: Write and share your thoughts by creating a new blog post.
4. **Manage Your Blogs**: Edit or delete your blogs whenever necessary.
5. **Explore Blogs**: Browse blogs from other users, search for topics of interest, and view the latest posts.

## API Endpoints for Users

### 1. Registering an Account

Before you can start creating or managing blogs, you need to register an account.

#### URL: `/api/auth/register`

- **Method**: `POST`
- **Request Body**:
  - `name` (string): Your name
  - `email` (string): Your email address
  - `password` (string): A secure password
- **Response**:
  - `statusCode`: 200
  - `message`: Success message with your user details

---

### 2. Logging In

After registration, log in to start using the platform.

#### URL: `/api/auth/login`

- **Method**: `POST`
- **Request Body**:
  - `email` (string): Your email address
  - `password` (string): Your password
- **Response**:
  - `statusCode`: 200
  - `message`: Login success message with a JWT token for authorization

---

### 3. Creating a Blog

Once logged in, you can create a new blog by providing a title and content.

#### URL: `/api/blogs`

- **Method**: `POST`
- **Request Body**:
  - `title` (string): The title of your blog post
  - `content` (string): The content of your blog post
- **Response**:
  - `statusCode`: 201
  - `message`: Confirmation message with the details of the newly created blog

---

### 4. Updating a Blog

You can edit any of your existing blogs by updating the title or content.

#### URL: `/api/blogs/:id`

- **Method**: `PATCH`
- **Request Body**:
  - `title` (string, optional): New title for the blog
  - `content` (string, optional): New content for the blog
- **Response**:
  - `statusCode`: 200
  - `message`: Confirmation message with updated blog details

---

### 5. Deleting a Blog

If you no longer want to keep a blog, you can delete it.

#### URL: `/api/blogs/:id`

- **Method**: `DELETE`
- **Response**:
  - `statusCode`: 200
  - `message`: Success message confirming the deletion of the blog

---

### 6. Viewing Blogs

Anyone can explore the blogs on the platform, whether logged in or not. You can search, sort, and filter blogs based on title, content, or author.

#### URL: `/api/blogs`

- **Method**: `GET`
- **Query Parameters** (optional):
  - `title` (string): Search blogs by title
  - `author` (string): Filter blogs by author
  - `sort` (string): Sort blogs by `title` or `createdAt`
  - `filter` (string): Filter based on blog content or specific tags
- **Response**:
  - `statusCode`: 200
  - `message`: List of blogs matching the search/filter criteria

---

## Error Handling

The system is designed to handle errors gracefully. The error responses have the following structure:

## Error Handling

The system ensures that errors are handled gracefully with consistent error responses across all endpoints. The structure of error responses is as follows:

- ### Types of Errors Handled:
  `Zod Validation Error (ZOD_ERROR)`: Invalid input based on Zod schema.
  `Not Found Error (NOT_FOUND_ERROR)`: When a resource is not found.
  `Validation Error (VALIDATION_ERROR)`: Incorrect data format or missing fields.
  `Authentication Error (AUTH_ERROR)`: Invalid token or expired session.
  `Authorization Error (AUTHORIZATION_ERROR)`: Insufficient permissions.
  Internal Server Error `(INTERNAL_SERVER_ERROR)`: Unhandled errors.

## Run Locally

Clone the project

```bash
  git clone https://github.com/ZH-Jihan/blogging-site-server.git
```

Go to the project directory

```bash
  cd blogging-site-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`:

`DATABASE_NAME`:

`PORT`:

`NODE_ENV`:

`DEFAULT_PASSWORD`:

`JWT_ACCESS_SECRET`:

`JWT_REFRESH_SECRET`:

`JWT_ACCESS_TOKEN_EXPIRE`:

`JWT_REFRESH_TOKEN_EXPIRE`:

`BCRYPT_SALT_ROUNDS`:

## Conclusion

The Blog Platform provides you with the tools to share your ideas and stories with others while maintaining full control over your own content. Whether you're a casual blogger or an admin managing content and users, this platform is designed to make your experience seamless and enjoyable.
Happy blogging! 😊

## Authors

- [@ZH-Jihan](https://www.facebook.com/mdjakir.hossen.560)
