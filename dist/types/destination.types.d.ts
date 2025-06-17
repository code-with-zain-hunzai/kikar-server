import { z } from 'zod';
export declare const CreateDestinationSchema: z.ZodObject<{
    name: z.ZodString;
    location: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    type: z.ZodEnum<["valley", "peak", "lake", "glacier", "cultural"]>;
    rating: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    location: string;
    description: string;
    type: "valley" | "peak" | "lake" | "glacier" | "cultural";
    image?: string | undefined;
    highlights?: string[] | undefined;
    rating?: number | undefined;
}, {
    name: string;
    location: string;
    description: string;
    type: "valley" | "peak" | "lake" | "glacier" | "cultural";
    image?: string | undefined;
    highlights?: string[] | undefined;
    rating?: number | undefined;
}>;
export type CreateDestinationData = z.infer<typeof CreateDestinationSchema>;
export declare const UpdateDestinationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    highlights: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    type: z.ZodOptional<z.ZodEnum<["valley", "peak", "lake", "glacier", "cultural"]>>;
    rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    location?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    type?: "valley" | "peak" | "lake" | "glacier" | "cultural" | undefined;
    highlights?: string[] | undefined;
    rating?: number | undefined;
}, {
    name?: string | undefined;
    location?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    type?: "valley" | "peak" | "lake" | "glacier" | "cultural" | undefined;
    highlights?: string[] | undefined;
    rating?: number | undefined;
}>;
export type UpdateDestinationData = z.infer<typeof UpdateDestinationSchema>;
