export default function LandDetailLoading() {
  return (
    <>
      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-6 pt-[calc(var(--nav-h)+1.25rem)] text-center lg:px-8 sm:pt-[calc(var(--nav-h)+2rem)]">
        <div className="h-4 w-32 animate-pulse rounded bg-base-light" />
        <div className="mt-6 flex flex-col items-center gap-6">
          <div>
            <div className="mx-auto h-3 w-48 animate-pulse rounded bg-base-light" />
            <div className="mx-auto mt-3 h-10 w-80 animate-pulse rounded bg-base-light sm:h-12" />
          </div>
          <div className="h-10 w-60 animate-pulse rounded bg-base-light sm:h-12" />
          <div className="h-3 w-52 animate-pulse rounded bg-base-light" />
        </div>
      </section>

      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start">
          <div className="w-full md:w-3/5">
            <div className="neu-card aspect-[4/3] w-full animate-pulse bg-base-light" />
          </div>
          <div className="w-full md:w-2/5 md:sticky md:top-[calc(var(--nav-h)+1rem)]">
            <div className="space-y-6">
              <div className="neu-raised space-y-4 p-7">
                <div className="h-4 w-full animate-pulse rounded bg-base-light" />
                <div className="h-4 w-full animate-pulse rounded bg-base-light" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-base-light" />
              </div>
              <div className="neu-card p-7">
                <div className="h-6 w-40 animate-pulse rounded bg-base-light" />
                <div className="mt-4 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-full animate-pulse rounded bg-base-light" />
                  ))}
                </div>
                <div className="neu-btn mt-6 h-12 w-full animate-pulse opacity-50" />
                <div className="neu-raised-sm mt-3 h-12 w-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
