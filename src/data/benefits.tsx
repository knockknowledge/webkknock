import {
  FiBarChart2,
  FiBriefcase,
  FiDollarSign,
  FiLock,
  FiPieChart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';

import {IBenefit} from '../types/types';

export const benefits: IBenefit[] = [
  {
    title: '',
    description:
      'Knock knowledge es una academia online especializada en la enseñanza del idioma ingles con profesores 100% capacitados, en continuo aprendizaje y desarrollo. Nuestra metodologia se adapta al mundialmente reconocido "estándar europeo del marco comun europeo de referencia para las lenguas (CEFR)" dividido en diferentes grados de aprendizaje los cuales son el A1-A2- B1-B2-C1 a lo largo de 22 niveles academicos adaptados para una formacion garantizada de personas bilingues al finalizar nuestro curso.',
    bullets: [
      {
        title: 'Micro-Investing',
        description: 'Begin with as little as $1 and watch your money grow.',
        icon: <FiDollarSign size={26} />,
      },
      {
        title: 'Expert Portfolios',
        description:
          'Choose from investment strategies tailored to your risk tolerance.',
        icon: <FiBriefcase size={26} />,
      },
      {
        title: 'Real-Time Performance',
        description:
          'Track your investments with easy-to-understand metrics and visuals.',
        icon: <FiPieChart size={26} />,
      },
    ],
    imageSrc: '/images/webKnock-logo-nav.png',
  },
];
