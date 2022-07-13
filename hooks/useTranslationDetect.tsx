import en from '../locales/en'
import jp from '../locales/jp'
import cn from '../locales/cn'

import { Tr } from '../types/type'
export const useTranslationDetect = (locale: string) => {
  let t: Tr

  if (locale === 'en-US') {
    t = en
  } else if (locale === 'zh-CN') {
    t = cn
  } else {
    t = jp
  }

  return t
}
