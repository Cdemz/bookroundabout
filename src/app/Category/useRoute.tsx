"use client";
import { useState, useEffect } from "react";

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const params: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      setQueryParams(params);
    }
  }, []);

  return queryParams;
};

export default useQueryParams;
