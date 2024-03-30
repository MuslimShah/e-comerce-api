# E-commerce API

E-commerce API is a project aimed at providing an API for an e-commerce platform. It allows users to register, login, view products of different categories, place orders, and leave reviews on products.

## Features

- **User Authentication**: Users can register and login to the platform.
- **Product Catalog**: Users can view products organized into different categories.
- **Ordering**: Users can place orders for products they want to purchase.
- **Product Reviews**: Users can leave reviews on products.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling tool for Node.js.

## Documentation

For detailed documentation, including API endpoints and usage examples, please visit the [official documentation](https://e-comerce-api.cyclic.app).

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MuslimShah/e-comerce-api.git
   ```
2. Create a .env file in the root directory and add the following environment variables with dummy values:

```bash
MONGO_URI=mongodb://localhost:27017/shopD
JWT_EXPIRE=1d
JWT_SECRET=dummy_jwt_secret
COOKIE_SECRET=dummy_cookie_secret
ACCESS_TOKEN=dummy_access_token
SENDER_ID=dummy_sender_id
SENDER_NAME=dummy_sender_name
ORIGIN=http://localhost:3000

```

Note: Replace dummy_jwt_secret, dummy_cookie_secret, dummy_access_token, dummy_sender_id, and dummy_sender_name with your actual values in a production environment.

3. Start the server:

```bash
npm start
```

## Email Sending

The project uses MailerSend for sending emails. MailerSend provides free email sending services. Make sure to set up your MailerSend account and replace the `ACCESS_TOKEN`, `SENDER_ID`, and `SENDER_NAME` environment variables in the `.env` file with your MailerSend API key and sender details.

## Forgot Password and Reset Password

The project includes functionality for forgot password and reset password. Users can request a password reset link if they forget their password, and then reset their password using the link provided in the email.

## Integration with Frontend: API Live and Documentation Available

My API is already live, so you can integrate it with your front end. The URL is [e-comerce-api.cyclic.app](https://e-comerce-api.cyclic.app). For further details, please visit the documentation to get route details.
