import { StateCreator } from "zustand"

import { AlertProps } from "@lib/types/alerts"

export type AlertSliceType = typeof initialState & {
  alert: {
    setAlert: (newAlert: AlertProps | null) => void
  }
}

const initialState = {
  alert: {
    open: false,
    primary: "",
    secondary: "",
    type: "success" as "info" | "warning" | "error" | "success",
    timeout: 2000,
  },
}

const createAlertSlice: StateCreator<AlertSliceType, [], []> = set => ({
  alert: {
    ...initialState.alert,
    setAlert: newAlert =>
      set(state => {
        const alert = { ...state.alert, ...newAlert }
        if (alert.open && alert.timeout) {
          setTimeout(() => {
            set(state => ({ alert: { ...state.alert, open: false } }))
          }, alert.timeout)
        }

        return { alert: { ...state.alert, newAlert } }
      }),
  },
})

export default createAlertSlice
