import { z } from "zod";
export declare const contactFormSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    destination: z.ZodString;
    travelType: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    email: string;
    message: string;
    destination: string;
    travelType: string;
    phone?: string | undefined;
}, {
    fullName: string;
    email: string;
    message: string;
    destination: string;
    travelType: string;
    phone?: string | undefined;
}>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
