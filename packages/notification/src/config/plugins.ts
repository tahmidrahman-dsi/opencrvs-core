import * as Good from 'good'
import * as JWT from 'hapi-auth-jwt2'
import * as HapiI18n from 'hapi-i18n'
import {
  getAvailableLanguages,
  getDefaultLanguage
} from '@notification/i18n/utils'

export default function getPlugins() {
  const plugins: any[] = [
    JWT,
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [
                {
                  log: '*',
                  response: '*',
                  request: '*',
                  error: '*'
                }
              ]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    },
    {
      plugin: HapiI18n,
      options: {
        locales: getAvailableLanguages(),
        directory: __dirname + '/../i18n/locales',
        defaultLocale: getDefaultLanguage(),
        languageHeaderField: 'language'
      }
    }
  ]

  return plugins
}
