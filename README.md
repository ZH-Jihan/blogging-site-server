
# Blog Platform

Welcome to the Blog Platform! This platform allows users to create, manage, and share blogs. The platform provides different functionalities for both regular users and admins. This guide will help you understand how to interact with the system as a user.




## Technologies Used

*   **TypeScript**
*   **Node.js**
*   **Express.js**
*   **MongoDB**
*   **Mongoose**

## Live Server Link

https://bloging-server-two.vercel.app
## Key Features

## For Users:
* `Register` : Create an account to start writing and managing your own blogs.
* `Login`: Log in to your account to access your blog-related features.
* `Create Blogs`: Write your own blog posts and share them with the world.
* `Update Blogs`: Edit your own blogs if you wish to make changes.
* `Delete Blogs`: Remove any blogs you no longer wish to keep.
* `Read Blogs`: Explore blogs written by other users, with options to search, sort, and filter based on title, author, or content.
## For Admins:
* `Block Users`: Admins can block any user if necessary, preventing them from logging in or interacting with the platform.
* `Delete Blogs`: Admins can delete any blog on the platform, even if it's not theirs.


## Getting Started


- `Sign up`: Register an account on the platform with your name, email, and password.
- `Log in`: After registering, log in using your email and password to start managing blogs.
- `Create a Blog`: Share your thoughts and ideas with the world by writing a blog post.
- `Manage Your Blogs`: Update or delete your blogs whenever you need to.
- `Explore Blogs`: Browse through other blogs, search for topics you like, and see the latest posts.


## API Endpoints for Users

### Registering an Account & Logging In

* Method POST
```http
 /api/auth/register
```
```http
 /api/auth/login
```

### Need Information to register & login
* Register 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**|
| `email`      | `string` | **Required**|
| `password`      | `string` | **Required**|
* Login 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**|
| `password`      | `string` | **Required**|

Upon successful login, you will receive a JWT token that you need to use when performing actions like creating or updating blogs.




## Error Handling

The system ensures that errors are handled gracefully with consistent error responses across all endpoints. The structure of error responses is as follows:

* ### Types of Errors Handled:
`Zod Validation Error (ZOD_ERROR)`: Invalid input based on Zod schema.
`Not Found Error (NOT_FOUND_ERROR)`: When a resource is not found.
`Validation Error (VALIDATION_ERROR)`: Incorrect data format or missing fields.
`Authentication Error (AUTH_ERROR)`: Invalid token or expired session.
`Authorization Error (AUTHORIZATION_ERROR)`: Insufficient permissions.
`Internal Server Error (INTERNAL_SERVER_ERROR)`: Unhandled errors.

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

