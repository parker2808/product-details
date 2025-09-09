/**
 * Image utility functions for handling different types of image sources
 * in Nuxt 3 applications with IPX and Vite asset processing
 */

/**
 * Detect if the image source is an IPX-compatible path (public directory)
 * vs an imported asset URL (processed by Vite)
 *
 * @param src - The image source URL or path
 * @returns true if the source should use IPX processing (nuxt-img), false for regular img tag
 *
 * @example
 * ```typescript
 * // IPX paths (use nuxt-img)
 * isIPXPath('/images/photo.jpg') // true
 * isIPXPath('~/assets/images/photo.jpg') // true
 *
 * // Vite imported assets (use regular img)
 * isIPXPath('/_nuxt/assets/photo-abc123.jpg') // false
 * isIPXPath('data:image/jpeg;base64,...') // false
 * ```
 */
export const isIPXPath = (src: string): boolean => {
  // IPX paths start with '/' (public directory) or '~/' (nuxt aliases)
  // Imported assets typically contain '/_nuxt/assets/' or similar Vite patterns
  // Also exclude data URLs and other non-file protocols
  return src.startsWith('/') && !src.includes('/_nuxt/') && !src.startsWith('data:')
}

/**
 * Get the appropriate image component props based on the source type
 *
 * @param src - The image source URL or path
 * @returns object with component type and additional props
 */
export const getImageComponentType = (src: string) => {
  const useIPX = isIPXPath(src)

  return {
    component: useIPX ? 'nuxt-img' : 'img',
    useIPX,
    // Add common props that work for both components
    props: {
      src,
      loading: 'lazy' as const,
      ...(useIPX && {
        // IPX-specific props
        format: 'webp',
        quality: 80
      })
    }
  }
}
