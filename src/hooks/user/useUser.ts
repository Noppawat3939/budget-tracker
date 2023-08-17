import { useSession } from "next-auth/react";

function useUser() {
  const { data } = useSession();

  return { data };
}

export default useUser;
