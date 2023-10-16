"use client";

import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const DEFAULT_WAIT_MS = 100;

function useDebounceSearch(wait?: number) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSearchValue(value);
  };

  const memorizeOnDebounceChange = useMemo(() => {
    return debounce(handleChange, wait || DEFAULT_WAIT_MS);
  }, [wait]);

  useEffect(() => {
    return () => memorizeOnDebounceChange.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { memorizeOnDebounceChange, searchValue };
}

export default useDebounceSearch;
