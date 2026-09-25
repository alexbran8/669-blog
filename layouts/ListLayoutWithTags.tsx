/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl'
import TagLabel from '@/components/TagLabel'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tagSourcePosts?: CoreContent<Blog>[]
  tagTitle?: string
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.replace(/\/page\/\d+\/?$/, '').replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            <FormattedMessage id="list.previous" defaultMessage="Previous" />
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? basePath : `${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            <FormattedMessage id="list.previous" defaultMessage="Previous" />
          </Link>
        )}
        <span>
          <FormattedMessage
            id="list.pageCount"
            defaultMessage="{current} of {total}"
            values={{ current: currentPage, total: totalPages }}
          />
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            <FormattedMessage id="list.next" defaultMessage="Next" />
          </button>
        )}
        {nextPage && (
          <Link href={`${basePath}/page/${currentPage + 1}`} rel="next">
            <FormattedMessage id="list.next" defaultMessage="Next" />
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagSourcePosts,
  tagTitle,
}: ListLayoutProps) {
  const pathname = usePathname()
  const intl = useIntl()
  const tagCounts = (tagSourcePosts || posts).reduce<Record<string, number>>((counts, post) => {
    post.tags?.forEach((tag) => {
      const key = slug(tag)
      counts[key] = (counts[key] || 0) + 1
    })
    return counts
  }, {})
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {tagTitle ? (
              <TagLabel text={tagTitle} />
            ) : title === 'All Posts' ? (
              <FormattedMessage id="list.allPosts" defaultMessage="All posts" />
            ) : (
              title
            )}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.includes('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">
                  <FormattedMessage id="list.allPosts" defaultMessage="All posts" />
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  <FormattedMessage id="list.allPosts" defaultMessage="All posts" />
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  const translatedTag = intl.formatMessage({
                    id: `tag.${slug(t)}`,
                    defaultMessage: t,
                  })
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          <TagLabel text={t} />
                          {` (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={intl.formatMessage(
                            { id: 'tags.view', defaultMessage: 'View posts tagged {tag}' },
                            { tag: translatedTag }
                          )}
                        >
                          <TagLabel text={t} />
                          {` (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">
                          <FormattedMessage id="post.publishedOn" defaultMessage="Published on" />
                        </dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>
                            <FormattedDate value={date} year="numeric" month="long" day="numeric" />
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
