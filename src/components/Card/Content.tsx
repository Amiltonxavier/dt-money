import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { TransationType } from "../../type";
type ContentProps = ComponentProps<"span"> & {
  amount: string;
  signal?: string;
  title: string;
  transationType: TransationType;
};

const colorstatus = {
  inConming: "text-green-700",
  outCming: "text-red-700",
  default: "text-white",
};

export function Content({
  amount,
  signal,
  title,
  transationType,
  ...props
}: ContentProps) {
  return (
    <>
      <span
        className={twMerge("mb-1 text-base font-semibold", props.className)}
      >
        {title}
      </span>
      <span className="overflow-auto">
        <h4 className="text-xl lg:text-3xl mt-2 sm:mt-4 text-gray-100 font-bold truncate">
          <span className="">{signal}</span>
          {amount}
        </h4>
      </span>
    </>
  );
}
