# React Dashboard

A React + Redux Toolkit shopping dashboard built with Vite. The app includes product browsing, cart, wishlist, checkout address flow, payment, and order confirmation pages.

## Features

- Product listing and cart flow
- Wishlist page
- Login and signup pages
- Checkout steps: Cart, Address, Payment, Order Confirm
- Address add, edit, remove, and select
- Saved addresses persist after page reload using localStorage
- Phone number validation: exactly 10 digits
- Pin code validation: exactly 6 digits
- Pin code lookup using `https://api.postalpincode.in/pincode/{pinCode}`
- City, district, and state auto-fill from valid pin code details
- Error message for invalid postal codes

## Tech Stack

- React 19
- Redux Toolkit
- React Redux
- React Router
- Vite
- ESLint
- Axios

## Project Setup

Install dependencies:

```powershell
npm install
```

Start the frontend development server:

```powershell
npm run dev
```

Vite usually opens at:

```text
http://localhost:5173/
```

Start the local backend server:

```powershell
npm run server
```

## Available Scripts

```powershell
npm run dev
```

Runs the Vite development server.

```powershell
npm run server
```

Runs the local Node server from `server/server.js`.

```powershell
npm run build
```

Creates a production build.

```powershell
npm run lint
```

Runs ESLint checks.

```powershell
npm run preview
```

Previews the production build locally.

## Routes

- `/` - Home/products
- `/products` - Products
- `/products-table` - Products table
- `/cart` - Cart
- `/address` - Delivery address
- `/payment` - Payment
- `/order-confirm` - Order confirmation
- `/wishlist` - Wishlist
- `/signup` - Signup
- `/login` - Login

## Address Form Rules

- Phone Number accepts digits only and must be exactly 10 digits.
- Pin Code accepts digits only and must be exactly 6 digits.
- Wrong postal codes show an error message.
- Valid pin codes fetch location details and fill city, district, and state.
- Saved addresses remain visible after page reload.

## Folder Structure

```text
src/
  app/
  components/
    layout/
      Navbar/
    PopupDialog/
    products/
      Pagination/
      ProductCard/
      ProductList/
      SearchBar/
      SidebarFilter/
  data/
  features/
  hooks/
    useDebouncedValue/
  method/
  pages/
    Address/
    Login/
    OrderConfirm/
    Payment/
    Signup/
  routes/
  utils/
server/
  data/
  server.js
```
