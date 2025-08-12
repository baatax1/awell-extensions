import { type Extension } from '@awell-health/extensions-core'
import { AuthorType, Category } from '@awell-health/extensions-core'
import { actions } from './actions'
import { settings } from './settings'
import { webhooks } from './webhooks'

export const bland: Extension = {
  key: 'bland',
  title: 'Bland.ai',
  icon_url:
    'https://res.cloudinary.com/dbhuqasw0/image/upload/v1754994275/bland_ai_logo_eje5b9.jpg',
  description: 'Automate your phone calls with AI',
  category: Category.COMMUNICATION,
  author: {
    authorType: AuthorType.AWELL,
  },
  actions,
  settings,
  webhooks,
}
