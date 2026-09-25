import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'
import { notFound } from 'next/navigation'

export default function TagsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const counts = getPostsForLocale(allBlogs, locale)
    .flatMap((post) => post.tags || [])
    .reduce<Record<string, number>>((result, tag) => {
      const key = slug(tag)
      result[key] = (result[key] || 0) + 1
      return result
    }, {})
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
  const copy =
    locale === 'es'
      ? {
          title: 'Etiquetas',
          empty: 'No se encontraron etiquetas.',
          view: 'Ver publicaciones con la etiqueta',
        }
      : { title: 'Tags', empty: 'No tags found.', view: 'View posts tagged' }

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
          {copy.title}
        </h1>
      </div>
      <div className="flex max-w-lg flex-wrap">
        {tags.length === 0 && copy.empty}
        {tags.map((tag) => (
          <div key={tag} className="mb-2 mr-5 mt-2">
            <Tag text={tag} />
            <Link
              href={`/tags/${tag}`}
              className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
              aria-label={`${copy.view} ${tag}`}
            >
              {` (${counts[tag]})`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
