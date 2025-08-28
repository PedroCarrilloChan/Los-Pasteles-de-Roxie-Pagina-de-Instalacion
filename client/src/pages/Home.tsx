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
      {/* Fondo con iconos temáticos que suben */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Fondo base rosado suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 opacity-70"></div>

        {/* Iconos temáticos flotantes que suben */}
        <div className="themed-icons-rising">
          {/* Huesitos para perros */}
          <div className="icon-element" style={{left: '10%', animationDelay: '0s', fontSize: '2rem'}}>🦴</div>
          <div className="icon-element" style={{left: '85%', animationDelay: '2s', fontSize: '1.5rem'}}>🦴</div>
          <div className="icon-element" style={{left: '60%', animationDelay: '4s', fontSize: '2.5rem'}}>🦴</div>
          <div className="icon-element" style={{left: '25%', animationDelay: '6s', fontSize: '1.8rem'}}>🦴</div>
          
          {/* Cupcakes y pasteles */}
          <div className="icon-element" style={{left: '20%', animationDelay: '1s', fontSize: '2.2rem'}}>🧁</div>
          <div className="icon-element" style={{left: '75%', animationDelay: '3s', fontSize: '1.8rem'}}>🧁</div>
          <div className="icon-element" style={{left: '45%', animationDelay: '5s', fontSize: '2rem'}}>🧁</div>
          <div className="icon-element" style={{left: '90%', animationDelay: '7s', fontSize: '1.6rem'}}>🧁</div>
          
          {/* Pasteles grandes */}
          <div className="icon-element" style={{left: '35%', animationDelay: '1.5s', fontSize: '2.5rem'}}>🎂</div>
          <div className="icon-element" style={{left: '70%', animationDelay: '3.5s', fontSize: '2rem'}}>🎂</div>
          <div className="icon-element" style={{left: '15%', animationDelay: '5.5s', fontSize: '2.2rem'}}>🎂</div>
          
          {/* Galletas y donas */}
          <div className="icon-element" style={{left: '55%', animationDelay: '2s', fontSize: '1.8rem'}}>🍪</div>
          <div className="icon-element" style={{left: '80%', animationDelay: '4s', fontSize: '2rem'}}>🍪</div>
          <div className="icon-element" style={{left: '30%', animationDelay: '6s', fontSize: '1.5rem'}}>🍪</div>
          
          <div className="icon-element" style={{left: '40%', animationDelay: '2.5s', fontSize: '2rem'}}>🍩</div>
          <div className="icon-element" style={{left: '65%', animationDelay: '4.5s', fontSize: '1.7rem'}}>🍩</div>
          
          {/* Ingredientes de pastelería */}
          <div className="icon-element" style={{left: '50%', animationDelay: '3s', fontSize: '1.5rem'}}>🥚</div>
          <div className="icon-element" style={{left: '85%', animationDelay: '5s', fontSize: '1.8rem'}}>🥚</div>
          
          <div className="icon-element" style={{left: '25%', animationDelay: '3.5s', fontSize: '1.6rem'}}>🧈</div>
          <div className="icon-element" style={{left: '75%', animationDelay: '5.5s', fontSize: '1.4rem'}}>🧈</div>
          
          {/* Frutas para decorar */}
          <div className="icon-element" style={{left: '15%', animationDelay: '4s', fontSize: '1.5rem'}}>🍓</div>
          <div className="icon-element" style={{left: '60%', animationDelay: '6s', fontSize: '1.7rem'}}>🍓</div>
          <div className="icon-element" style={{left: '90%', animationDelay: '8s', fontSize: '1.4rem'}}>🍓</div>
          
          <div className="icon-element" style={{left: '35%', animationDelay: '4.5s', fontSize: '1.6rem'}}>🍒</div>
          <div className="icon-element" style={{left: '80%', animationDelay: '6.5s', fontSize: '1.5rem'}}>🍒</div>
          
          {/* Utensilios de cocina */}
          <div className="icon-element" style={{left: '45%', animationDelay: '5s', fontSize: '1.8rem'}}>🥄</div>
          <div className="icon-element" style={{left: '70%', animationDelay: '7s', fontSize: '1.6rem'}}>🥄</div>
          
          <div className="icon-element" style={{left: '20%', animationDelay: '5.5s', fontSize: '2rem'}}>🍴</div>
          
          {/* Corazones temáticos */}
          <div className="icon-element" style={{left: '65%', animationDelay: '1s', fontSize: '1.5rem'}}>💕</div>
          <div className="icon-element" style={{left: '30%', animationDelay: '3s', fontSize: '1.3rem'}}>💕</div>
          <div className="icon-element" style={{left: '85%', animationDelay: '5s', fontSize: '1.4rem'}}>💕</div>
        </div>

        {/* Capa de difuminado suave */}
        <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/5"></div>
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
        <Card className="glass-card w-full max-w-md mx-auto border-none shadow-2xl drop-shadow-2xl 
                       transform transition-all duration-300 hover:shadow-3xl backdrop-blur-xl bg-white/15 border border-white/20 
                        rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center p-4 sm:pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold drop-shadow-[0_1px_1px_rgba(245,230,211,0.8)]" 
                       style={{color: '#8B4513'}}>Registro</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:pt-4">
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