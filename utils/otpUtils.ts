// File: utils/otpUtils.ts
export function validateOtp(otp: string): boolean {
    return /^\d{6}$/.test(otp); // Ensure OTP is exactly 6 digits
  }
  