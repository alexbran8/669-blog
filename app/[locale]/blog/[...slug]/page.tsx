import OriginalPostPage, {
  generateMetadata as originalGenerateMetadata,
} from '../../../blog/[...slug]/page'
import { allBlogs } from 'contentlayer/generated'
import { locales } from '@/i18n/config'
import { getPostsForLocale } from '@/i18n/content'

export const generateStaticParams = async () =>
  locales.flatMap((locale) =>
    getPostsForLocale(allBlogs, locale).map((post) => ({
      locale,
      slug: post.slug.split('/').map((name) => decodeURI(name)),
    }))
  )

export function generateMetadata({ params }: { params: { locale: string; slug: string[] } }) {
  return originalGenerateMetadata({ params })
}

export default OriginalPostPage
