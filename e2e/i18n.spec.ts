import { test, chromium, expect } from '@playwright/test'

const localeList = [
  {
    locale: 'en-US',
    language:'English',
    textMain:'Multilingual Site',
    textHeader:'News',
    textFooter:'About Us',
    textNews:'News List'
  },
  {
    locale: 'ja-JP',
    language:'Japanese',
    textMain:'多言語',
    textHeader:'ニュース',
    textFooter:'私たちについて',
    textNews:'ニュース一覧'
  },
  {
    locale: 'zh-CN',
    language:'Chinese',
    textMain:'多语言网站',
    textHeader:'新闻',
    textFooter:'关于我们',
    textNews:'新闻列表'
  }
]

test.describe('Multilingual SiteTest', () => {
  localeList.forEach((item) => {
    test(`Page should be displayed in ${item.language} if the locale is ${item.locale}`, async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: item.locale
      })
      const page = await context.newPage()
      await page.goto('http://localhost:3000')
      const main = page.locator('main')
      const header = page.locator('header')
      const footer = page.locator('footer')
      expect(main).toHaveText(`${item.textMain}`)
      expect(header).toHaveText(`${item.textHeader}`)
      expect(footer).toHaveText(`${item.textFooter}`)

      await page.goto('http://localhost:3000/news')
      const mainNews = page.locator('main')
      expect(mainNews).toHaveText(`${item.textNews}`)
    })
  })
})
