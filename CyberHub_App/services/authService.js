// File: services/authService.js
// Purpose: Handles all Supabase authentication and database interactions.
import { supabase } from '../supabaseClient'; // Adjust this path if your file is in a different folder


//Registers a new user in Supabase Auth and creates their profile in the database.
export const registerUser = async (email, password, fullName, phone, gender) => {
  try {
    // Step 1: Create the account in Supabase Auth (The hidden safe)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("Account creation failed, no user returned.");

    // Step 2: Insert user details into the public 'profiles' table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id, // Links to auth.users (Foreign Key logic)
          email: email,
          full_name: fullName,
          phone_number: phone,
          gender: gender,
          role: 'user' 
        }
      ]);

    if (profileError) throw new Error("Account created, but failed to save profile details.");

    return { success: true, message: "Registration successful! You can now log in." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// Logs in an existing user using email and password.
export const loginUser = async (email, password) => {
  try {
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw new Error(error.message);

    return { success: true, userId: data.user.id };
  } catch (error) {
    return { success: false, message: error.message };
  }
};