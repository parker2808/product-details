import { describe, it, expect } from 'vitest'
import { isIPXPath, getImageComponentType } from '@/modules/core/utils/image.utils'

describe('Image Utilities', () => {
  describe('isIPXPath', () => {
    it('should return true for public directory paths', () => {
      const result = isIPXPath('/images/photo.jpg')
      expect(result).toBe(true)
    })

    it("should return false for Nuxt alias paths (as they don't start with /)", () => {
      const result = isIPXPath('~/assets/images/photo.jpg')
      expect(result).toBe(false)
    })

    it('should return false for Vite imported asset paths', () => {
      const result = isIPXPath('/_nuxt/assets/photo-abc123.jpg')
      expect(result).toBe(false)
    })

    it('should return false for data URLs', () => {
      const result = isIPXPath('data:image/jpeg;base64,/9j/4AAQSkZJRgABA')
      expect(result).toBe(false)
    })

    it('should return false for external URLs and other protocols', () => {
      expect(isIPXPath('https://example.com/image.jpg')).toBe(false)
      expect(isIPXPath('http://localhost/image.png')).toBe(false)
      expect(isIPXPath('blob:http://localhost/uuid')).toBe(false)
    })
  })

  describe('getImageComponentType', () => {
    it('should return nuxt-img component for IPX-compatible paths', () => {
      const result = getImageComponentType('/images/photo.jpg')
      expect(result.component).toBe('nuxt-img')
      expect(result.useIPX).toBe(true)
      expect(result.props.format).toBe('webp')
      expect(result.props.quality).toBe(80)
    })

    it('should return img component for Vite imported assets', () => {
      const result = getImageComponentType('/_nuxt/assets/photo-abc123.jpg')
      expect(result.component).toBe('img')
      expect(result.useIPX).toBe(false)
      expect(result.props.format).toBeUndefined()
      expect(result.props.quality).toBeUndefined()
    })

    it('should include common props for both component types', () => {
      const ipxResult = getImageComponentType('/images/photo.jpg')
      const imgResult = getImageComponentType('/_nuxt/assets/photo.jpg')

      expect(ipxResult.props.src).toBe('/images/photo.jpg')
      expect(ipxResult.props.loading).toBe('lazy')
      expect(imgResult.props.src).toBe('/_nuxt/assets/photo.jpg')
      expect(imgResult.props.loading).toBe('lazy')
    })

    it('should handle data URLs correctly', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA'
      const result = getImageComponentType(dataUrl)
      expect(result.component).toBe('img')
      expect(result.useIPX).toBe(false)
      expect(result.props.src).toBe(dataUrl)
    })

    it('should handle external URLs correctly', () => {
      const externalUrl = 'https://example.com/image.jpg'
      const result = getImageComponentType(externalUrl)
      expect(result.component).toBe('img')
      expect(result.useIPX).toBe(false)
      expect(result.props.src).toBe(externalUrl)
    })
  })
})
