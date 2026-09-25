'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl'
import NextImage from 'next/image'
import coverPhoto from '@/data/cover-photo-blurred.png'
import ContactForm from '@/components/ContactForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const intl = useIntl()
  return (
    <>
      <div className="relative mb-8 h-80 overflow-hidden rounded-2xl sm:h-96 lg:h-[30rem]">
        <NextImage
          src={coverPhoto}
          alt={intl.formatMessage({ id: 'home.coverAlt' })}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[center_20%]"
        />
      </div>
      <p className="mb-10 text-center text-xl font-medium tracking-wide text-gray-700 dark:text-gray-300 sm:text-2xl">
        <FormattedMessage id="home.coverSubtitle" defaultMessage="Cycling and bicycle mechanics" />
      </p>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            <FormattedMessage id="home.latest" defaultMessage="Latest" />
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            <FormattedMessage id="site.description" defaultMessage="Enjoy my latest posts" />
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && <FormattedMessage id="home.noPosts" defaultMessage="No posts found." />}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
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
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={intl.formatMessage(
                            { id: 'post.readMoreLabel', defaultMessage: 'Read more: {title}' },
                            { title }
                          )}
                        >
                          <FormattedMessage id="post.readMore" defaultMessage="Read more" /> &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={intl.formatMessage({ id: 'home.allPosts' })}
          >
            <FormattedMessage id="home.allPosts" defaultMessage="All posts" /> &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.showContactForm && <ContactForm />}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
