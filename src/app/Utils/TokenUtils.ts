import { jwtDecode, JwtPayload } from "jwt-decode";
interface DecodedToken extends JwtPayload {
    Role: string;
    Id: string;
    Name: string;
  }
export const tokenUtils = {
    getDecodedToken: (): DecodedToken | null => {
        if (typeof window === "undefined") return null;
    
        const token = localStorage.getItem("token");
        if (!token) return null;
    
        try {
          return jwtDecode<DecodedToken>(token);
        } catch (error) {
          console.error("Error decoding token:", error);
          return null;
        }
      },
    getUserRole: (): string | null => {
        return tokenUtils.getDecodedToken()?.Role || null;
      },
};
