import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'familyquest.app',
  appName: 'FamilyQuest',
  webDir: ".output/public",
  server: {
    androidScheme: 'https',
  },
}

export default config
