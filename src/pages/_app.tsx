import type {AppProps} from 'next/app';
import type {Metadata} from 'next';
//import { GoogleAnalytics } from '@next/third-parties/google';
import {Source_Sans_3, Manrope} from 'next/font/google';
import {siteDetails} from '@/data/siteDetails';

import './globals.css';

const manrope = Manrope({subsets: ['latin']});
const sourceSans = Source_Sans_3({subsets: ['latin']});

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl), // 🔥 Agregado aquí
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/twitter-image.jpg'],
  },
};

export default function App({Component, pageProps}: AppProps) {
  return (
    <div className={`${manrope.className} ${sourceSans.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
