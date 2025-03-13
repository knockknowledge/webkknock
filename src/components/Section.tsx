import SectionTitle from './SectionTitle';
import clsx from 'clsx';

interface Props {
  id: string;
  title: string;
  description: string;
  classes?: string;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  title,
  description,
  classes,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <section id={id} className={clsx('py-10 lg:py-20', classes)}>
      <SectionTitle>
        <h2 className="text-center mb-4">{title}</h2>
      </SectionTitle>
      <p className="mb-12 text-center">{description}</p>
      {children}
    </section>
  );
};

export default Section;
