import {IMenuItem, ISocials} from '../types/types';

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading:
    'Empowering businesses with cutting-edge financial technology solutions.',
  quickLinks: [
    {
      text: 'Quiénes somos',
      url: '#about',
    },
    {
      text: 'Programas',
      url: '#plans',
    },
    {
      text: 'Reviews',
      url: '#spotify-playlist',
    },
    {
      text: 'FAQ',
      url: '#faq',
    },
    {
      text: 'Contáctanos',
      url: '#hero',
    },
  ],
  email: 'address@yoursite.com',
  telephone: '+1 (123) 456-7890',
  socials: {
    //twitter: 'https://twitter.com/Twitter',
    facebook: 'https://www.facebook.com/knock.knowledge?mibextid=ZbWKwL',
    // youtube: 'https://youtube.com',
    // linkedin: 'https://www.linkedin.com',
    // threads: 'https://www.threads.net',
    instagram: 'https://instagram.com/knock.knowledge?igshid=ZDdkNTZiNTM=',
    tiktok: 'https://www.tiktok.com/@knockknowledge?_t=ZM-8u6xEKMi5Uk&_r=1',
  },
};
