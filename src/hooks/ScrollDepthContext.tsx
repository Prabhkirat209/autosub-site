import { createContext, useContext, type ReactNode } from 'react'
import { useScrollProgress } from './useScrollProgress'

/**
 * Depth shown at the bottom of the page, in metres. 3,682 m is the mean depth of
 * the ocean. This is the readout's scale only and is unrelated to the vehicle's own
 * depth rating, which is still to be confirmed on the spec sheet.
 */
export const MAX_DEPTH_M = 3682

const ScrollDepthCtx = createContext(0)

export function ScrollDepthProvider({ children }: { children: ReactNode }) {
  const progress = useScrollProgress()
  return <ScrollDepthCtx.Provider value={progress}>{children}</ScrollDepthCtx.Provider>
}

/** 0-1 scroll progress through the document. */
export function useScrollDepthProgress() {
  return useContext(ScrollDepthCtx)
}

/** Current simulated depth in meters, surface (0) at top of page. */
export function useDepthMeters() {
  const progress = useScrollDepthProgress()
  return Math.round(progress * MAX_DEPTH_M)
}
