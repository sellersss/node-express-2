| Error | File(s)                        | Bug Description                                                         | Fix                                                                      |
| ----- | ------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1     | routes/`users, auth`           | no json validation performed on any requests, security vulnerability    | add `/helpers/validateRequest` method and `/schema` json schemas         |
| 2     | `/routes/users`                | users PATCH request requires admin rights                               | update `PATCH /[username]` without `requireAdmin` method                 |
| 3     | `/routes/users`                | users DELETE route is not asynchronous                                  | add `await` keyword to `User.delete()`                                   |
| 4     | `/middleware/auth`             | instead of verifying a token, `authUser` method tries to decode a token | update `payload` with `jwt.verify()`                                     |
| 5     | `/models/user`, `routes/users` | can't create user with true admin value                                 | update `User` class and `users` routes with ability to register an admin |
| 6     | `app`                          | app was being exported twice                                            | remove duplicate `module.exports = app`                                  |
| 7     | `/models/user`                 | unused parameters in getAll() static method                             | remove unnecessary parameters                                            |
| 8     | `/models/user`                 | `get` method does not throw an error when no user is found              | add `throw` statement to `new ExpressError(...)`                         |
| 9     | `/models/user`                 | hashed password is returned in multiple User class methods              | password should not be returned, add `delete user.password`              |
| 10    | `/helpers/createToken`         | `createToken` method creates a token even if username value is falsy    | add if statement if username value is truthy, return null if falsy       |
