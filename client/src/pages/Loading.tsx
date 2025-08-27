
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { detectDevice } from "@/lib/utils";

export default function Loading() {
  const [, navigate] = useLocation();
  const [showVideo, setShowVideo] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const deviceType = detectDevice();

    // Después de que termine el video (aproximadamente 8 segundos), mostrar loader por 2 segundos más
    const videoTimer = setTimeout(() => {
      setShowVideo(false);
      setShowLoader(true);
      
      // Después del loader, redirigir según el dispositivo
      const redirectTimer = setTimeout(() => {
        if (deviceType === 'ios') {
          navigate('/iphone-install');
        } else if (deviceType === 'android') {
          navigate('/android-install');
        } else {
          navigate('/thank-you');
        }
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }, 8000); // 8 segundos para el video

    return () => clearTimeout(videoTimer);
  }, [navigate]);

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowLoader(true);
    
    const deviceType = detectDevice();
    
    // Después de que termine el video, esperar 2 segundos más y redirigir
    setTimeout(() => {
      if (deviceType === 'ios') {
        navigate('/iphone-install');
      } else if (deviceType === 'android') {
        navigate('/android-install');
      } else {
        navigate('/thank-you');
      }
    }, 2000);
  };

  if (showVideo) {
    return (
      <div className="min-h-screen w-full relative flex flex-col">
        {/* Fondo inmersivo sutil de pastelería */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {/* Elementos decorativos sutiles flotantes */}
          <div className="absolute top-1/4 left-1/5 w-48 h-48 sm:w-64 sm:h-64 rounded-full backdrop-blur-3xl animate-float opacity-15"
               style={{
                 animationDelay: '0s',
                 background: 'radial-gradient(circle, rgba(232, 90, 79, 0.2) 0%, rgba(245, 230, 211, 0.1) 50%, transparent 100%)',
                 filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.1))'
               }}>
          </div>
          <div className="absolute top-2/3 right-1/4 w-56 h-56 sm:w-80 sm:h-80 rounded-full backdrop-blur-3xl animate-float opacity-12"
               style={{
                 animationDelay: '2s',
                 background: 'radial-gradient(circle, rgba(220, 20, 60, 0.15) 0%, rgba(210, 105, 30, 0.08) 50%, transparent 100%)',
                 filter: 'drop-shadow(0 12px 24px rgba(139, 69, 19, 0.08))'
               }}>
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 sm:w-72 sm:h-72 rounded-full backdrop-blur-3xl animate-float opacity-18"
               style={{
                 animationDelay: '1s',
                 background: 'radial-gradient(circle, rgba(210, 105, 30, 0.2) 0%, rgba(245, 230, 211, 0.1) 50%, transparent 100%)',
                 filter: 'drop-shadow(0 10px 20px rgba(139, 69, 19, 0.12))'
               }}>
          </div>
        </div>

        {/* Container del video centrado */}
        <div className="video-container">
          <video
            autoPlay
            muted
            onEnded={handleVideoEnd}
            className="rounded-3xl shadow-2xl"
            style={{
              maxWidth: '85%',
              maxHeight: '85%',
              boxShadow: '0 30px 70px rgba(139, 69, 19, 0.3), 0 15px 35px rgba(232, 90, 79, 0.2)'
            }}
          >
            <source src="https://walletclub.s3.us-east-1.amazonaws.com/Los+pasteles+de+roxie+video.mp4" type="video/mp4" />
            Su navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    );
  }

  if (showLoader) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
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

        {/* Contenido centrado */}
        <div className="z-10 flex flex-col items-center justify-center px-4 text-center">
          {/* Tarjeta con efecto glassmorphism */}
          <div className="glass-card p-8 sm:p-10 rounded-2xl backdrop-blur-xl">
            {/* Icono de carga */}
            <div className="transform transition-all duration-500 hover:scale-105">
              <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin drop-shadow-lg" 
                       style={{color: '#8B4513'}} />
            </div>
            
            {/* Mensajes */}
            <h2 className="mt-6 text-lg sm:text-xl font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                style={{color: '#8B4513'}}>
              Por favor espere un momento...
            </h2>
            <p className="mt-2 text-sm sm:text-base drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
               style={{color: '#8B4513', opacity: 0.8}}>
              Estamos preparando todo para usted
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
