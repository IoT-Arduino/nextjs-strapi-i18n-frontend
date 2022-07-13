import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

import { PropsLayout } from '../types/type'

const Layout = ({ title, keywords, description, content, children }: PropsLayout) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="desctiption" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header content={content} />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
