import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  travelType: z.string().nonempty("Travel type is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;