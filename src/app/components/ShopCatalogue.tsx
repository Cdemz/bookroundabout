"use client";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
    category: string;
  };
};
function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList({ params }: Props) {
  const router = useRouter();
  const encodeCategory = (category: string) => encodeURIComponent(category);
  return (
    <ImageList
      //   sx={{ width: 350, height: 450 }}
      variant="quilted"
      //   cols={4}
      //   rowHeight={60}
      className="mx-auto w-[80%] h-[60%] grid grid-cols-4 md:h-[60vh]"
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <div className="relative">
            <Link href={`/Category/${encodeCategory(item.category)}`}>
              <div className="w-full h-full bg-opacity-40 bg-black absolute z-10 flex items-center justify-center">
                <p className="font-bold text-xl">{item.category}</p>
              </div>
            </Link>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              className="w-full"
            />
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoaWxkcmVuJTIwYm9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=100",
    title: "Breakfast",
    rows: 2,
    cols: 2,
    category: "Children Books",
  },
  {
    img: "https://images.unsplash.com/photo-1658842042844-eeb5ad17b7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=100",
    title: "Burger",
    category: "Non-Fiction",
  },
  {
    img: "https://images.unsplash.com/photo-1635007129134-814c0b7c777e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=100",
    title: "Camera",
    category: "Fiction",
  },
  {
    img: "https://images.unsplash.com/photo-1663868290007-e8df80a5b909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=220&q=100",
    title: "Coffee",
    category: "Romance",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1576479854195-52883a461a68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzaWMlMjBib29rc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=220&q=100",
    title: "Hats",
    category: "Classic",
    cols: 2,
  },
];
