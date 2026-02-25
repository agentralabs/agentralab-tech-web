export default function FlyersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-mono px-6 py-12 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
          // SECTION: SOCIAL_FLYERS
        </p>
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
          Social Media Flyers
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Right-click each image and select &quot;Save image as&quot; to
          download. Images are generated at exact platform dimensions.
        </p>

        <div className="space-y-12">
          {/* Codebase User Story — Twitter */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#ea580c]" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                Codebase Story — Twitter / X
              </h2>
              <span className="text-xs text-muted-foreground ml-2">
                1200 x 675px &middot; 16:9
              </span>
            </div>
            <div className="border-2 border-foreground overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/codebase-story-twitter"
                alt="AgenticCodebase user story Twitter flyer — 1200x675"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Direct link:{" "}
              <a
                href="/flyers/codebase-story-twitter"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                /flyers/codebase-story-twitter
              </a>
            </p>
          </section>

          {/* Codebase User Story — LinkedIn */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#ea580c]" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                Codebase Story — LinkedIn
              </h2>
              <span className="text-xs text-muted-foreground ml-2">
                1200 x 627px &middot; 1.91:1
              </span>
            </div>
            <div className="border-2 border-foreground overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/codebase-story-linkedin"
                alt="AgenticCodebase user story LinkedIn flyer — 1200x627"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Direct link:{" "}
              <a
                href="/flyers/codebase-story-linkedin"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                /flyers/codebase-story-linkedin
              </a>
            </p>
          </section>

          {/* Twitter/X Flyer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#ea580c]" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                Twitter / X Post
              </h2>
              <span className="text-xs text-muted-foreground ml-2">
                1200 x 675px &middot; 16:9
              </span>
            </div>
            <div className="border-2 border-foreground overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/twitter-post"
                alt="Agentra Labs Twitter/X flyer — 1200x675"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Direct link:{" "}
              <a
                href="/flyers/twitter-post"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                /flyers/twitter-post
              </a>
            </p>
          </section>

          {/* LinkedIn Flyer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#ea580c]" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                LinkedIn Post
              </h2>
              <span className="text-xs text-muted-foreground ml-2">
                1200 x 627px &middot; 1.91:1
              </span>
            </div>
            <div className="border-2 border-foreground overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/linkedin-post"
                alt="Agentra Labs LinkedIn flyer — 1200x627"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Direct link:{" "}
              <a
                href="/flyers/linkedin-post"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                /flyers/linkedin-post
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
