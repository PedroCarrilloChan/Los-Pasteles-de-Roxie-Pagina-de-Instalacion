
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { config } from "@/config";

// Schema de validación para datos de mascota
const petRegistrationSchema = z.object({
  petName: z.string().min(1, "El nombre de la mascota es requerido"),
  breed: z.string().min(1, "La raza es requerida"),
  age: z.string().min(1, "La edad es requerida")
});

type PetRegistrationData = z.infer<typeof petRegistrationSchema>;

const commonBreeds = [
  "Labrador Retriever",
  "Golden Retriever",
  "Pastor Alemán",
  "Bulldog Francés",
  "Beagle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Poodle",
  "Husky Siberiano",
  "Chihuahua",
  "Border Collie",
  "Boxer",
  "Schnauzer",
  "Cocker Spaniel",
  "Mestizo",
  "Otro"
];

export default function PetRegistration() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<PetRegistrationData>({
    resolver: zodResolver(petRegistrationSchema),
    defaultValues: {
      petName: "",
      breed: "",
      age: ""
    }
  });

  async function onSubmit(data: PetRegistrationData) {
    try {
      const response = await fetch('/api/register-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error en el registro de la mascota');
      }

      // Redirigir a la página de carga
      navigate('/loading');

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Error en el registro de la mascota. Por favor intente nuevamente."
      });
    }
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Fondo con iconos temáticos que suben */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Fondo base rosado suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 opacity-70"></div>

        {/* Iconos temáticos flotantes que suben - enfoque en mascotas */}
        <div className="themed-icons-rising">
          {/* Huesitos para perros */}
          <div className="icon-element" style={{left: '10%', animationDelay: '0s', fontSize: '2rem'}}>🦴</div>
          <div className="icon-element" style={{left: '85%', animationDelay: '2s', fontSize: '1.5rem'}}>🦴</div>
          <div className="icon-element" style={{left: '60%', animationDelay: '4s', fontSize: '2.5rem'}}>🦴</div>
          <div className="icon-element" style={{left: '25%', animationDelay: '6s', fontSize: '1.8rem'}}>🦴</div>
          
          {/* Mascotas */}
          <div className="icon-element" style={{left: '20%', animationDelay: '1s', fontSize: '2.2rem'}}>🐕</div>
          <div className="icon-element" style={{left: '75%', animationDelay: '3s', fontSize: '1.8rem'}}>🐕</div>
          <div className="icon-element" style={{left: '45%', animationDelay: '5s', fontSize: '2rem'}}>🐕</div>
          <div className="icon-element" style={{left: '90%', animationDelay: '7s', fontSize: '1.6rem'}}>🐕</div>
          
          {/* Comida para mascotas y pasteles */}
          <div className="icon-element" style={{left: '35%', animationDelay: '1.5s', fontSize: '2.5rem'}}>🧁</div>
          <div className="icon-element" style={{left: '70%', animationDelay: '3.5s', fontSize: '2rem'}}>🧁</div>
          <div className="icon-element" style={{left: '15%', animationDelay: '5.5s', fontSize: '2.2rem'}}>🧁</div>
          
          {/* Corazones temáticos */}
          <div className="icon-element" style={{left: '65%', animationDelay: '1s', fontSize: '1.5rem'}}>💕</div>
          <div className="icon-element" style={{left: '30%', animationDelay: '3s', fontSize: '1.3rem'}}>💕</div>
          <div className="icon-element" style={{left: '85%', animationDelay: '5s', fontSize: '1.4rem'}}>💕</div>
          
          {/* Huellas */}
          <div className="icon-element" style={{left: '55%', animationDelay: '2s', fontSize: '1.8rem'}}>🐾</div>
          <div className="icon-element" style={{left: '80%', animationDelay: '4s', fontSize: '2rem'}}>🐾</div>
          <div className="icon-element" style={{left: '30%', animationDelay: '6s', fontSize: '1.5rem'}}>🐾</div>
          
          {/* Juguetes para mascotas */}
          <div className="icon-element" style={{left: '40%', animationDelay: '2.5s', fontSize: '2rem'}}>🎾</div>
          <div className="icon-element" style={{left: '65%', animationDelay: '4.5s', fontSize: '1.7rem'}}>🎾</div>
        </div>

        {/* Capa de difuminado suave */}
        <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/5"></div>
      </div>

      {/* Header con logo y título */}
      <div className="relative z-10 w-full overflow-hidden py-6 sm:py-8 md:pt-12 md:pb-8">
        <div className="container mx-auto flex flex-col items-center justify-center px-4">
          {/* Logo */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full glass-card p-3 animate-float mb-4 sm:mb-6 md:mb-8"
               style={{
                 boxShadow: '0 15px 35px rgba(139, 69, 19, 0.4), 0 8px 20px rgba(232, 90, 79, 0.3), 0 4px 10px rgba(220, 20, 60, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                 filter: 'drop-shadow(0 5px 15px rgba(139, 69, 19, 0.3))'
               }}>
            <img
              src={config.branding.logoUrl || "https://via.placeholder.com/200"}
              alt={config.branding.name}
              className="w-full h-full rounded-full object-cover"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(139, 69, 19, 0.2))'
              }}
            />
          </div>

          {/* Título */}
          <div className="text-center space-y-2 sm:space-y-4 w-full max-w-4xl px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#8B4513'}}>Registra a tu</span>{" "}
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#DC143C'}}>Mejor</span>{" "}
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#E85A4F'}}>Amigo</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_2px_rgba(139,69,19,0.3)] font-medium"
               style={{color: '#8B4513'}}>
              Cuéntanos sobre tu mascota para crear su tarjeta digital personalizada
            </p>
          </div>
        </div>
      </div>

      {/* Formulario de mascota */}
      <div className="relative z-10 flex-1 container max-w-lg mx-auto px-4 py-6 sm:py-8">
        <Card className="glass-card w-full max-w-md mx-auto border-none shadow-2xl drop-shadow-2xl 
                       transform transition-all duration-300 hover:shadow-3xl backdrop-blur-xl bg-white/15 border border-white/20 
                        rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center p-4 sm:pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold drop-shadow-[0_1px_1px_rgba(245,230,211,0.8)]" 
                       style={{color: '#8B4513'}}>Datos de tu Mascota</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="petName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Nombre de la Mascota</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Raza</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium border-white/30">
                            <SelectValue placeholder="Selecciona la raza" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white/95 backdrop-blur-md border-white/50">
                          {commonBreeds.map((breed) => (
                            <SelectItem key={breed} value={breed} className="text-blue-900 font-medium">
                              {breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Edad</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="3" 
                          {...field} 
                          className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium" 
                          min="0"
                          max="30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold text-white transform hover:scale-[1.02] transition-all duration-300 mt-2 shimmer"
                  style={{
                    background: 'linear-gradient(135deg, #E85A4F 0%, #DC143C 100%)',
                    boxShadow: '0 4px 16px rgba(232, 90, 79, 0.3), 0 2px 8px rgba(220, 20, 60, 0.2)'
                  }}
                >
                  Crear Tarjeta Digital
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
