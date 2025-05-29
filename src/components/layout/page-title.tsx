import {twMerge} from "tailwind-merge";

interface Props {
  title: string;
  subtitle?: string | React.ReactNode;
  className?: string;
}

export const PageTitle = ({title, subtitle, className = ''}: Props) => {
  return (
    <div className={twMerge('mb-3 lg:mb-4 flex flex-col items-center', className)}>
      <h1 className="text-2xl text-center font-extrabold tracking-widest">{title}</h1>
      {subtitle && (
        <p className="text-gray-400 text-center mt-1 tracking-widest">
          {subtitle}
        </p>
      )}
    </div>
  );
};