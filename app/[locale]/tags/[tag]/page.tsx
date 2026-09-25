import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { isLocale, locales } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const tags = new Set(
      getPostsForLocale(allBlogs, locale).flatMap((post) =>
        (post.tags || []).map((tag) => slug(tag))
      )
    )
    return [...tags].map((tag) => ({ locale, tag: encodeURI(tag) }))
  })
}

export default function TagPage({ params }: { params: { locale: string; tag: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const posts = allCoreContent(
    sortPosts(
      getPostsForLocale(allBlogs, locale).filter((post) =>
        post.tags?.some((postTag) => slug(postTag) === tag)
      )
    )
  )
  return <ListLayout posts={posts} title={title} />
}
