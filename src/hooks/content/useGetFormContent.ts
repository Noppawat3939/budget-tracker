import axios from "axios";
import { useEffect, useState } from "react";

type UseGetFormContentParams = { path: "create-budget" };

export default function useGetFormContent<T>({
  path,
}: UseGetFormContentParams) {
  const [date, setDate] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!date) {
      (async () => {
        try {
          const res = await axios.get(`/api/${path}/form`);
          if (res.data) {
            setDate(JSON.parse(res.data));
          }
        } catch (error) {
          console.error("Error getFormContent hooks ===>", error);
        }
      })();
    }
  }, [date, path]);

  return { date };
}
