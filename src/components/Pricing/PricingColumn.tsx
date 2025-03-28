import clsx from 'clsx';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

import {IPricing} from '../../types/types';

interface Props {
  tier: IPricing;
  highlight?: boolean;
  color?: string;
}

const PricingColumn: React.FC<Props> = ({tier, highlight, color}: Props) => {
  const {name, price, features, image, description} = tier;

  return (
    <div
      className={clsx(
        'w-full max-w-sm mx-auto bg-transparent rounded-xl lg:max-w-full flex justify-center items-center',
        {'': highlight},
      )}
    >
      <div className="p-6  rounded-t-xl flex flex-col justify-center items-center">
        <div className="w-40 h-40 rounded-full bg-gray-200 mb-6 flex justify-center items-center overflow-hidden">
          <img
            src={image}
            alt="Logo"
            className="object-cover w-full h-auto rounded-lg"
            width={160}
            height={160}
          />
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-center">{name}</h3>
        <p className="text-gray-600 text-center mb-10">{description}</p>
        <Link
          href="#hero"
          className={clsx(
            'py-1 px-10 rounded-full transition-colors font-bold',
            {
              'bg-primary hover:bg-primary-accent': highlight,
            },
          )}
          style={{
            backgroundColor: color,
            color: 'white',
          }}
        >
          Saber más
        </Link>
      </div>
    </div>
  );
};

export default PricingColumn;
