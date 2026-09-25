import { Authors, allAuthors } from 'contentlayer/generated'
import AuthorLayout from '@/layouts/AuthorLayout'
import AboutText from '@/components/AboutText'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <AboutText />
      </AuthorLayout>
    </>
  )
}
