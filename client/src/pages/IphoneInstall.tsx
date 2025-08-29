import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { loyaltyApi } from "@/lib/api";
import { Loader2, ChevronRight, ScanLine, Send } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function IphoneInstall() {
  const { toast } = useToast();
  const [modifiedUrl, setModifiedUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [email, setEmail] = useState<string>("");

  const { data: loyaltyData, isLoading: isDataLoading } = useQuery({
    queryKey: ["/api/loyalty-data"],
    queryFn: loyaltyApi.getLoyaltyData,
    retry: false
  });

  useEffect(() => {
    if (loyaltyData?.email) {
      setEmail(loyaltyData.email);
    }
  }, [loyaltyData?.email]);

  const handleSendEmail = async () => {
    if (!email || !modifiedUrl) return;

    setIsSendingEmail(true);
    try {
      // Primer request: enviar correo
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!emailResponse.ok) {
        throw new Error('Error al enviar el correo');
      }

      // Esperar 3 segundos
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Segundo request: enviar URL de instalación
      const urlResponse = await fetch('/api/send-install-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: modifiedUrl })
      });

      if (!urlResponse.ok) {
        throw new Error('Error al enviar la URL de instalación');
      }

      // Tercer request: enviar tipo de dispositivo
      const deviceResponse = await fetch('/api/send-device-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deviceType: 'iPhone' })
      });

      if (!deviceResponse.ok) {
        throw new Error('Error al enviar el tipo de dispositivo');
      }

      setEmailSent(true);
      toast({
        title: "Correo enviado",
        description: "Las instrucciones han sido enviadas a tu correo electrónico.",
      });
    } catch (error) {
      console.error('Error en el envío de correo:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el correo. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const processUrl = async () => {
    console.log('Datos de loyalty recibidos:', loyaltyData);
    
    if (loyaltyData?.card?.url) {
      setIsProcessing(true);
      setError(null);
      try {
        console.log('Processing URL for card:', loyaltyData.card.url);
        const newUrl = await loyaltyApi.getModifiedUrl(loyaltyData.card.url);
        setModifiedUrl(newUrl);
      } catch (error) {
        console.error('Failed to process URL:', error);
        const errorMessage = error instanceof Error ? error.message : "Error al procesar la URL de instalación";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  useEffect(() => {
    processUrl();
  }, [loyaltyData, toast]);

  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #DC143C 0%, #E85A4F 50%, #F5E6D3 100%)' }}>
        <div className="z-10">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6" style={{ background: 'linear-gradient(135deg, #DC143C 0%, #E85A4F 50%, #F5E6D3 100%)' }}>
      {/* Logo flotante en la esquina superior */}
      <div className="fixed top-4 left-4 z-50">
        <div className="glass-card w-12 h-12 sm:w-16 sm:h-16 rounded-full floating-logo shadow-lg">
          <img 
            src="https://walletclub.s3.us-east-1.amazonaws.com/Los+Pasteles+de+Roxie+Logo+3d.png"
            alt="Los Pasteles de Roxie" 
            className="rounded-full"
          />
        </div>
      </div>

      {/* Tarjeta principal con glassmorphism mejorado */}
      <Card className="glass-card w-full max-w-md mx-auto border-none shadow-2xl drop-shadow-2xl 
                     transform transition-all duration-300 hover:shadow-3xl">
        <CardContent className="pt-6 space-y-5 sm:space-y-6 p-4 sm:p-6">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              Bienvenido {loyaltyData?.firstName}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-yellow-100 drop-shadow-md">
              Los Pasteles de Roxie
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-lg space-y-4 sm:space-y-6 border border-white/30 shadow-lg">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-base sm:text-lg font-bold flex items-center text-red-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm shadow-md">1</span>
                  Primer Paso
                </h2>
                <p className="text-sm sm:text-base text-red-700 bg-white/40 p-2 rounded-md shadow-sm font-medium">
                  Toca el botón "Obtener mi tarjeta" para abrir la tarjeta:
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-2">
                <h2 className="text-base sm:text-lg font-bold flex items-center text-red-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm shadow-md">2</span>
                  Segundo Paso
                </h2>
                <p className="text-sm sm:text-base text-red-700 bg-white/40 p-2 rounded-md shadow-sm font-medium">
                  Luego, toca el botón "Añadir" como se muestra:
                </p>
                <div className="bg-white/5 backdrop-blur-sm p-1 rounded-lg">
                  <img
                    src="https://walletclub.s3.us-east-1.amazonaws.com/Copy+of+AiBotBuilds+click+instalacion.png"
                    alt="Paso 2 instalación iPhone"
                    className="rounded-lg mx-auto max-w-[260px] sm:max-w-[320px] shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-center text-sm sm:text-base text-white font-medium">
              ¡Toca el botón para comenzar! 👇
            </p>

            {error ? (
              <div className="space-y-4">
                <p className="text-sm text-red-300 text-center px-4 bg-red-500/10 py-2 rounded-md backdrop-blur-sm">
                  {error}
                </p>
                <Button 
                  className="w-full h-11 sm:h-12 text-base bg-gradient-to-r from-red-500 to-pink-600 
                            text-white font-medium transition-all duration-300 hover:shadow-lg"
                  onClick={() => processUrl()}
                >
                  Intentar nuevamente
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  className="w-full h-11 sm:h-12 text-base bg-gradient-to-r from-red-500 to-pink-600 
                            text-white font-medium transition-all duration-300 hover:shadow-lg"
                  disabled={isProcessing || !modifiedUrl}
                  onClick={() => modifiedUrl && window.open(modifiedUrl, '_blank')}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Obtener mi tarjeta
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {modifiedUrl && (
                  <div className="relative flex flex-col items-center space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="animate-bounce">
                        <ScanLine className="h-7 w-7 sm:h-8 sm:w-8 text-blue-300" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-center text-yellow-100 drop-shadow-md">
                      ¡También puedes escanear este código QR con tu iPhone!
                    </p>
                    <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                      <QRCodeSVG 
                        value={modifiedUrl}
                        size={160}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </div>
                )}

                {/* Sección de envío por correo */}
                <div className="border-t border-white/10 pt-5 sm:pt-6 mt-6 sm:mt-8">
                  <p className="text-xs sm:text-sm text-center text-white/80 mb-3 sm:mb-4">
                    ¿Prefieres recibir las instrucciones por correo electrónico?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" correo@ejemplo.com"
                      className="h-10 sm:h-11 bg-white/30 backdrop-blur-md text-gray-800 border-white/30 shadow-sm"
                    />
                    <Button
                      onClick={handleSendEmail}
                      disabled={isSendingEmail || !email || !modifiedUrl}
                      className="h-10 sm:h-11 min-w-[90px] sm:min-w-[100px] text-sm sm:text-base
                                bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    >
                      {isSendingEmail ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar
                        </>
                      )}
                    </Button>
                  </div>
                  {emailSent && (
                    <p className="text-xs sm:text-sm text-green-300 mt-2 text-center p-2 bg-green-500/10 rounded-md backdrop-blur-sm">
                      ✅ Correo enviado con éxito. Por favor, revisa tu bandeja de entrada o la carpeta de spam si no lo encuentras.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}