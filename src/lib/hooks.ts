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

export function useQuery<T, U extends object>(
  callback: (args: U) => Promise<useQueryResponse<T>>,
  args: U
): useQueryReturn<T>;
export function useQuery<T>(
  callback: () => Promise<useQueryResponse<T>>
): useQueryReturn<T>;
export function useQuery<T, U>(
  callback: (args?: U) => Promise<useQueryResponse<T>>,
  args?: U
): useQueryReturn<T> {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(undefined);

  let effectDependencies;
  if (args) {
    effectDependencies = [callback, ...Object.values(args)];
  } else {
    effectDependencies = [callback];
  }

  React.useEffect(() => {
    async function execCallback() {
      setLoading(true);
      let response;
      if (args) {
        response = await callback(args);
      } else {
        response = await callback();
      }
      if (response.status === "error") {
        setError(true);
      } else {
        setData(response.data);
      }
      setLoading(false);
    }

    execCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, effectDependencies);

  return { loading, error, data };
}

export function useLazyQuery<T, U extends object>(
  callback: (args: U) => Promise<useQueryResponse<T>>,
  args?: U
): useLazyQueryReturn<T, U>;
export function useLazyQuery<T>(
  callback: () => Promise<useQueryResponse<T>>
): useLazyQueryReturn<T>;
export function useLazyQuery<T, U>(
  callback: (args?: U) => Promise<useQueryResponse<T>>,
  args?: U
): useLazyQueryReturn<T> {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(undefined);

  let dependencies = [callback];
  if (args) {
    dependencies.push(...Object.values(args));
  }

  const exec = React.useCallback(async function (newArgs?: U) {
    setLoading(true);
    const response = await callback(newArgs || args);
    if (response.status === "error") {
      setError(true);
    } else {
      setData(response.data);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [exec, { loading, error, data }];
}
