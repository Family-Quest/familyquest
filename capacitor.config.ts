import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'familyquest.app',
  appName: 'FamilyQuest',
  webDir: ".output/public",
  server: {
    androidScheme: 'https',
    url: 'http://172.20.10.4:3000',
    cleartext: true,
  },
}

export default config
