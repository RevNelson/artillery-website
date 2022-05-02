import { GetState, SetState, State, StoreApi } from "zustand"
import { Draft, produce } from "immer"
// import { devtools, NamedSet, persist, StoreApiWithDevtools, StoreApiWithPersist } from "zustand/middleware";

type StateCreator<
  T extends State,
  CustomSetState = SetState<T>,
  U extends State = T,
> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => U

const immer =
  <T extends State, U extends State>(
    config: StateCreator<T, (fn: (draft: T) => void) => void, U>,
  ): StateCreator<T, SetState<T>, U> =>
  (set, get, api) =>
    config(fn => set(produce(fn) as (state: T) => T), get, api)

export default immer

// const ismmer =
// <T extends State>(config: StateCreator<T>): StateCreator<T> =>
// (set, get, api) =>
//     config(
//         (partial, replace) => {
//             const nextState =
//                 typeof partial === "function"
//                     ? produce(partial as (state: Draft<T>) => T)
//                     : (partial as T);
//             return set(nextState, replace);
//         },
//         get,
//         api
//     );
