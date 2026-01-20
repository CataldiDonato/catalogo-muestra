/**
 * Formatea números como moneda (soporta USD y ARS)
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0, // Generalmente para montos grandes en ARS no queremos decimales
  }).format(price);
};

/**
 * Valida email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Extrae token del localStorage
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Extrae usuario del localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Limpia datos de autenticación
 */
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
