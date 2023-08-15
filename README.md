# [Book Store](https://dimnov.github.io/angular-project/)

The project is an online book store that offers users the ability to browse, search, and purchase books. Users can manage their shopping cart, save favorite books, and complete purchases using the Stripe payment gateway. The application is built using Angular for the frontend and Firebase (Firestore) for the backend.

## Key Features:

- **Homepage**: The main page displays a collection of available books for users to explore and purchase.
- **Book Categories**: Users can filter books by specific categories using the category sidebar, making it easier to find books that match their interests.
- **User Authentication**: Authentication functionality allows users to log in or register, providing a personalized experience.
- **User Cart**: The cart icon displays the number of items in the user's cart. Clicking on the cart icon takes users to a dedicated cart page.
- **Book Interaction**: Users can purchase books by clicking the "Buy" button on a book's page, or they can add books to their list of favorite items.
- **Favorite Books (Logged-in Users Only)**: Logged-in users have access to a dedicated favorites page where they can view and purchase books they have favorited.
- **Cart Management**: The cart page enables users to adjust the quantity of items, remove individual items, or clear the entire cart.
- **Checkout**: Clicking the checkout button redirects users to the Stripe platform, where secure payment processing takes place.
- **Stripe Integration**: The Stripe payment gateway securely handles the processing of payments. Users can provide address and debit card information without concerns about security.

## Technologies Used:

- **Frontend**: Angular (HTML, Tailwind CSS, TypeScript)
- **Backend**: Firebase for authentication and Firestore for database storage
- **Payment Processing**: Stripe

## How to Use:

- Access the online book store to view the collection of available books on the homepage.
- Utilize the category sidebar to narrow down book options based on preferred genres.
- Register or log in using the provided buttons in the top-right corner of the site.
- Engage with books by purchasing, adding them to your favorites list, or accessing detailed information.
- Manage your cart by clicking on the cart icon, allowing you to adjust quantities, remove items, and proceed to checkout.
- Follow the checkout process to securely complete your purchase through the integrated Stripe payment gateway.
