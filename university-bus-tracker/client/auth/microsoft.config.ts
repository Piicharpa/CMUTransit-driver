import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const { makeRedirectUri } = AuthSession;

export const MICROSOFT_CONFIG = {
  // CMU Microsoft OAuth Configuration
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID || "<application id จากหน้า overview>",
  clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET || "<secret ที่ copy ไว้>",
  tenantId: process.env.EXPO_PUBLIC_TENANT_ID || "cf81f1df-de59-4c29-91da-a2dfd04aa751",

  // OAuth URLs
  authUrl: process.env.EXPO_PUBLIC_AUTH_URL || "https://login.microsoftonline.com/cf81f1df-de59-4c29-91da-a2dfd04aa751/oauth2/v2.0/authorize",
  tokenUrl: process.env.EXPO_PUBLIC_TOKEN_URL || "https://login.microsoftonline.com/cf81f1df-de59-4c29-91da-a2dfd04aa751/oauth2/v2.0/token",
  logoutUrl: process.env.EXPO_PUBLIC_LOGOUT_URL || "https://login.microsoftonline.com/cf81f1df-de59-4c29-91da-a2dfd04aa751/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:8080",

  // CMU API Configuration
  basicInfoUrl: process.env.EXPO_PUBLIC_BASICINFO_URL || "https://api.cmu.ac.th/mis/cmuaccount/prod/v3/me/basicinfo",
  callbackUrl: process.env.EXPO_PUBLIC_CALLBACK_URL || "http://localhost:8080/callback.php",

  // Scopes for CMU API
  scopes: [
    "openid",
    "profile",
    "email",
    "api://cmu/Mis.Account.Read.Me.Basicinfo",
    "offline_access"
  ],

  // Redirect URI configuration
  redirectUri: makeRedirectUri({
    scheme: Array.isArray(Constants.expoConfig?.scheme) ? Constants.expoConfig.scheme[0] : Constants.expoConfig?.scheme || "cmu-transport",
    path: "auth",
  }),

  // API endpoints
  serverUrl: process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:3000",
  extPort: process.env.EXPO_PUBLIC_EXT_PORT || "8080",
};
