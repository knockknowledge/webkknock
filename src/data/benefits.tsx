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
      'Knock Knowledge es una academia online especializada en la enseñanza del idioma inglés, con profesores 100% capacitados, en continuo aprendizaje y desarrollo. Nuestra metodología se adapta al mundialmente reconocido Estándar Europeo del Marco Común Europeo de Referencia para las Lenguas (CEFR), el cual se divide en diferentes grados de aprendizaje: A1, A2, B1, B2 y C1, distribuidos a lo largo de 22 niveles académicos. Estos niveles están diseñados para garantizar la formación de personas bilingües al finalizar nuestro curso.',
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
