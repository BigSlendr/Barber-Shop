import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FAQSection() {
  return (
    <section>
      <SectionHeader eyebrow="FAQ" title="Good to know before you book" />
      <div className="space-y-3">
        {activeShop.faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border border-white/10 bg-brand-surface p-4">
            <summary className="cursor-pointer font-medium">{faq.question}</summary>
            <p className="mt-2 text-sm text-brand-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
