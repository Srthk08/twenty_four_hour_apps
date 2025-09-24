# Admin Setup Instructions

## Creating an Admin User

To create an admin user with access to all products, follow these steps:

### Method 1: Using Admin Code (Recommended)

1. Go to the signup page with the admin code parameter:
   ```
   http://localhost:4321/signup?admin_code=ADMIN2024
   ```

2. Fill out the signup form with your admin details
3. Enter the admin code: `ADMIN2024`
4. Complete the signup process

### Method 2: Direct Database Update

If you need to update an existing user to admin role:

1. Access your Supabase dashboard
2. Go to the `profiles` table
3. Find the user you want to make admin
4. Update the `role` field from `customer` to `admin`

## Admin Features

Once you have an admin account:

- **Full Product Access**: Admin users can access all product pages without restrictions
- **Regular User Experience**: Non-admin users will see a dialog popup when clicking on products other than "Order Menu System"
- **Order Menu System**: Available to all users (both admin and regular users)

## Product Access Control

- **Admin Users**: Can access all 5 products:
  - Restaurant Menu System
  - Android TV App
  - Streaming Mobile App
  - Restaurant Website
  - Order Menu System

- **Regular Users**: Can only access:
  - Order Menu System (fully functional)
  - Other products show "under development" dialog

## Testing the Implementation

1. Create a regular user account (without admin code)
2. Try to access products other than "Order Menu System"
3. You should see the dialog popup
4. Create an admin account with the admin code
5. Admin should be able to access all products without restrictions

## Security Notes

- The admin code `ADMIN2024` is hardcoded for simplicity
- In production, consider using environment variables or a more secure method
- Admin users have full access to all product features
- Regular users are restricted to the Order Menu System only
