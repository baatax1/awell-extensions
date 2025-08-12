import { type Extension } from '@awell-health/extensions-core'
import { AuthorType, Category } from '@awell-health/extensions-core'
import { actions } from './actions'
import { settings } from './settings'
import { webhooks } from './webhooks'

export const bland: Extension = {
  key: 'bland',
  title: 'Bland.ai',
  icon_url:
    'https://media.licdn.com/dms/image/v2/D560BAQE-b-C6pJqcpw/company-logo_200_200/company-logo_200_200/0/1736593343328/bland_ai_logo?e=2147483647&v=beta&t=wAH3FJTHXF342oCjj4I7nJzuIdUH9mglNQYx8lx6g-c',
  description: 'Automate your phone calls with AI',
  category: Category.COMMUNICATION,
  author: {
    authorType: AuthorType.AWELL,
  },
  actions,
  settings,
  webhooks,
}
