// import { supabase } from './supabaseClient';

// export const loginAdmin = async (email, password) => {
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) throw error;

//   const { data: profile, error: profileError } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', data.user.id)
//     .single();

//   if (profileError || profile.role !== 'admin') {
//     await supabase.auth.signOut();
//     throw new Error("Access Denied: You are not an administrator.");
//   }

//   return data;
// };