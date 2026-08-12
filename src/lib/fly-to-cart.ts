/**
 * Fly-to-cart animation utility.
 *
 * Creates a floating clone of the product image that animates from the source
 * element's position to the cart icon in the navbar, then fades out.
 * Uses the Web Animations API for smooth, dependency-free animation.
 */

interface FlyOptions {
  /** Duration of the flight in milliseconds */
  duration?: number
  /** Starting size of the flying image (px). Defaults to source width */
  startSize?: number
  /** Callback fired when the animation completes */
  onComplete?: () => void
}

// Track active flyers so we can clean up on route change
const activeFlyers = new Set<HTMLElement>()

/** Remove all active flyer elements (call on route change if needed) */
export function cleanupFlyers(): void {
  activeFlyers.forEach((el) => {
    el.remove()
  })
  activeFlyers.clear()
}

/**
 * Animate an image flying from a source element to the cart icon.
 *
 * @param imageUrl  - The product image URL to fly
 * @param sourceEl  - The DOM element the flight starts from (e.g. product card / image)
 * @param options   - Optional duration / start size / onComplete overrides
 * @returns A promise that resolves when the animation finishes
 */
export function flyToCart(
  imageUrl: string,
  sourceEl: HTMLElement | null,
  options: FlyOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve()
      return
    }

    const cartBtn = document.getElementById('cart-button')
    if (!cartBtn || !sourceEl) {
      options.onComplete?.()
      resolve()
      return
    }

    const sourceRect = sourceEl.getBoundingClientRect()
    const targetRect = cartBtn.getBoundingClientRect()

    // Guard: if source has no dimensions (hidden / not rendered), bail out
    if (sourceRect.width === 0 || sourceRect.height === 0) {
      options.onComplete?.()
      resolve()
      return
    }

    // Start position = center of source
    const startX = sourceRect.left + sourceRect.width / 2
    const startY = sourceRect.top + sourceRect.height / 2

    // End position = center of cart icon
    const endX = targetRect.left + targetRect.width / 2
    const endY = targetRect.top + targetRect.height / 2

    const startSize = options.startSize ?? Math.min(sourceRect.width, 120)
    const endSize = 24
    const duration = options.duration ?? 750

    // Create the flying image element
    const flyer = document.createElement('img')
    flyer.src = imageUrl
    flyer.alt = ''
    flyer.setAttribute('aria-hidden', 'true')
    flyer.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      `width: ${startSize}px`,
      `height: ${startSize}px`,
      'object-fit: cover',
      'border-radius: 9999px',
      'pointer-events: none',
      'z-index: 99999',
      'will-change: transform, opacity',
      'box-shadow: 0 8px 32px rgba(212,175,55,0.5), 0 0 0 2px #D4AF37',
      'backface-visibility: hidden',
    ].join(';')

    // Initial transform = centered at source
    flyer.style.transform = `translate(${startX - startSize / 2}px, ${startY - startSize / 2}px) scale(1)`
    document.body.appendChild(flyer)
    activeFlyers.add(flyer)

    // Calculate a safe arc midpoint that stays within the viewport
    const viewportHeight = window.innerHeight
    const midX = (startX + endX) / 2
    const rawMidY = Math.min(startY, endY) - 80
    const midY = Math.max(20, Math.min(rawMidY, viewportHeight - 40))

    // Animate via Web Animations API
    const animation = flyer.animate(
      [
        {
          transform: `translate(${startX - startSize / 2}px, ${startY - startSize / 2}px) scale(1)`,
          opacity: 1,
        },
        {
          // Arc midpoint: a parabola peak for a satisfying flight
          transform: `translate(${midX - startSize / 2}px, ${midY - startSize / 2}px) scale(0.7)`,
          opacity: 1,
          offset: 0.55,
        },
        {
          transform: `translate(${endX - endSize / 2}px, ${endY - endSize / 2}px) scale(0.2)`,
          opacity: 0.1,
        },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.45, -0.15, 0.55, 1)',
        fill: 'forwards',
      }
    )

    const cleanup = () => {
      flyer.remove()
      activeFlyers.delete(flyer)
      options.onComplete?.()
      resolve()

      // Pulse the cart icon to confirm landing
      cartBtn.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' },
        ],
        { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
      )
    }

    animation.onfinish = cleanup
    // Safety: if animation is somehow cancelled, still clean up
    animation.oncancel = cleanup
  })
}
