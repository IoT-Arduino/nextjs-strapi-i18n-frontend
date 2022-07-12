import en from './../locales/en'
import jp from './../locales/jp'
import cn from './../locales/cn'

import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'

import { Tr } from '../types/type'

export default function Header({ content }) {
  const router = useRouter()
  const { locale } = router

  let t: Tr

  if (locale === 'en-US') {
    t = en
  } else if (locale === 'zh-CN') {
    t = cn
  } else {
    t = jp
  }

  const changeLanguage = (e: { target: { value: string } }) => {
    const locale = e.target.value

    if (!content) {
      router.push(`${router.asPath}`, `${router.asPath}`, { locale })
    } else {
      let targetId = undefined
      const fileterdData = content.localizations.filter((item: { locale: string }) => {
        return item.locale !== 'en' ? item.locale === locale : locale === 'en-US'
      })
      targetId = fileterdData[0].id

      if (locale === 'en-US') {
        router.push(`/news/${targetId}`, `/news/${targetId}`, { locale })
      } else if (locale === 'zh-CN') {
        router.push(`/news/${targetId}`, `/news/${targetId}`, { locale })
      } else {
        router.push(`/news/${targetId}`, `/news/${targetId}`, { locale })
      }
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>TopPage</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/news">
              <a>{t.news}</a>
            </Link>
          </li>
          <li>
            <select onChange={changeLanguage} defaultValue={locale}>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
              <option value="zh-CN">Chinese</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  )
}
