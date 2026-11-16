import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),

    phone: z
      .string()
      .trim()
      .regex(
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit phone number"
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),

    password: z
      .string()
      .min(1, "Password is required"),
  })
  .strict();

  export const forgotPasswordSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .email("Please enter a valid email address."),
  });



  export const verifyOTPSchema = z.object({
    otp: z
      .string()
      .length(6, "OTP must contain exactly 6 digits.")
      .regex(/^\d{6}$/, "OTP must contain only numbers."),
  });


  export const resetPasswordSchema = z
    .object({
      newPassword: z
        .string()
        .min(8, "Password must contain at least 8 characters."),

      confirmPassword: z
        .string()
        .min(1, "Please confirm your password."),
    })
    .refine(
      (formData) => formData.newPassword === formData.confirmPassword,
      {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      }
    );