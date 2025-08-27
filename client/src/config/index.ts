export const config = {
  // SmartPasses API Configuration (anteriormente Wallet Club)
  walletClub: {
    programId: import.meta.env.VITE_WALLET_CLUB_PROGRAM_ID || "6249287044562944",
    apiKey: import.meta.env.VITE_WALLET_CLUB_API_KEY || "itiwUSrHCAvxfqFUAzvANPPxSrBDQFvWLyPAWQylWhPAkYYvSCzFhbpcZqBwYKZp",
    baseUrl: "https://pass.smartpasses.io/api/v1",
  },
  // Company branding
  branding: {
    logoUrl: import.meta.env.VITE_COMPANY_LOGO_URL || "https://walletclub.s3.us-east-1.amazonaws.com/Los+Pasteles+de+Roxie+Logo+3d.png", // URL del logo de la empresa
    name: import.meta.env.VITE_COMPANY_NAME || "Los Pasteles de Roxie", // Nombre de la empresa actualizado
    primaryColor: "#E85A4F", // Color coral/rojo pastel del gorro chef
    secondaryColor: "#DC143C", // Rosa intenso del texto Roxie
    tertiaryColor: "#8B4513", // Marrón chocolate del texto principal
    accentColor: "#F5E6D3", // Crema/beige del pelaje
    creamColor: "#F5E6D3", // Color crema principal
    goldenBrown: "#D2691E", // Marrón dorado del rodillo
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