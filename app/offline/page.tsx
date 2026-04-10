import Link from "next/link";

export default function OfflinePage() {
  return (
    <section className="rounded-2xl border border-white/10 bg-brand-surface p-6 text-center">
      <h1 className="text-3xl font-semibold">You are offline</h1>
      <p className="mt-2 text-brand-muted">Reconnect to continue booking. Previously cached pages remain available.</p>
      <Link href="/" className="mt-4 inline-block underline">Back home</Link>
    </section>
  );
}
