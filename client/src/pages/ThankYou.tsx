
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, CheckCircle } from "lucide-react";
import { config } from "@/config";
import { detectDevice } from "@/lib/utils";

export default function ThankYou() {
  const [loyaltyData, setLoyaltyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceType, setDeviceType] = useState<string>('desktop');

  useEffect(() => {
    const type = detectDevice();
    setDeviceType(type);

    // Obtener datos de lealtad
    fetch('/api/loyalty-data')
      .then(res => res.json())
      .then(data => {
        setLoyaltyData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener datos:', err);
        setIsLoading(false);
      });
  }, []);

  const sendDeviceType = async (type: string) => {
    try {
      await fetch('/api/send-device-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceType: type })
      });
    } catch (error) {
      console.error('Error enviando tipo de dispositivo:', error);
    }
  };

  const downloadForAndroid = () => {
    if (loyaltyData?.card?.url) {
      sendDeviceType('android');
      window.location.href = '/android-install';
    }
  };

  const downloadForIPhone = () => {
    if (loyaltyData?.card?.url) {
      sendDeviceType('iphone');
      window.location.href = '/iphone-install';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#8B4513'}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con efecto de vidrio sutil - Mejorado para responsividad */}
      <div className="h-[30vh] sm:h-[35vh] md:h-[40vh] w-full relative overflow-hidden">
        {/* Fondo con elementos decorativos sutiles de pastelería */}
        <div className="absolute inset-0">
          {/* Elementos decorativos temáticos sutiles - Tamaños adaptables */}
          <div className="absolute top-10 left-1/4 w-28 h-28 sm:w-40 sm:h-40 rounded-full backdrop-blur-3xl animate-float opacity-15" 
               style={{
                 animationDelay: '0.5s',
                 background: 'radial-gradient(circle, rgba(232, 90, 79, 0.12) 0%, transparent 70%)',
                 filter: 'drop-shadow(0 6px 12px rgba(139, 69, 19, 0.08))'
               }}>
          </div>
          <div className="absolute bottom-10 sm:bottom-20 right-1/5 w-36 h-36 sm:w-56 sm:h-56 rounded-full backdrop-blur-3xl animate-float opacity-12" 
               style={{
                 animationDelay: '1.2s',
                 background: 'radial-gradient(circle, rgba(220, 20, 60, 0.1) 0%, transparent 70%)',
                 filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.06))'
               }}>
          </div>
        </div>
        
        {/* Contenido del header centrado */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          {/* Logo con sombra suave */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full glass-card p-1 sm:p-2 animate-float mb-4 sm:mb-6"
               style={{
                 boxShadow: '0 15px 30px rgba(139, 69, 19, 0.15), 0 8px 20px rgba(232, 90, 79, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                 filter: 'drop-shadow(0 6px 15px rgba(139, 69, 19, 0.12))'
               }}>
            <img
              src={config.branding.logoUrl || "https://via.placeholder.com/200"}
              alt={config.branding.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Mensaje de éxito */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-[0_2px_4px_rgba(139,69,19,0.2)]"
                style={{color: '#8B4513'}}>
              ¡Registro Exitoso!
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto drop-shadow-[0_1px_2px_rgba(139,69,19,0.15)]"
               style={{color: '#8B4513', opacity: 0.9}}>
              Bienvenido {loyaltyData?.firstName}, ahora descarga tu tarjeta de lealtad
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal - Mejorado para responsividad */}
      <div className="flex-1 relative z-10 container max-w-lg mx-auto px-4 py-6 sm:py-8 -mt-8 sm:-mt-12">
        <Card className="glass-card w-full backdrop-blur-xl transform hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12" style={{color: '#E85A4F'}} />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                       style={{color: '#8B4513'}}>
              Descarga tu Tarjeta de Lealtad
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            <p className="text-center text-sm sm:text-base leading-relaxed"
               style={{color: '#8B4513', opacity: 0.8}}>
              Selecciona tu dispositivo para descargar e instalar tu tarjeta de lealtad digital
            </p>

            {/* Botones de descarga */}
            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={downloadForIPhone}
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-3 transform hover:scale-[1.02] transition-all duration-300 shimmer"
                style={{
                  background: 'linear-gradient(135deg, #E85A4F 0%, #DC143C 100%)',
                  boxShadow: '0 6px 20px rgba(232, 90, 79, 0.2), 0 3px 10px rgba(220, 20, 60, 0.15)'
                }}
              >
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                Descargar para iPhone
              </Button>

              <Button
                onClick={downloadForAndroid}
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-3 transform hover:scale-[1.02] transition-all duration-300 shimmer"
                style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  boxShadow: '0 6px 20px rgba(139, 69, 19, 0.2), 0 3px 10px rgba(160, 82, 45, 0.15)'
                }}
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                Descargar para Android
              </Button>
            </div>

            {/* Información adicional */}
            <div className="text-center p-3 sm:p-4 rounded-lg" 
                 style={{backgroundColor: 'rgba(245, 230, 211, 0.15)'}}>
              <p className="text-xs sm:text-sm" style={{color: '#8B4513', opacity: 0.7}}>
                💡 Tu tarjeta se guardará automáticamente en tu billetera digital
              </p>
            </div>

            {config.branding.bottomImageUrl && (
              <div className="mt-4 sm:mt-6 md:mt-8">
                <div className="p-1 rounded-lg sm:rounded-xl" 
                     style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                  <img
                    src={config.branding.bottomImageUrl}
                    alt="Imagen promocional"
                    className="max-w-full mx-auto rounded-md sm:rounded-lg shadow-inner"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
