import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslationDetect } from '../hooks/useTranslationDetect'
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const router = useRouter();
  const { locale } = router;

  const t = useTranslationDetect(locale)

  return (
    <footer className={styles.footer}>
      <p>Copytight &copy; Next&Strapi i18n Web Site</p>
      <p>
        <Link href="/about">{t.about}</Link>
      </p>
    </footer>
  );
}

export default Footer
