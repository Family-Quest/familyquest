import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'familyquest.app',
  appName: 'FamilyQuest',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
