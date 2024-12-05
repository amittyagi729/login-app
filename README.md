# React Dashboard with MUI Sidebar

This project is a dashboard application built with React, Redux, and Material UI (MUI). It features a persistent sidebar that can be toggled, displays a user list fetched from an API, and includes authentication flow with login and logout functionality.

## Features
- Responsive sidebar with open/close functionality.
- User authentication with login and logout features.
- Dynamic content area that adjusts based on sidebar state.
- API integration to fetch and display a list of users.
- Material UI components for layout and styling.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library.
- **Material UI (MUI)**: Component library for React.
- **Next.js**: React framework for server-side rendering.
- **React-Redux**: Integrates Redux with React components.
- **React Hook Form**: Simplifies form handling and validation.
- **MUI Icons**: Set of icons from Material UI.
- **React Query (RTK Query)**: Handles API requests.

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. **Install dependencies**:

```bash
npm install

3. **Run the development server**:

```bash
npm run dev

4. **Open http://localhost:3000 in your browser.**

## Usage
- **Login**: After registration, users can log in with their credentials. On successful login, they will be redirected to the dashboard.
- **Dashboard**: The dashboard shows a list of users fetched from the API.
- **Sidebar**: The sidebar can be toggled open or closed. The layout dynamically adjusts based on the sidebar’s state.
- **Logout**: Users can log out from the dashboard, which will redirect them back to the login page.

## Folder Structure

src/
├── app/
│   ├── fonts/              # Store your fonts here
│   ├── layout.js           # Main layout component for your app
│   ├── globals.css          # Global styles and configuration
├── components/
│   ├── RegisterForm.js     # Registration form component
│   ├── LoginForm.js        # Login form component   
├── store/
│   ├── api/
│   │   └── apiSlice.js     # RTK API slice for data fetching
│   ├── slices/
│   │   └── authSlice.js    # Redux slice for authentication state
│   └── store.js            # Main Redux store configuration
└── pages/
    ├── index.js            # Home page
    ├── register.js         # Register page
    ├── login.js            # Login page
    └── dashboard.js        # Dashboard page  
	└── _app.js             # main provider page
    └── users-listing.js    # User listing page

## Running Tests
To run tests, use the following command:

npm test

## Build
To create a production build of the app, run:

npm run build

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- **Material UI**: A popular React UI framework that is used for building the user interface.
- **React Redux**: A predictable state container for JavaScript apps, used for managing state across the application.
- **Next.js**: A framework that allows React to render on the server-side.
- **RTK Query**: A powerful tool for fetching data in Redux applications.
