import { Goal } from "lucide-react";
import React from "react";

export default function Banner() {
  return (
    <section className="flex flex-col justify-center items-center h-[85vh]">
      <div className="flex space-x-2 items-baseline justify-center">
        <p className="text-5xl font-bold lg:text-7xl">Budget Tracker</p>
        <Goal className="text-red-500 w-10 h-10" />
      </div>
      <p className="max-w-[80%] text-lg font-medium text-center mt-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
        atque sunt voluptates cupiditate illo distinctio quas? Laboriosam,
        fugiat ?
      </p>
    </section>
  );
}
