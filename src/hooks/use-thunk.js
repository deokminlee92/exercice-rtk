import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

//Custom hooks
//useEffect() 함수를 계속 동작시키지 않으려면 useCallback 을 사용해야함
export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //useCallback
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error];
}
