import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useTranslationDetect } from '../hooks/useTranslationDetect'

const About = () => {
  const router = useRouter()
  const { locale } = router

  const t = useTranslationDetect(locale)

  return (
    <Layout title={t.about}>
      <h3>{t.about}</h3>
      <p>{t.description}</p>
    </Layout>
  )
}

export default About
