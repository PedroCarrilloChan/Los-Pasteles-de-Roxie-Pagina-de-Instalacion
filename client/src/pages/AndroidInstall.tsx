import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Smartphone, Download } from "lucide-react";

export default function AndroidInstall() {
  const [loyaltyData, setLoyaltyData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [androidLink, setAndroidLink] = useState<string | null>(null);

  useEffect(() => {
    // Obtener datos de lealtad
    fetch('/api/loyalty-data')
      .then(res => res.json())
      .then(data => {
        setLoyaltyData(data);
        setIsDataLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener datos:', err);
        setIsDataLoading(false);
      });
  }, []);

  const generateAndroidLink = async () => {
    if (!loyaltyData?.card?.url) return;

    setIsGeneratingLink(true);

    try {
      const response = await fetch('/api/android-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: loyaltyData.card.url })
      });

      const result = await response.json();

      if (response.ok && result.passwalletLink) {
        setAndroidLink(result.passwalletLink);

        // Enviar URL de instalación
        await fetch('/api/send-install-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: result.passwalletLink })
        });
      } else {
        throw new Error(result.error || 'Error al generar el enlace');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar el enlace de Android. Por favor intenta nuevamente.');
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const downloadCard = () => {
    if (androidLink) {
      window.open(androidLink, '_blank');
    }
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Fondo con efecto glassmorphism sutil */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {/* Elementos decorativos sutiles flotantes */}
          <div className="absolute top-1/4 left-1/5 w-48 h-48 sm:w-64 sm:h-64 rounded-full backdrop-blur-3xl animate-float opacity-15"
               style={{
                 animationDelay: '0s',
                 background: 'radial-gradient(circle, rgba(232, 90, 79, 0.2) 0%, rgba(245, 230, 211, 0.1) 50%, transparent 100%)',
                 filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.1))'
               }}>
          </div>
          <div className="absolute bottom-1/4 right-1/5 w-56 h-56 sm:w-80 sm:h-80 rounded-full backdrop-blur-3xl animate-float opacity-12"
               style={{
                 animationDelay: '1s',
                 background: 'radial-gradient(circle, rgba(220, 20, 60, 0.15) 0%, rgba(210, 105, 30, 0.08) 50%, transparent 100%)',
                 filter: 'drop-shadow(0 12px 24px rgba(139, 69, 19, 0.08))'
               }}>
          </div>

          {/* Capa de difuminado suave */}
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>
        <div className="z-10">
          <Loader2 className="h-8 w-8 animate-spin" style={{color: '#8B4513'}} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      {/* Fondo con efecto glassmorphism sutil */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Elementos decorativos sutiles flotantes */}
        <div className="absolute top-1/4 left-1/5 w-40 h-40 sm:w-64 sm:h-64 rounded-full backdrop-blur-3xl animate-float opacity-15"
             style={{
               animationDelay: '0s',
               background: 'radial-gradient(circle, rgba(232, 90, 79, 0.2) 0%, rgba(245, 230, 211, 0.1) 50%, transparent 100%)',
               filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.1))'
             }}>
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-80 sm:h-80 rounded-full backdrop-blur-3xl animate-float opacity-12"
             style={{
               animationDelay: '1s',
               background: 'radial-gradient(circle, rgba(220, 20, 60, 0.15) 0%, rgba(210, 105, 30, 0.08) 50%, transparent 100%)',
               filter: 'drop-shadow(0 12px 24px rgba(139, 69, 19, 0.08))'
             }}>
        </div>

        {/* Capa de difuminado suave */}
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>

      <Card className="max-w-lg mx-auto shadow-2xl glass-card backdrop-blur-xl relative z-10 rounded-xl sm:rounded-2xl">
        <CardContent className="pt-6 space-y-5 sm:space-y-6 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]"
              style={{color: '#8B4513'}}>
            Bienvenido {loyaltyData?.firstName}
          </h1>

          <div className="text-center space-y-4 sm:space-y-5">
            <div className="flex justify-center">
              <Smartphone className="h-16 w-16 sm:h-20 sm:w-20" style={{color: '#E85A4F'}} />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                  style={{color: '#8B4513'}}>
                Descarga para Android
              </h2>
              <p className="text-sm sm:text-base leading-relaxed"
                 style={{color: '#8B4513', opacity: 0.8}}>
                Haz clic en el botón para generar tu enlace de descarga personalizado para dispositivos Android
              </p>
            </div>

            {!androidLink ? (
              <Button
                onClick={generateAndroidLink}
                disabled={isGeneratingLink}
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-3 transform hover:scale-[1.02] transition-all duration-300 shimmer"
                style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  boxShadow: '0 6px 20px rgba(139, 69, 19, 0.2), 0 3px 10px rgba(160, 82, 45, 0.15)'
                }}
              >
                {isGeneratingLink ? (
                  <>
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                    Generando enlace...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                    Generar enlace de descarga
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16" style={{color: '#E85A4F'}} />
                </div>
                <p className="text-sm sm:text-base font-medium"
                   style={{color: '#8B4513'}}>
                  ¡Enlace generado exitosamente!
                </p>
                <Button
                  onClick={downloadCard}
                  className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-3 transform hover:scale-[1.02] transition-all duration-300 shimmer"
                  style={{
                    background: 'linear-gradient(135deg, #E85A4F 0%, #DC143C 100%)',
                    boxShadow: '0 6px 20px rgba(232, 90, 79, 0.2), 0 3px 10px rgba(220, 20, 60, 0.15)'
                  }}
                >
                  <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                  Descargar Tarjeta de Lealtad
                </Button>
              </div>
            )}

            <div className="text-center p-3 sm:p-4 rounded-lg" 
                 style={{backgroundColor: 'rgba(245, 230, 211, 0.15)'}}>
              <p className="text-xs sm:text-sm" style={{color: '#8B4513', opacity: 0.7}}>
                💡 Se instalará automáticamente en PassWallet o en tu app de billetera preferida
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}