import React, { FC } from "react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { EMPTY_STRING } from "@/constants";

type PreviewFeatureProps = {
  src: string | StaticImport;
  icon: React.ReactNode;
  about?: string;
  label: string;
  reverse?: boolean;
};

const PreviewFeature: FC<PreviewFeatureProps> = ({
  icon,
  src,
  about,
  label,
  reverse,
}) => {
  return (
    <section about={about}>
      <div
        className={`p-2 gap-x-4 flex ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex space-x-2">
          {icon}
          <h1 className="text-[28px] font-semibold">{label || EMPTY_STRING}</h1>
        </div>
        <div className="w-auto h-full">
          <Image
            loading="lazy"
            src={src}
            alt="create-budget-image"
            className="w-full h-full object-cover rounded-lg shadow-md border-white border transition-all duration-300 hover:shadow-lg hover:border hover:border-gray-50"
          />
        </div>
      </div>
    </section>
  );
};

export default PreviewFeature;
