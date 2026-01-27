import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import App from './App'

describe('App', () => {

  describe('Rendering', () => {
    it('renders the main heading', () => {
      render(<App />)
      expect(screen.getByRole('heading', { name: /vite pwa \+ react/i })).toBeInTheDocument()
    })

    it('renders both logo images with correct alt text', () => {
      render(<App />)
      expect(screen.getByAltText(/vite logo/i)).toBeInTheDocument()
      expect(screen.getByAltText(/react logo/i)).toBeInTheDocument()
    })

    it('renders logo links with correct URLs and security attributes', () => {
      render(<App />)
      const viteLink = screen.getByRole('link', { name: /vite logo/i })
      const reactLink = screen.getByRole('link', { name: /react logo/i })

      expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
      expect(viteLink).toHaveAttribute('target', '_blank')
      expect(viteLink).toHaveAttribute('rel', 'noreferrer noopener')

      expect(reactLink).toHaveAttribute('href', 'https://react.dev')
      expect(reactLink).toHaveAttribute('target', '_blank')
      expect(reactLink).toHaveAttribute('rel', 'noreferrer noopener')
    })

    it('renders PWA features section', () => {
      render(<App />)
      expect(screen.getByText(/pwa ready!/i)).toBeInTheDocument()
      expect(screen.getByText(/this app works offline and can be installed/i)).toBeInTheDocument()
      expect(screen.getByText(/counter persists when you close and reopen the app/i)).toBeInTheDocument()
    })
  })

  describe('Counter Functionality', () => {
    it('initializes counter at 0 when localStorage is empty', () => {
      render(<App />)
      const button = screen.getByRole('button', { name: /count is 0/i })
      expect(button).toBeInTheDocument()
    })

    it('increments counter when button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const button = screen.getByRole('button', { name: /count is 0/i })
      await user.click(button)

      expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    })

    it('increments counter multiple times', async () => {
      const user = userEvent.setup()
      render(<App />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(screen.getByRole('button', { name: /count is 3/i })).toBeInTheDocument()
    })

    it('button has correct styling classes', () => {
      render(<App />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-500', 'hover:bg-blue-600', 'text-white')
    })
  })

  describe('LocalStorage Integration', () => {
    it('loads initial count from localStorage', () => {
      localStorage.setItem('pwa-counter', '42')
      render(<App />)

      expect(screen.getByRole('button', { name: /count is 42/i })).toBeInTheDocument()
    })

    it('saves count to localStorage after increment', async () => {
      const user = userEvent.setup()
      render(<App />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(localStorage.getItem('pwa-counter')).toBe('1')
    })

    it('updates localStorage on subsequent increments', async () => {
      const user = userEvent.setup()
      localStorage.setItem('pwa-counter', '5')
      render(<App />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(localStorage.getItem('pwa-counter')).toBe('6')
    })

    it('handles invalid localStorage value gracefully', () => {
      localStorage.setItem('pwa-counter', 'invalid')
      render(<App />)

      const button = screen.getByRole('button')
      expect(button.textContent).toContain('NaN')
    })

    it('handles localStorage getItem returning null', () => {
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
      getItemSpy.mockReturnValue(null)

      render(<App />)
      expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()

      getItemSpy.mockRestore()
    })
  })

  describe('Accessibility', () => {
    it('button has correct type attribute', () => {
      render(<App />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('has proper heading hierarchy', () => {
      render(<App />)
      const headings = screen.getAllByRole('heading')
      expect(headings).toHaveLength(1)
      expect(headings[0].tagName).toBe('H1')
    })

    it('external links have proper security attributes', () => {
      render(<App />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        if (link.getAttribute('target') === '_blank') {
          expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
          expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
        }
      })
    })
  })

  describe('Content and Instructions', () => {
    it('displays HMR instruction', () => {
      render(<App />)
      expect(screen.getByText(/edit/i)).toBeInTheDocument()
      expect(screen.getByText(/src\/app\.tsx/i)).toBeInTheDocument()
      expect(screen.getByText(/save to test hmr/i)).toBeInTheDocument()
    })

    it('displays instruction about logos', () => {
      render(<App />)
      expect(screen.getByText(/click on the vite and react logos to learn more/i)).toBeInTheDocument()
    })
  })
})
