"use client";
import { useNavigation } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const navigation = useNavigation();
  const { id } = navigation.query;
  const [itemId, setItemId] = useState<string | null>(null); // Specify the type as string | null

  useEffect(() => {
    if (id) {
      setItemId(id as string); // Cast id as string if it's not null
    }
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl text-black">{itemId}</h1>
    </div>
  );
};

export default Page;
