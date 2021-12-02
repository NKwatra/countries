import React from "react";

type useQuerySuccessResponse<T> = {
  status: "success";
  data: T;
};

type useQueryErrorResponse = {
  status: "error";
};

export type useQueryResponse<T> =
  | useQueryErrorResponse
  | useQuerySuccessResponse<T>;

type useQueryReturn<T> = {
  loading: boolean;
  error: boolean;
  data: T | undefined;
};

type useLazyQueryReturn<T, U = undefined> = [
  (newArgs?: U) => void,
  useQueryReturn<T>
];

export function useQuery<T, U>(
  callback: (args: U) => Promise<useQueryResponse<T>>,
  args: U
): useQueryReturn<T>;
export function useQuery<T>(
  callback: () => Promise<useQueryResponse<T>>
): useQueryReturn<T>;
export function useQuery<T, U = undefined>(
  callback: (args?: U) => Promise<useQueryResponse<T>>,
  args?: U
): useQueryReturn<T> {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(undefined);

  React.useEffect(() => {
    async function execCallback() {
      const response = await callback(args as U);
      if (response.status === "error") {
        setError(true);
      } else {
        setData(response.data);
      }
      setLoading(false);
    }

    execCallback();
  }, [args, callback]);

  return { loading, error, data };
}

export function useLazyQuery<T, U>(
  callback: (args: U) => Promise<useQueryResponse<T>>,
  args: U
): useLazyQueryReturn<T, U>;
export function useLazyQuery<T>(
  callback: () => Promise<useQueryResponse<T>>
): useLazyQueryReturn<T>;
export function useLazyQuery<T, U = undefined>(
  callback: (args?: U) => Promise<useQueryResponse<T>>,
  args?: U
): useLazyQueryReturn<T> {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(undefined);

  async function exec(newArgs?: U) {
    setLoading(true);
    const response = await callback(newArgs || args);
    if (response.status === "error") {
      setError(true);
    } else {
      setData(response.data);
    }
    setLoading(false);
  }

  return [exec, { loading, error, data }];
}
