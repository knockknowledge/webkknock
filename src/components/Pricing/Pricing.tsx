import PricingColumn from './PricingColumn';

import {tiers} from '@/data/pricing';

const colors = ['#7996f2', '#eaa51b', '#9146e0']; // Array de colores

const Pricing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {tiers.map((tier, index) => (
        <PricingColumn
          key={tier.name}
          tier={tier}
          highlight={index === 1}
          color={colors[index % colors.length]} // Asignar color ciclando si hay más tiers
        />
      ))}
    </div>
  );
};

export default Pricing;
