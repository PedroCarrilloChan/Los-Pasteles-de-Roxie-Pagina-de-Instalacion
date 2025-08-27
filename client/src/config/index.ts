export const config = {
  // SmartPasses API Configuration (anteriormente Wallet Club)
  walletClub: {
    programId: import.meta.env.VITE_WALLET_CLUB_PROGRAM_ID || "6249287044562944",
    apiKey: import.meta.env.VITE_WALLET_CLUB_API_KEY || "itiwUSrHCAvxfqFUAzvANPPxSrBDQFvWLyPAWQylWhPAkYYvSCzFhbpcZqBwYKZp",
    baseUrl: "https://pass.smartpasses.io/api/v1",
  },
  // Company branding
  branding: {
    logoUrl: import.meta.env.VITE_COMPANY_LOGO_URL || "https://walletclub.s3.us-east-1.amazonaws.com/logoSmartPasses.jpg", // URL del logo de la empresa
    name: import.meta.env.VITE_COMPANY_NAME || "Los Pasteles de Roxie", // Nombre de la empresa actualizado
    primaryColor: "hsl(328 100% 50%)", // Color primario (rosa vibrante)
    secondaryColor: "hsl(340 82% 52%)", // Color secundario (rosa más profundo)
    tertiaryColor: "hsl(320 60% 35%)", // Color terciario (rosa oscuro)
    accentColor: "hsl(45 100% 80%)", // Color de acento (crema/amarillo suave)
    heroUrl: import.meta.env.VITE_HERO_IMAGE_URL, // URL de la imagen de fondo del hero
    bottomImageUrl: import.meta.env.VITE_BOTTOM_IMAGE_URL, // URL de la imagen inferior
  },
  // External services
  externalServices: {
    androidInstallUrl: import.meta.env.VITE_ANDROID_INSTALL_URL || "https://linkandroid.smartpasses.io/generateLink",
  },
  // API endpoints
  api: {
    register: "/api/register",
    loyaltyData: "/api/loyalty-data",
    androidLink: "/api/android-link",
  }
};

// Tipos para TypeScript
export type Config = typeof config;