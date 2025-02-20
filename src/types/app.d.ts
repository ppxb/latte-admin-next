declare namespace App{
    type LoginType = 'account' | 'phone' | 'email' | 'forget-pass'

    interface SiteConfig {
      SITE_FAVICON: string
      SITE_LOGO: string
      SITE_TITLE: string
      SITE_COPYRIGHT: string
      SITE_BEIAN: string
    }

    interface DictItem {
      disabled?: boolean
      extra?: string
      label: string
      value: string
    }
}
