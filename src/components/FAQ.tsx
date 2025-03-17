'use client';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {BiMinus, BiPlus} from 'react-icons/bi';
import Image from 'next/image';

import SectionTitle from './SectionTitle';
import {faqs} from '@/data/faq';

const colors = [
  'bg-purpleTwitch',
  'bg-violetGlow',
  'bg-lavenderDream',
  'bg-pinkNeon',
  'bg-coralRed',
  'bg-orangeSunset',
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

        <div className="w-full lg:max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className={`mb-3 rounded-lg text-white`}>
              <Disclosure>
                {({open}) => (
                  <>
                    <DisclosureButton
                      className={`flex items-center justify-between w-full p-4 text-lg text-left rounded-full  ${
                        colors[index % colors.length]
                      }`}
                    >
                      <span className="text-2xl font-semibold">
                        {faq.question}
                      </span>
                      {open ? (
                        <BiMinus className="w-5 h-5 text-secondary" />
                      ) : (
                        <BiPlus className="w-5 h-5 text-secondary" />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel
                      className={`px-4 pt-4 pb-2 flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-6 bg-white  border-2 border-t-0 rounded-lg`}
                    >
                      {/* Imagen - Ocupa la mitad en desktop */}
                      {faq.image && (
                        <div className="w-full lg:w-1/2">
                          <img
                            src={faq.image}
                            alt="Descripción"
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div
                        className={`w-full flex-col text-black flex items-center ${
                          faq.image ? 'lg:w-1/2' : 'lg:w-full'
                        }`}
                      >
                        {/*  firts title */}
                        {faq.title && (
                          <div className="w-full text-black font-bold mb-2 text-center">
                            <h3 className="text-[#7996f2]">{faq.title}</h3>
                          </div>
                        )}
                        {/* Texto - Ocupa la otra mitad en desktop */}
                        <div className={`w-full text-black mb-2 text-center`}>
                          <p className="text-md">{faq.answer}</p>
                        </div>

                        {/* Second title */}
                        {faq.secondaryTitle && (
                          <div className="w-full text-black font-bold mb-2 text-center">
                            <h3 className="text-[#7996f2]">
                              {faq.secondaryTitle}
                            </h3>
                          </div>
                        )}
                        {/* Second  Text */}
                        {faq.secondaryAnswer && (
                          <div className={`w-full text-black mb-2 text-center`}>
                            <p className="text-md">{faq.secondaryAnswer}</p>
                          </div>
                        )}
                      </div>
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
