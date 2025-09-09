export default {
  expo: {
    name: "CMU Transport System",
    slug: "cmu-transport",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/person.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cmu.transport",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.cmu.transport",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    scheme: "cmu-transport",
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "9fa0c4c3-d908-4b03-a5c4-be4b3951bbe8", // 👈 เพิ่มตรงนี้
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID,
      EXPO_PUBLIC_SCOPE: process.env.EXPO_PUBLIC_SCOPE,
    },
  },
};
