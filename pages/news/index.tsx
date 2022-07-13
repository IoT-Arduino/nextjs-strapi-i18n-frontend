import { API_URL } from '../../config/index'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/Home.module.css'

import { useTranslationDetect } from '../../hooks/useTranslationDetect'
import { NewsResponse } from '../../types/type'
import { Key } from 'react'

const News = ({ content }) => {
  const router = useRouter()
  const { locale } = router

  const t = useTranslationDetect(locale)

  return (
    <Layout title="News Index Page">
      <main className={styles.main}>
        <h1>{t.newsList}</h1>

        {content.map((item: { id: number; title: string }, i: Key) => {
          return (
            <Link key={i} href={`/news/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          )
        })}
      </main>
    </Layout>
  )
}

export default News

export const getServerSideProps = async (context: { locale: string }) => {
  const { locale } = context

  const initialRes = await fetch(`${API_URL}/pages`)
  const initial = await initialRes.json()

  // initial -> get localizasions.id for each language
  // run loop function and get each article title
  // return
  // ref) Promise.all and　Array.map - async/await https://suzukalight.com/snippet/posts/2020-12-30-map-async

  let translation: NewsResponse[] = []

  if (locale !== 'ja-JP') {
    let localeNum = +0
    if (locale === 'en-US') {
      localeNum = +0
    } else if (locale === 'zh-CN') {
      localeNum = 1
    }

    const translationId = initial.map((item: NewsResponse) => {
      return item.localizations[localeNum].id
    })

    await Promise.all(
      translationId.map(async (item: number) => {
        const translationRes = await fetch(`${API_URL}/pages/${item}`)
        const translationData = await translationRes.json()
        translation = [...translation, translationData]

        return translation
      })
    )
  }

  return {
    props: {
      content: translation.length > 0 ? translation : initial
    }
  }
}
