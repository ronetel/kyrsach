export const getVerificationTemplate = (code: string): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb;">Подтверждение регистрации</h2>
    <p>Ваш код подтверждения:</p>
    <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">${code}</div>
    <a href="http://localhost:3000/api/auth/verify?code=${code}" 
       style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px;">
      Подтвердить регистрацию
    </a>
  </div>
`;
