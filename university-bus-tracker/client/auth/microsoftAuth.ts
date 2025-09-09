// ===== 3. auth/microsoftAuth.ts (Client Helper) =====
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { MICROSOFT_CONFIG } from "./microsoft.config";

const AUTH_STORAGE_KEY = "microsoft_auth_state";

export interface AuthData {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  userInfo: any;
  expiresAt: number;
}

export class MicrosoftAuthService {
  // Store auth data securely
  static async storeAuthData(authData: AuthData): Promise<void> {
    const authString = JSON.stringify(authData);

    if (Platform.OS !== "web") {
      await SecureStore.setItemAsync(AUTH_STORAGE_KEY, authString);
    } else {
      // Less secure but necessary for web
      localStorage.setItem(AUTH_STORAGE_KEY, authString);
    }
  }

  // Load stored authentication
  static async loadStoredAuth(): Promise<AuthData | null> {
    try {
      let storedAuth: string | null;

      if (Platform.OS !== "web") {
        storedAuth = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);
      } else {
        storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      }

      if (!storedAuth) return null;

      const authData: AuthData = JSON.parse(storedAuth);

      // Check if token is still valid (with 5 minute buffer)
      if (
        authData.expiresAt &&
        Date.now() < authData.expiresAt - 5 * 60 * 1000
      ) {
        return authData;
      }

      return null;
    } catch (error) {
      console.error("Error loading stored auth:", error);
      return null;
    }
  }

  // Clear stored auth data
  static async clearAuthData(): Promise<void> {
    try {
      if (Platform.OS !== "web") {
        await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  }

  // Exchange authorization code for tokens (via server)
  static async exchangeCodeForTokens(authCode: string): Promise<AuthData> {
    const response = await fetch(
      `${MICROSOFT_CONFIG.serverUrl}/api/auth/microsoft/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: authCode,
          redirectUri: MICROSOFT_CONFIG.redirectUri,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return response.json();
  }

  // Refresh access token (via server)
  static async refreshAccessToken(refreshToken: string): Promise<AuthData> {
    const response = await fetch(
      `${MICROSOFT_CONFIG.serverUrl}/api/auth/microsoft/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    return response.json();
  }

  // Get CMU basic info using access token
  static async getCMUBasicInfo(accessToken: string): Promise<any> {
    const response = await fetch(MICROSOFT_CONFIG.basicInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get CMU basic info: ${response.status}`);
    }

    return response.json();
  }

  // Validate token and get user info from Microsoft Graph (fallback)
  static async validateAndGetUserInfo(accessToken: string): Promise<any> {
    try {
      // Try CMU API first
      return await this.getCMUBasicInfo(accessToken);
    } catch (error) {
      console.warn("CMU API failed, falling back to Microsoft Graph:", error);
      
      // Fallback to Microsoft Graph
      const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get user info: ${response.status}`);
      }

      return response.json();
    }
  }
}
