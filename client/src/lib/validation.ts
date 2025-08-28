import * as z from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingrese un correo electrónico válido"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Por favor ingrese un número de teléfono válido")
});

export type RegistrationData = z.infer<typeof registrationSchema>;

// Schema para datos de mascota
export const petRegistrationSchema = z.object({
  petName: z.string().min(1, "El nombre de la mascota es requerido"),
  breed: z.string().min(1, "La raza es requerida"),
  age: z.string().min(1, "La edad es requerida")
});

export type PetRegistrationData = z.infer<typeof petRegistrationSchema>;