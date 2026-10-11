const BASE_URL = "https://fitness.elevateegy.com/api/v1/auth";

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  resetCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export async function forgotPasswordApi(data: ForgotPasswordPayload) {
  const res = await fetch(`${BASE_URL}/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || responseData.error || "Failed to send OTP");
  }

  return responseData;
}

export async function verifyResetCodeApi(data: VerifyOtpPayload) {
  const res = await fetch(`${BASE_URL}/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || responseData.error || "Invalid or expired OTP");
  }

  return responseData;
}

export async function resetPasswordApi(data: ResetPasswordPayload) {
  const res = await fetch(`${BASE_URL}/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || responseData.error || "Failed to reset password");
  }

  return responseData;
}