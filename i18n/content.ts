import type { Blog } from 'contentlayer/generated'
import type { Locale } from './config'

export function isPostInLocale(post: Blog, locale: Locale) {
  return ((post as Blog & { locale?: Locale }).locale || 'es') === locale
}

function translationKey(post: Blog) {
  return (post as Blog & { translationKey?: string }).translationKey || post.slug
}

export function getPostsForLocale(posts: Blog[], locale: Locale) {
  if (locale === 'es') return posts.filter((post) => isPostInLocale(post, 'es'))

  const englishPosts = posts.filter((post) => isPostInLocale(post, 'en'))
  const englishKeys = new Set(englishPosts.map(translationKey))
  const spanishFallbacks = posts.filter(
    (post) => isPostInLocale(post, 'es') && !englishKeys.has(translationKey(post))
  )

  return [...englishPosts, ...spanishFallbacks]
}

export function findPostForLocale(posts: Blog[], slug: string, locale: Locale) {
  return (
    posts.find((post) => post.slug === slug && isPostInLocale(post, locale)) ||
    (locale === 'en'
      ? posts.find((post) => post.slug === slug && isPostInLocale(post, 'es'))
      : undefined)
  )
}
