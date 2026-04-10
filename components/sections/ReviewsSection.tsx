import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ReviewsSection() {
  return (
    <section>
      <SectionHeader eyebrow="Reviews" title="What clients say" />
      <div className="grid gap-5 md:grid-cols-2">
        {activeShop.reviews.map((review) => (
          <article key={review.id} className="card">
            <p className="text-brand-accent/95">{"★".repeat(review.rating)}</p>
            <p className="mt-3 text-brand-text">“{review.text}”</p>
            <p className="mt-4 text-sm text-brand-muted">— {review.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
