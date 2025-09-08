// // src/utils/auth.ts
// import jwtDecode from "jwt-decode";

// interface DecodedToken {
//   exp: number; // waktu expired (dalam detik UNIX)
//   [key: string]: unknown;
// }

// const TOKEN_KEY = "token";

// export function setToken(token: string) {
//   localStorage.setItem(TOKEN_KEY, token);
// }

// export function getToken(): string | null {
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function removeToken() {
//   localStorage.removeItem(TOKEN_KEY);
// }

// export function isTokenExpired(token: string): boolean {
//   try {
//     const decoded: DecodedToken = jwtDecode(token);
//     if (!decoded.exp) return true;

//     const now = Date.now() / 1000; // detik
//     return decoded.exp < now;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     return true;
//   }
// }

// export function getUserFromToken(token: string) {
//   try {
//     const decoded: DecodedToken = jwtDecode(token);
//     return decoded;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     return null;
//   }
// }
