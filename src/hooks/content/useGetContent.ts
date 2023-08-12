import { getContent } from "@/services";
import { useEffect, useState } from "react";

export default function useGetContent<T>({ params }: { params: string }) {
  const [data, setData] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (!data) {
      (async () => {
        try {
          const { status, data } = await getContent(params);
          if (status === 200) {
            setData(JSON.parse(data));
          }
        } catch (error) {
          console.error("Error get content hook ==>", error);
        }
      })();
    }
  }, [data, params]);

  return { data };
}
