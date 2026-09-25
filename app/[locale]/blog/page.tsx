import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export default function BlogPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const posts = allCoreContent(sortPosts(getPostsForLocale(allBlogs, locale)))
  const pagination = { currentPage: 1, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts.slice(0, POSTS_PER_PAGE)}
      pagination={pagination}
      title="All Posts"
    />
  )
}
