This was a big one. You can't play movies on this (everything else is same as what netflix has). But anyway here is a list of all the features of the project:

-Netflix clone but it is completly dark themed

-NEXT JS as frontend library with typescript

-Tailwind Css with some plugins for styling everything

-Global Css created using Tailwind layers for targeting components and classes

-Typescript with strict type definitions to make sure that there are minimum errors

-Env to keep sensitive info private such as firebase config, movie api config etc

-Custom scrollbar to make the scrollbar of the page just like the one netflix has

-Navbar fixed with background change on scroll

-Banner image, banner movie title, banner movie description are dynamically fetched on random on each render.

-Responsive Web app

-Server side props to fetch all movie data

-Authentication using firebase 

-Authentication form using react hook form

-Authentication form validation using react hook form

-Custom hooks created for handling user authentication and user validation (useAuth)

-Recoil for react state management (alternate to redux for smaller projects)

-MUI modal to show movie deatils including autoplaying trailer and options to add it to my list.

-Adding to mylist will add the move to mylist which will be displayed on the homepage

-Subscription Plans if a new user signs up using a dedicated plans page just like netflix

-Stripe integration for payment of selected plan (testing account of stripe)

-Plan payments is handled by stripe portal and user is redirected back to our site after payment is successfull or if payment is rejected/cancelled for any reason

-Customized the stripe payment customer side page a little bit to match the overall theme

-Custom hook to manage current status of user subscription/plan (useSubscription)

-Account page which can be accessed by clicking on the image at the top right of nav bar

-Once the account page is opened the user can manage their subscriptions and other account related settings on this page

-Another custom Hook created to manage the MyList component that manages the movies that are added to myList by a user (useList)

-The mylist is saved for every user in firebase

-Used react hot toast pakcage to show notifications when a user adds or removes a movie from myList

And now for the technical stuff. Here are all the packages that i have used to complete this fun project:

    @heroicons/react: For icons used within the app.
    @mui/material: For some components like modal and hamburger menu.
    axios: for api calls.
    dotenv: for keeping important information hidden.
    firebase: as a database for both users and payments.
    next: for handling all the frontend functionalities.
    react-hook-form: for forms and validations used in auth pages.
    react-hot-toast: for showing notifications.
    react-icons: For icons used within the app that were not present in hero-icons.
    react-player: For playing trailers etc.
    recoil: For state management.
    tailwindcss: For all the styling.

