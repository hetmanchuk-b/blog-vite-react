import {Icons} from "./icons.tsx";

interface Props {
  isVisible: boolean;
}

export const LoaderSpinner = ({isVisible}: Props) => {
  if (!isVisible) return null;

  return (
    <div className="text-2xl flex items-center gap-2">
      <Icons.loader className="size-8 animate-spin"/>
      Loading...
    </div>
  );
};