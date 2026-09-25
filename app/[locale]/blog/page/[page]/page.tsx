import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { isLocale, locales } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const count = getPostsForLocale(allBlogs, locale).length
    return Array.from({ length: Math.ceil(count / POSTS_PER_PAGE) }, (_, index) => ({
      locale,
      page: String(index + 1),
    }))
  })
}

export default function Page({ params }: { params: { locale: string; page: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const posts = allCoreContent(sortPosts(getPostsForLocale(allBlogs, locale)))
  const pageNumber = Number(params.page)
  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound()
  const start = POSTS_PER_PAGE * (pageNumber - 1)

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts.slice(start, start + POSTS_PER_PAGE)}
      pagination={{ currentPage: pageNumber, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }}
      title="All Posts"
    />
  )
}
