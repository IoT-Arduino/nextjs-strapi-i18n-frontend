import { ReactNode } from 'react'

export type Tr = {
  news: string
  subtitle?: string
  signin?: string
  directory?: string
  hero?: string
  description?: string
  cookies?: string
  button?: string
  about?: string
  newsPickup?: string
  newsList?: string
  science?: string
  research?: string
  search?: string
}

export type PropsLayout = {
  title: string
  keywords?: string
  description?: string
  content?: string
  children: ReactNode
}

export type Localizations = {
    id:number;
    locale:string;
    published_at:string;
}

export type NewsResponse = {
    id:number;
    title:string;
    body:string;
    locale:string;
    published_at:string;
    created_at:string;
    updated_at:string;
    localizations:Localizations[]
}