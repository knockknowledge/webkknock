import React from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {testimonials} from '@/data/testimonials';

const TestimonialsCarousel: React.FC = () => {
  return (
    <div className="px-5 bg-background overflow-hidden">
      <div className="relative mt-5 w-full overflow-hidden mask-gradient">
        <motion.div
          className="flex space-x-8 w-max"
          animate={{translateX: '-50%'}}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 100,
            ease: 'linear',
          }}
          style={{display: 'flex', minWidth: '200%'}}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-lg min-w-[300px] max-w-sm mx-2"
            >
              <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                {/* <Image
                  src={testimonial.avatar}
                  alt={`${testimonial.name} avatar`}
                  width={50}
                  height={50}
                  className="rounded-full shadow-md"
                /> */}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-secondary">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-foreground-accent">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-foreground-accent text-center lg:text-left">
                &quot;{testimonial.message}&quot;
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
