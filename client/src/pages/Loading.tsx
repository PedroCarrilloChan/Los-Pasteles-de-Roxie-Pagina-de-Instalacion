import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { detectDevice } from "@/lib/utils";

export default function Loading() {
  const [, navigate] = useLocation();
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const deviceType = detectDevice();

    const timer = setTimeout(() => {
      // Redirigir según el tipo de dispositivo
      if (deviceType === 'ios') {
        navigate('/iphone-install');
      } else if (deviceType === 'android') {
        navigate('/android-install');
      } else {
        // Si es desktop, mostrar la página de selección
        navigate('/thank-you');
      }
    }, 5000); // 5 segundos

    // Timer de respaldo en caso de que el video no se reproduzca
    const fallbackTimer = setTimeout(() => {
      navigate('/thank-you');
    }, 8000); // 8 segundos máximo

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [navigate]);

  const handleVideoEnd = () => {
    navigate('/thank-you');
  };

  const handleVideoError = () => {
    setVideoError(true);
    // Si hay error con el video, navegar después de 3 segundos
    setTimeout(() => {
      navigate('/thank-you');
    }, 3000);
  };

  if (videoError) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Fondo inmersivo */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-900 via-indigo-700 to-blue-900 overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-blue-400/20 backdrop-blur-3xl animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-1/4 right-1/5 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-indigo-500/20 backdrop-blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>

        {/* Contenido de fallback */}
        <div className="z-10 flex flex-col items-center justify-center px-4 text-center">
          <div className="glass-card p-8 sm:p-10 rounded-2xl shadow-2xl drop-shadow-2xl border border-white/20 backdrop-blur-xl">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
            </div>
            <h2 className="mt-6 text-lg sm:text-xl font-semibold text-white">
              Preparando su experiencia...
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/80">
              Los Pasteles de Roxie
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
      {/* Video de animación */}
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        style={{ maxWidth: '100vw', maxHeight: '100vh' }}
      >
        <source 
          src="https://walletclub.s3.us-east-1.amazonaws.com/Los+pasteles+de+roxie+video.mp4" 
          type="video/mp4" 
        />
        Su navegador no soporta el elemento de video.
      </video>

      {/* Overlay con logo para branding durante el video */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="glass-card px-6 py-3 rounded-full shadow-xl border border-white/20 backdrop-blur-xl">
          <p className="text-white text-sm font-medium">Los Pasteles de Roxie</p>
        </div>
      </div>
    </div>
  );
}