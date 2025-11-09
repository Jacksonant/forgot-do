import { useState } from "react";
import { type LoginFormData, type LoginFormErrors } from "../models/auth";
import { useAppDispatch } from './useRedux'
import { login as loginAction } from '../store/authSlice'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    userName: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "ID is required";
    }

    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const login = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    dispatch(loginAction({ id: formData.userId, name: formData.userName }))
    setIsLoading(false);

    return true;
  };

  return {
    formData,
    errors,
    isLoading,
    updateField,
    login,
  };
};