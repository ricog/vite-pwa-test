import { describe, it, expect, beforeEach, vi } from 'vitest'
import { StrictMode } from 'react'
import type { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

vi.mock('react-dom/client')

describe('main.tsx entry point', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('creates root and renders app in StrictMode', async () => {
    const mockRender = vi.fn()
    const mockUnmount = vi.fn()
    const mockCreateRoot = vi.fn(() => ({
      render: mockRender,
      unmount: mockUnmount,
    }))

    vi.mocked(createRoot).mockImplementation(mockCreateRoot)

    await import('./main')

    const rootElement = document.getElementById('root')
    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement)
    expect(mockRender).toHaveBeenCalledTimes(1)

    const renderCall = mockRender.mock.calls[0]?.[0] as ReactElement | undefined
    expect(renderCall?.type).toBe(StrictMode)
  })
})
