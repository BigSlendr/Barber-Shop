import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ReviewsSection() {
  return (
    <section>
      <SectionHeader eyebrow="Reviews" title="What clients say" />
      <div className="grid gap-4 md:grid-cols-2">
        {activeShop.reviews.map((review) => (
          <article key={review.id} className="rounded-2xl border border-white/10 bg-brand-surface p-5">
            <p className="text-brand-accent">{"★".repeat(review.rating)}</p>
            <p className="mt-2 text-brand-text">“{review.text}”</p>
            <p className="mt-4 text-sm text-brand-muted">— {review.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
