import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from '../Main'
import { isLocale } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'
import { notFound } from 'next/navigation'

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const posts = allCoreContent(sortPosts(getPostsForLocale(allBlogs, locale)))
  return <Main posts={posts} />
}
