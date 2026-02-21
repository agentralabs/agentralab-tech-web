import { SectionRail } from "@/components/section-rail"
import { communityChannels } from "@/lib/community"

interface CommunityRoutingTableProps {
  step?: string
}

export function CommunityRoutingTable({ step = "030" }: CommunityRoutingTableProps) {
  return (
    <section className="w-full px-6 pb-14 lg:px-12">
      <SectionRail label="// SECTION: ROUTING_TABLE" step={step} />
      <div className="border-2 border-foreground p-4 lg:p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">Channel routing</p>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {communityChannels.map((channel) => (
            <article key={channel.name} className="border-2 border-foreground p-4">
              <h2 className="text-base font-mono font-bold uppercase tracking-tight">{channel.name}</h2>
              <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{channel.purpose}</p>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
              >
                <span className="px-4 py-2">{channel.primaryAction}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
