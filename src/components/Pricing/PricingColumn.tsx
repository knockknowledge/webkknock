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
        'w-full max-w-sm mx-auto bg-white rounded-xl lg:max-w-full flex justify-center items-center',
        {'': highlight},
      )}
    >
      <div className="p-6  rounded-t-xl flex flex-col justify-center items-center">
        <div className="w-40 h-40 rounded-full bg-gray-200 mb-6 flex justify-center items-center overflow-hidden">
          {/* <p className="text-white font-bold">Icon</p> */}
          <img
            src={image}
            alt="Logo"
            //objectFit="cover"
            className="object-cover w-full h-auto rounded-lg"
            width={160}
            height={160}
          />
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-center">{name}</h3>
        <p className="text-gray-600 text-center mb-10">{description}</p>
        {/* <p className="text-3xl md:text-5xl font-bold mb-6">
          <span className={clsx({'text-secondary': highlight})}>
            {typeof price === 'number' ? `$${price}` : price}
          </span>
          {typeof price === 'number' && (
            <span className="text-lg font-normal text-gray-600">/mo</span>
          )}
        </p> */}
        <Link
          href="#hero"
          className={clsx(
            'py-1 px-10 rounded-full transition-colors font-bold',
            {
              'bg-primary hover:bg-primary-accent': highlight,
            },
          )}
          style={{
            backgroundColor: color, // Aplica el color dinámicamente
            color: 'white', // Ajusta el color del texto si es necesario
          }}
        >
          Saber más
        </Link>
      </div>
      {/* <div className="p-6 mt-1">
        <p className="font-bold mb-0">FEATURES</p>
        <p className="text-foreground-accent mb-5">
          Everything in basic, plus...
        </p>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
              <span className="text-foreground-accent">{feature}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default PricingColumn;
