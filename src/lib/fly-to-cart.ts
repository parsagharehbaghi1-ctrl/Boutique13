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
}

/**
 * Animate an image flying from a source element to the cart icon.
 *
 * @param imageUrl  - The product image URL to fly
 * @param sourceEl  - The DOM element the flight starts from (e.g. product card / image)
 * @param options   - Optional duration / start size overrides
 */
export function flyToCart(
  imageUrl: string,
  sourceEl: HTMLElement | null,
  options: FlyOptions = {}
): void {
  if (typeof document === 'undefined') return

  const cartBtn = document.getElementById('cart-button')
  if (!cartBtn || !sourceEl) return

  const sourceRect = sourceEl.getBoundingClientRect()
  const targetRect = cartBtn.getBoundingClientRect()

  // Start position = center of source
  const startX = sourceRect.left + sourceRect.width / 2
  const startY = sourceRect.top + sourceRect.height / 2

  // End position = center of cart icon
  const endX = targetRect.left + targetRect.width / 2
  const endY = targetRect.top + targetRect.height / 2

  const startSize = options.startSize ?? Math.min(sourceRect.width, 140)
  const endSize = 24
  const duration = options.duration ?? 700

  // Create the flying image element
  const flyer = document.createElement('img')
  flyer.src = imageUrl
  flyer.alt = ''
  flyer.setAttribute('aria-hidden', 'true')
  flyer.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: ' + startSize + 'px',
    'height: ' + startSize + 'px',
    'object-fit: cover',
    'border-radius: 9999px',
    'pointer-events: none',
    'z-index: 9999',
    'will-change: transform, opacity',
    'box-shadow: 0 10px 30px rgba(212,175,55,0.4)',
    'border: 2px solid #D4AF37',
  ].join(';')

  // Initial transform = centered at source
  flyer.style.transform = `translate(${startX - startSize / 2}px, ${startY - startSize / 2}px) scale(1)`
  document.body.appendChild(flyer)

  // Animate via Web Animations API
  const animation = flyer.animate(
    [
      {
        transform: `translate(${startX - startSize / 2}px, ${startY - startSize / 2}px) scale(1)`,
        opacity: 1,
      },
      {
        // Arc midpoint — rise a bit for a nicer parabola
        transform: `translate(${(startX + endX) / 2 - startSize / 2}px, ${Math.min(startY, endY) - 60 - startSize / 2}px) scale(0.85)`,
        opacity: 1,
        offset: 0.6,
      },
      {
        transform: `translate(${endX - endSize / 2}px, ${endY - endSize / 2}px) scale(0.25)`,
        opacity: 0.2,
      },
    ],
    {
      duration,
      easing: 'cubic-bezier(0.5, -0.2, 0.6, 1)',
      fill: 'forwards',
    }
  )

  animation.onfinish = () => {
    flyer.remove()
    // Pulse the cart icon to confirm landing
    cartBtn.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.25)' },
        { transform: 'scale(1)' },
      ],
      { duration: 350, easing: 'ease' }
    )
  }
}
