const PropertyComparisonBanner = () => {
  return (
    <section id="property-comparison" className="bg-card py-12">
      <div className="container-custom flex flex-col items-center gap-4 text-center">
        <h3 className="text-2xl font-semibold text-foreground">Shortlist Your Investment Candidates</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Tick the <span className="font-medium text-primary">Compare</span> option on any property card to add it to your
          shortlist. Once you have at least two opportunities selected, launch the comparison tray to benchmark
          pricing, projected IRR, and amenities side-by-side.
        </p>
      </div>
    </section>
  );
};

export default PropertyComparisonBanner;


