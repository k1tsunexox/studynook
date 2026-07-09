CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

ALTER TABLE profiles
ADD COLUMN user_id uuid;

ALTER TABLE profiles
ADD COLUMN first_name text;

ALTER TABLE profiles
ADD COLUMN last_name text;

ALTER TABLE profiles
ADD COLUMN role user_role DEFAULT 'student' NOT NULL;

ALTER TABLE profiles
DROP COLUMN full_name;