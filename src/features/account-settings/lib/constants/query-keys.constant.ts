export const accountSettingsKeys = {
  all: ["account-settings"] as const,
  profile: () => [...accountSettingsKeys.all, "profile"] as const,
} as const
