export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div
        style={{ backgroundImage: `url('/images/promax/main.webp')` }}
        className="h-56 w-full rounded-lg bg-cover bg-center bg-muted/50 flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent rounded-lg" />
        <div className="absolute left-6 bottom-6 ">
          <h1 className="text-lg md:text-xl lg:text-3xl text-white drop-shadow-lg ">
            Welkom bij ProMax Dashboard
          </h1>
          <p className="mt-2  text-white drop-shadow-lg text-md md:text-lg lg:text-xl max-w-lg">
            Uw alles-in-één logistieke beheersoplossing
          </p>
        </div>
      </div>
    </section>
  );
}
