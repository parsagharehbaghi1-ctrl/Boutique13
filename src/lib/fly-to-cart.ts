/**
 * Fly-to-cart animation utility.
 *
 * Creates a floating clone of the REAL product image (kept as a minimal
 * rounded-rectangle card with its natural aspect ratio) that animates from
 * the source element's position to the cart icon in the navbar, then
 * shrinks + fades into the cart. Uses the Web Animations API.
 */

interface FlyOptions {
  /** Duration of the flight in milliseconds */
  duration?: number
  /** Max width of the flying image (px). Defaults to min(source width, 170) */
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
 * Animate the product image flying from a source element to the cart icon.
 *
 * @param imageUrl  - The product image URL to fly
 * @param sourceEl  - The DOM element the flight starts from (e.g. product card / gallery)
 * @param options   - Optional duration / start size (max width) / onComplete overrides
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

    // Preserve the source image's aspect ratio so the real photo is visible
    const sourceW = sourceRect.width || 160
    const sourceH = sourceRect.height || 200
    const aspect = sourceH / sourceW

    const startW = options.startSize ?? Math.min(sourceW, 170)
    const startH = startW * aspect

    // Start position = center of source
    const startX = sourceRect.left + sourceRect.width / 2
    const startY = sourceRect.top + sourceRect.height / 2

    // End position = center of cart icon
    const endX = targetRect.left + targetRect.width / 2
    const endY = targetRect.top + targetRect.height / 2

    // Final scale so the card shrinks to ~42px wide when it drops into the cart
    const endW = 42
    const endScale = endW / startW
    const duration = options.duration ?? 750

    // Build the flyer as a rounded-rectangle card containing the real image
    const flyer = document.createElement('div')
    flyer.setAttribute('aria-hidden', 'true')
    flyer.style.position = 'fixed'
    flyer.style.top = '0'
    flyer.style.left = '0'
    flyer.style.width = startW + 'px'
    flyer.style.height = startH + 'px'
    flyer.style.borderRadius = '14px'
    flyer.style.overflow = 'hidden'
    flyer.style.pointerEvents = 'none'
    flyer.style.zIndex = '99999'
    flyer.style.willChange = 'transform, opacity'
    flyer.style.boxShadow = '0 12px 30px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(212,175,55,0.9)'
    flyer.style.backfaceVisibility = 'hidden'
    flyer.style.transformOrigin = 'center center'

    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = ''
    img.style.cssText =
      'width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;'
    flyer.appendChild(img)

    // Helper: with `translate(X,Y) scale(S)`, the element's center lands at
    // (X + S*startW/2, Y + S*startH/2). So to center at (cx,cy): X = cx - S*startW/2.
    const place = (cx: number, cy: number, s: number) =>
      `translate(${cx - (s * startW) / 2}px, ${cy - (s * startH) / 2}px) scale(${s})`

    // Initial transform = centered at source
    flyer.style.transform = place(startX, startY, 1)
    document.body.appendChild(flyer)
    activeFlyers.add(flyer)

    // Calculate a safe arc midpoint that stays within the viewport
    const viewportHeight = window.innerHeight
    const midX = (startX + endX) / 2
    const rawMidY = Math.min(startY, endY) - 90
    const midY = Math.max(20, Math.min(rawMidY, viewportHeight - 40))

    // Animate via Web Animations API — parabola arc, then shrink + drop into cart
    const animation = flyer.animate(
      [
        {
          transform: place(startX, startY, 1),
          opacity: 1,
          borderRadius: '14px',
        },
        {
          // Arc midpoint: a parabola peak for a satisfying flight, image clearly visible
          transform: place(midX, midY, 0.95),
          opacity: 1,
          borderRadius: '12px',
          offset: 0.55,
        },
        {
          // Drop into the cart — shrink to a small card
          transform: place(endX, endY, endScale),
          opacity: 0.3,
          borderRadius: '10px',
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
