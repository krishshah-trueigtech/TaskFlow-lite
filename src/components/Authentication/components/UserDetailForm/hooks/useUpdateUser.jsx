import { useState } from "react";
import { useAuth } from  "../../../context/authContext.jsx";
import { updateUserDetails } from  "../../../../../services/authService.js";

export const useUpdateUser = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUserDetails(user.id, formData);
      
      login(updatedUser); 
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};