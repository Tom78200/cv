import { createContext, useContext } from 'react'

export type HorizontalNavContextValue = {
  goTo: (id: string) => void
  activeId: string
}

export const HorizontalNavContext = createContext<HorizontalNavContextValue>({
  goTo: () => {},
  activeId: 'hero',
})

export const useHorizontalNav = () => useContext(HorizontalNavContext)


