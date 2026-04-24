import LiveStrip from '@/components/home/LiveStrip'
import NavBlocks from '@/components/home/NavBlocks'
import LinkUtiliPreview from '@/components/home/LinkUtiliPreview'
import { getAllArticles } from '@/lib/data'

export const revalidate = 30 // rigenera ogni 30s

export default async function HomePage() {
  const articles = await getAllArticles()
  return (
    <>
      <LiveStrip articles={articles} />
      <NavBlocks />
      <LinkUtiliPreview />
    </>
  )
}
