import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-posts"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: "Post not found",
      description: "Blog post not found.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-10 lg:px-12">
          <SectionRail label="// SECTION: BLOG_POST" step="028A" />
          <article className="border-2 border-foreground p-6 lg:p-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#ea580c]">{post.category}</p>
            <h1 className="mt-2 text-2xl lg:text-4xl font-mono font-bold uppercase tracking-tight">{post.title}</h1>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{post.dateIso}</span>
              <span className="h-1 w-1 bg-[#ea580c]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{post.readTime}</span>
            </div>
            <p className="mt-4 text-sm font-mono text-muted-foreground leading-relaxed max-w-4xl">{post.excerpt}</p>
          </article>
        </section>

        <section className="w-full px-6 pb-16 lg:px-12">
          <div className="border-2 border-foreground divide-y divide-border">
            {post.sections.map((section) => (
              <section key={section.heading} className="p-5 lg:p-6">
                <h2 className="text-base lg:text-lg font-mono font-bold uppercase tracking-tight">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-p-${index}`} className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.command ? (
                  <pre className="mt-4 overflow-x-auto border border-foreground/40 bg-foreground p-3 text-[11px] text-background font-mono leading-relaxed">
                    <code>{section.command}</code>
                  </pre>
                ) : null}

                {section.imageSrc ? (
                  <figure className="mt-4">
                    <img
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.heading}
                      className="w-full max-w-4xl border-2 border-foreground"
                    />
                    {section.imageCaption ? (
                      <figcaption className="mt-2 text-[11px] font-mono text-muted-foreground">{section.imageCaption}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </section>
            ))}
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: NEXT_ACTIONS" step="028B" />
          <div className="border-2 border-foreground p-5 lg:p-6">
            <h2 className="text-base lg:text-lg font-mono font-bold uppercase tracking-tight">Continue from this post</h2>
            <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {post.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center border border-foreground px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/blog"
                className="inline-flex items-center border border-foreground px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
