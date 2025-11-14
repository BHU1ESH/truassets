import RoiCalculator from '@/components/roi/RoiCalculator';

const RoiSection = () => {
  return (
    <section id="roi-calculator" className="section-padding bg-background">
      <div className="container-custom space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Model Your <span className="text-primary">Return on Investment</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Fine-tune cash yields, escalation, and exit assumptions to understand how a property can compound
            your capital. Default levers mirror TruAssets\' advisory baseline—adjust them to match the deal
            you are evaluating.
          </p>
        </div>
        <RoiCalculator />
      </div>
    </section>
  );
};

export default RoiSection;


