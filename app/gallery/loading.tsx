export default function GalleryLoading() {
  return (
    <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-16 lg:px-8 sm:py-20 pt-[calc(var(--nav-h)+1rem)]">
      <div className="mb-12 max-w-2xl text-center">
        <div className="mx-auto h-3 w-24 animate-pulse rounded bg-base-light" />
        <div className="mx-auto mt-3 h-10 w-48 animate-pulse rounded bg-base-light" />
        <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-base-light" />
      </div>
      <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="neu-card overflow-hidden">
            <div className="aspect-[4/3] w-full animate-pulse bg-base-light" />
            <div className="p-4">
              <div className="h-4 w-32 animate-pulse rounded bg-base-light" />
              <div className="mt-2 h-3 w-48 animate-pulse rounded bg-base-light" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
