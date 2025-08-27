import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/lib/validation";
import type { RegistrationData } from "@/lib/validation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { config } from "@/config";
import { detectDevice } from "@/lib/utils";

export default function Home() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }
  });

  async function onSubmit(data: RegistrationData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          phone: data.phone.startsWith('+') ? data.phone : `+${data.phone}`
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error en el registro');
      }

      // Redirigir a la página de carga
      navigate('/loading');

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Error en el registro. Por favor intente nuevamente."
      });
    }
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Fondo inmersivo 3D de pastelería mejorado */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Elementos decorativos de pastelería flotantes con más sombras */}
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full backdrop-blur-3xl animate-float opacity-25"
             style={{
               animationDelay: '0s',
               background: 'radial-gradient(circle, rgba(232, 90, 79, 0.4) 0%, rgba(245, 230, 211, 0.25) 50%, transparent 100%)',
               filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3))'
             }}>
        </div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 rounded-full backdrop-blur-3xl animate-float opacity-20"
             style={{
               animationDelay: '2s',
               background: 'radial-gradient(circle, rgba(220, 20, 60, 0.35) 0%, rgba(210, 105, 30, 0.2) 50%, transparent 100%)',
               filter: 'drop-shadow(0 12px 24px rgba(139, 69, 19, 0.25))'
             }}>
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full backdrop-blur-3xl animate-float opacity-30"
             style={{
               animationDelay: '1s',
               background: 'radial-gradient(circle, rgba(210, 105, 30, 0.4) 0%, rgba(245, 230, 211, 0.25) 50%, transparent 100%)',
               filter: 'drop-shadow(0 10px 20px rgba(139, 69, 19, 0.28))'
             }}>
        </div>

        {/* Elementos temáticos adicionales con sombras */}
        <div className="absolute top-10 right-1/3 w-32 h-32 rounded-full backdrop-blur-2xl animate-float opacity-35"
             style={{
               animationDelay: '3s',
               background: 'radial-gradient(circle, rgba(245, 230, 211, 0.5) 0%, transparent 70%)',
               filter: 'drop-shadow(0 6px 12px rgba(139, 69, 19, 0.2))'
             }}>
        </div>
        <div className="absolute bottom-20 right-1/5 w-48 h-48 rounded-full backdrop-blur-2xl animate-float opacity-25"
             style={{
               animationDelay: '4s',
               background: 'radial-gradient(circle, rgba(232, 90, 79, 0.3) 0%, transparent 70%)',
               filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.22))'
             }}>
        </div>

        {/* Nueva capa de elementos temáticos */}
        <div className="bakery-elements"></div>

        {/* Efecto de partículas de harina */}
        <div className="flour-particles"></div>

        {/* Capa de difuminado suave */}
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>

      {/* Header con logo y título - Mejorado para responsividad */}
      <div className="relative z-10 w-full overflow-hidden py-6 sm:py-8 md:pt-12 md:pb-8">
        <div className="container mx-auto flex flex-col items-center justify-center px-4">
          {/* Logo con sombra mejorada - Tamaño adaptativo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full glass-card p-2 animate-float mb-4 sm:mb-6 md:mb-8"
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

          {/* Título con tipografía mejorada - Responsivo */}
          <div className="text-center space-y-2 sm:space-y-4 w-full max-w-4xl px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#8B4513'}}>Los Pasteles</span>{" "}
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#DC143C'}}>de</span>{" "}
              <span className="block sm:inline drop-shadow-[0_3px_3px_rgba(139,69,19,0.4)]" 
                    style={{color: '#E85A4F'}}>Roxie</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_2px_rgba(139,69,19,0.3)] font-medium"
               style={{color: '#8B4513'}}>
              Únete a nuestro programa de lealtad y disfruta de deliciosos pasteles, beneficios exclusivos y ofertas especiales
            </p>
          </div>
        </div>
      </div>

      {/* Formulario con efecto glassmorphism - Mejorado para responsividad */}
      <div className="relative z-10 flex-1 container max-w-lg mx-auto px-4 py-6 sm:py-8">
        <Card className="glass-card w-full backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl 
                        transform hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center p-4 sm:pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold drop-shadow-[0_1px_1px_rgba(245,230,211,0.8)]" 
                       style={{color: '#8B4513'}}>Registro</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan" {...field} className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Pérez" {...field} className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="juan@ejemplo.com"
                          {...field}
                          className="h-10 sm:h-11 bg-white/40 backdrop-blur-md shadow-sm text-blue-900 font-medium"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm font-medium text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-white text-sm sm:text-base">Número de Teléfono</FormLabel>
                      <FormControl>
                        <PhoneInput
                          country={'mx'}
                          preferredCountries={['mx', 'us']}
                          enableSearch={true}
                          value={value}
                          onChange={(phone) => onChange(`+${phone}`)}
                          inputClass="w-full p-2 rounded-md border border-white/30 bg-white/40 backdrop-blur-md text-blue-900 font-medium h-10 sm:h-11 shadow-sm"
                          containerClass="phone-input"
                          {...field}
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
                  Registrarse
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}