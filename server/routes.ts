import type { Express } from "express";
import { createServer, type Server } from "http";
import fetch from "node-fetch";

// Configuración del servidor
const SERVER_CONFIG = {
  walletClub: {
    programId: process.env.WALLET_CLUB_PROGRAM_ID || "6249287044562944",
    apiKey: process.env.WALLET_CLUB_API_KEY || "itiwUSrHCAvxfqFUAzvANPPxSrBDQFvWLyPAWQylWhPAkYYvSCzFhbpcZqBwYKZp",
    baseUrl: "https://pass.smartpasses.io/api/v1",
  },
  externalServices: {
    androidInstallUrl: process.env.ANDROID_INSTALL_URL || "https://android-instalacion-automatica-onlinemidafilia.replit.app/generateLink",
  }
};

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Endpoint para enviar correo
  app.post('/api/send-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Email es requerido' 
      });
    }

    try {
      console.log('Enviando correo a:', email);

      const response = await fetch('https://app.chatgptbuilder.io/api/users/1000044530155158501/custom_fields/596796', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-ACCESS-TOKEN': '1881528.QiiIbJjsWB0G84dpJqY2v4ENJaYBKdVs6HDZZDCXbSzb',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `value=${encodeURIComponent(email)}`
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al enviar el correo' 
      });
    }
  });

  // Endpoint para enviar URL de instalación
  app.post('/api/send-install-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL es requerida' 
      });
    }

    try {
      console.log('Enviando URL de instalación:', url);

      const response = await fetch('https://app.chatgptbuilder.io/api/users/1000044530155158501/custom_fields/255992', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-ACCESS-TOKEN': '1881528.QiiIbJjsWB0G84dpJqY2v4ENJaYBKdVs6HDZZDCXbSzb',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `value=${encodeURIComponent(url)}`
      });

      if (!response.ok) {
        throw new Error('Error al enviar la URL de instalación');
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error al enviar URL:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al enviar la URL' 
      });
    }
  });

  // Endpoint para enviar tipo de dispositivo
  app.post('/api/send-device-type', async (req, res) => {
    const { deviceType } = req.body;

    if (!deviceType) {
      return res.status(400).json({ 
        error: 'Tipo de dispositivo es requerido' 
      });
    }

    try {
      console.log('Enviando tipo de dispositivo:', deviceType);

      const response = await fetch('https://app.chatgptbuilder.io/api/users/1000044530155158501/custom_fields/829951', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-ACCESS-TOKEN': '1881528.QiiIbJjsWB0G84dpJqY2v4ENJaYBKdVs6HDZZDCXbSzb',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `value=${encodeURIComponent(deviceType)}`
      });

      if (!response.ok) {
        throw new Error('Error al enviar el tipo de dispositivo');
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error al enviar tipo de dispositivo:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al enviar el tipo de dispositivo' 
      });
    }
  });

  // Android link generation proxy endpoint with retries
  app.post('/api/android-link', async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL es requerida' 
      });
    }

    // Configuración de reintentos
    const maxRetries = 3;
    let retryCount = 0;
    let lastError = null;

    while (retryCount < maxRetries) {
      try {
        console.log(`Proxy: Intento ${retryCount + 1}/${maxRetries} - Iniciando request a servicio Android con URL:`, url);

        // Usando AbortController para manejar timeout manualmente
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(SERVER_CONFIG.externalServices.androidInstallUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            originalLink: url
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        console.log('Proxy: Status de respuesta:', response.status);

        // Si la respuesta no es exitosa, intentar leer el cuerpo como texto para depuración
        if (!response.ok) {
          let errorText = '';
          try {
            errorText = await response.text();
          } catch (e) {
            errorText = 'No se pudo leer el cuerpo de la respuesta';
          }
          
          console.error('Proxy: Error en respuesta:', errorText);
          throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }

        // Intenta parsear la respuesta como JSON
        let data;
        try {
          data = await response.json();
        } catch (e) {
          console.error('Proxy: Error al parsear respuesta JSON:', e);
          throw new Error('Error al parsear la respuesta del servidor');
        }

        console.log('Proxy: Datos de respuesta:', data);

        // Verificar que la respuesta tenga la estructura esperada
        if (!data || typeof data !== 'object' || !('passwalletLink' in data)) {
          throw new Error('Respuesta del servidor incompleta o malformada');
        }

        return res.json(data);
      } catch (error) {
        console.error(`Proxy: Error en intento ${retryCount + 1}/${maxRetries}:`, error);
        lastError = error;
        
        // Si no es el último intento, esperar antes de reintentar con backoff exponencial
        if (retryCount < maxRetries - 1) {
          const backoffMs = Math.pow(2, retryCount) * 1000;
          console.log(`Proxy: Esperando ${backoffMs}ms antes del siguiente intento...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          retryCount++;
        } else {
          // Último intento fallido, devolver error
          console.error('Proxy: Todos los intentos fallidos');
          return res.status(500).json({ 
            error: lastError instanceof Error ? lastError.message : 'Error al generar link para Android después de múltiples intentos' 
          });
        }
      }
    }
  });
  app.post('/api/register', async (req, res) => {
    try {
      const { firstName, lastName, email, phone } = req.body;

      if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ 
          success: false,
          error: 'Faltan campos requeridos' 
        });
      }

      console.log('Datos de registro:', {
        firstName,
        lastName,
        email,
        phone,
      });

      const requestBody = {
        firstName,
        lastName,
        email,
        phone
      };

      console.log('Request a SmartPasses API:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(
        `${SERVER_CONFIG.walletClub.baseUrl}/loyalty/programs/${SERVER_CONFIG.walletClub.programId}/customers`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': SERVER_CONFIG.walletClub.apiKey
          },
          body: JSON.stringify(requestBody)
        }
      );

      const responseData = await response.json() as {
        errors?: Array<{field: string, reasons: string[]}>,
        message?: string
      };
      console.log('Respuesta de SmartPasses API:', JSON.stringify(responseData, null, 2));

      if (!response.ok) {
        console.error('Error en SmartPasses API:', JSON.stringify(responseData, null, 2));

        // Verificamos que responseData tenga la estructura esperada
        if (responseData && typeof responseData === 'object' && 'errors' in responseData && Array.isArray(responseData.errors)) {
          // Errores específicos para número de teléfono ya registrado
          const hasPhoneTakenError = responseData.errors.some(
            error => error.field === 'phone' && Array.isArray(error.reasons) && error.reasons.includes('Phone number already taken')
          );
          
          if (hasPhoneTakenError) {
            return res.status(400).json({
              success: false,
              error: 'Este número de teléfono ya está registrado'
            });
          }

          // Errores de correo electrónico
          const hasEmailError = responseData.errors.some(
            error => error.field === 'email'
          );
          
          if (hasEmailError) {
            return res.status(400).json({
              success: false,
              error: 'Por favor ingrese un correo electrónico válido'
            });
          }

          // Errores de teléfono
          const hasPhoneError = responseData.errors.some(
            error => error.field === 'phone'
          );
          
          if (hasPhoneError) {
            return res.status(400).json({
              success: false,
              error: 'Por favor ingrese un número de teléfono válido'
            });
          }
        }

        // Error genérico si no podemos determinar el tipo específico
        return res.status(400).json({
          success: false,
          error: responseData && typeof responseData === 'object' && 'message' in responseData 
            ? responseData.message 
            : 'Error en el registro. Por favor intente nuevamente.'
        });
      }

      req.session.loyaltyData = responseData;
      res.json({ success: true });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error en el registro. Por favor intente nuevamente.' 
      });
    }
  });

  app.get('/api/loyalty-data', (req, res) => {
    if (req.session.loyaltyData) {
      res.json(req.session.loyaltyData);
    } else {
      res.status(404).json({ error: 'No se encontraron datos de lealtad' });
    }
  });

  return httpServer;
}