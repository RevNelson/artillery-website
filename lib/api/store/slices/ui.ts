import { StateCreator } from "zustand"

export type UISliceType = typeof initialState & {
  ui: {
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
  }
}

const initialState = {
  ui: {
    dark: false,
    mobileMenuOpen: false,
  },
}

const createUISlice: StateCreator<UISliceType, [], []> = set => ({
  ui: {
    ...initialState.ui,
    setMobileMenuOpen: mobileMenuOpen =>
      set(state => ({ ui: { ...state.ui, mobileMenuOpen } })),
  },
})

export default createUISlice
