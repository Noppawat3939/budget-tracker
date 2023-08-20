/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import type { UserData } from "./type";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { getUserInfo } from "@/services";
import { HttpStatusCode } from "axios";

function useUser() {
  const session = useSession();
  const [data, setData] = useState<UserData | undefined>();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (session.data && session.status === "authenticated" && isEmpty(data)) {
      (async () => {
        setIsPending(true);
        try {
          //@ts-ignore
          const token: string = session.data?.user.idToken;
          const { data, status } = await getUserInfo({ token });

          if (status === HttpStatusCode.Ok) {
            const { email, name, profile, provider, userId } = data.user;
            setData({
              email: email,
              name,
              profile,
              loginWith: provider,
              userId,
            });
            setIsPending(false);
          }
        } catch (error) {
          console.error("error get user info", error);
          setIsPending(false);
        }
      })();
    }
  }, [session.status]);

  return { data, isPending };
}

export default useUser;
