interface Props {
  title: string;
  subtitle?: string | React.ReactNode;
}

export const PageTitle = ({title, subtitle}: Props) => {
  return (
    <div className="mb-3 lg:mb-4 flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold">{title}</h1>
      {subtitle && (
        <p className="text-gray-400 text-center mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};