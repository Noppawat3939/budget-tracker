/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import type { UserData } from "./type";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import axios from "axios";

function useUser() {
  const session = useSession();
  const [data, setData] = useState<{ data?: UserData }>();

  useEffect(() => {
    if (isEmpty(data?.data) && session.status === "authenticated") {
      const response = {
        //@ts-ignore
        idToken: session?.data?.user.idToken as string,
        //@ts-ignore
        accessToken: session.data?.user.accessToken as string,
        //@ts-ignore
        name: session.data?.user?.userInfo.name as string,
        //@ts-ignore
        email: session.data?.user?.userInfo.email as string,
        //@ts-ignore
        profile: session.data?.user?.userInfo.profile as string,
        //@ts-ignore
        loginWith: session?.data?.user?.loginProvider as string,
      };

      setData({ data: response });

      (async () => {
        await axios.post(
          "/api/user/info",
          {},
          {
            //@ts-ignore
            headers: { Authorization: `Bearer ${session?.data?.user.idToken}` },
          }
        );
      })();
    }
  }, [session.status]);

  return { data };
}

export default useUser;
