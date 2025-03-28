import Link from 'next/link';
import React from 'react';
import {FaFingerprint} from 'react-icons/fa';
import Image from 'next/image';

import {siteDetails} from '@/data/siteDetails';
import {footerDetails} from '@/data/footer';
import {getPlatformIconByName} from '../utils/utils';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hero-background text-foreground py-10">
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col justify-start md:flex-row md:justify-between gap-10">
        <div className="md:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/webKnock-logo-nav.png"
              alt="Logo"
              width={130}
              height={80}
            />
          </Link>
        </div>

        <div className="md:flex-1 flex md:justify-center w-[100%]">
          <ul className="text-foreground-accent flex md:flex-row flex-col flex-wrap gap-4 md:gap-6 justify-center">
            {footerDetails.quickLinks.map(link => (
              <li key={link.text}>
                <Link
                  href={link.url}
                  className="hover:text-foreground font-bold"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:flex-1 flex md:justify-end">
          {footerDetails.socials && (
            <div className="flex items-center gap-5 flex-wrap">
              {Object.keys(footerDetails.socials).map(platformName => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
