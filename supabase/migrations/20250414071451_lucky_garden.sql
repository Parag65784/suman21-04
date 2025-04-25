/*
  # Add Admin User

  This migration adds admin role to a specific user
*/

-- Update user metadata to add admin role
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'govindsingh747@gmail.com';