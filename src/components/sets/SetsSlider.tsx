"use client";
import { getUserSets } from "../../components/sets/actions";
import { SetCard } from "@/src/components/sets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Set } from "./types";

export default function SetsSlider() {
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    const fetchSets = async () => {
      const setsData = await getUserSets();
      setSets(setsData);
    };

    fetchSets();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: sets.length > 2 ? 3 : sets.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: sets.length > 1 ? 2 : sets.length,
          slidesToScroll: sets.length > 1 ? 2 : sets.length,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return sets.length > 0 ? (
    <Slider {...settings} className="max-w-[85vw] lg:max-w-full">
      {sets.map((set) => (
        <div key={set.id}>
          <SetCard set={set} />
        </div>
      ))}
    </Slider>
  ) : (
    <p>No verses</p>
  );
}
