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
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quis voluptas placeat repudiandae error, itaque nesciunt alias harum quaerat architecto officia praesentium? Maxime accusantium dolorem tenetur sed molestiae facilis facere?. \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quis voluptas placeat repudiandae error, itaque nesciunt alias harum quaerat architecto officia praesentium? Maxime accusantium dolorem tenetur sed molestiae facilis facere?.',
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
