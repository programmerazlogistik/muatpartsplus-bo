import { useMemo, useRef } from "react";

import { equal as isShallowEqual } from "fast-shallow-equal";

const useCustomCompareMemo = <T>(
  factory: () => T,
  deps: any[],
  depsEqual: (prevDeps: any[], nextDeps: any[]) => boolean
): T => {
  const ref = useRef<any[] | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, ref.current);
};

const shallowEqualDepsList = (prevDeps: any[], nextDeps: any[]): boolean =>
  prevDeps.every((dep, index) => isShallowEqual(dep, nextDeps[index]));

export const useShallowMemo = <T>(factory: () => T, deps: any[]): T => {
  return useCustomCompareMemo(factory, deps, shallowEqualDepsList);
};