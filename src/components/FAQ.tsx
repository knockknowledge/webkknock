'use client';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {BiMinus, BiPlus} from 'react-icons/bi';

import SectionTitle from './SectionTitle';
import {faqs} from '@/data/faq';

const colors = [
  'bg-pink-500',
  'bg-fuchsia-500',
  'bg-purple-500',
  'bg-indigo-500',
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* <div className="">
                    <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">Frequently Asked Questions</h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        Ask us anything!
                    </p>
                    <a href="mailto:" className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left">help@finwise.com</a>
                </div> */}

        <div className="w-full lg:max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-7 rounded-lg p-4 ${
                colors[index % colors.length]
              } text-white`}
            >
              <Disclosure>
                {({open}) => (
                  <>
                    <DisclosureButton className="flex items-center justify-between w-full px-4  text-lg text-left ">
                      <span className="text-2xl font-semibold">
                        {faq.question}
                      </span>
                      {open ? (
                        <BiMinus className="w-5 h-5 text-secondary" />
                      ) : (
                        <BiPlus className="w-5 h-5 text-secondary" />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent text-white">
                      {faq.answer}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
