import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  forgotPasswordApi,
  verifyResetCodeApi,
  resetPasswordApi,
  type ForgotPasswordPayload,
  type VerifyOtpPayload,
  type ResetPasswordPayload,
} from "../lib/apis/forget-password.api";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) => forgotPasswordApi(data),
    onSuccess: (data) => {
      toast.success(data.message || "OTP code sent to your email!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send OTP code");
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => verifyResetCodeApi(data),
    onSuccess: () => {
      toast.success("OTP verified successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid or expired OTP");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPasswordApi(data),
    onSuccess: () => {
      toast.success("Password reset successfully! Please log in.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};