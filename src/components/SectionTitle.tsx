import React, {ReactElement} from 'react';

interface SectionTitleProps {
  children: React.ReactElement;
}

const SectionTitle: React.FC<SectionTitleProps> = ({children}) => {
  const child = children as ReactElement<{className?: string}>;

  return React.cloneElement(child, {
    className:
      (child.props.className || '') +
      ' text-3xl lg:text-5xl lg:leading-tight font-bold',
  });
};

export default SectionTitle;
