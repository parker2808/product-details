/**
 * Formats a price from cents to a readable currency format
 * @param priceInCents - The price value in cents (e.g., 200000)
 * @param currency - The currency symbol or code (default: '$')
 * @param locale - The locale for number formatting (default: 'en-US')
 * @returns Formatted price string (e.g., '$2,000')
 */
export function formatCurrency(
  priceInCents: number,
  currency: string = '$',
  locale: string = 'en-US'
): string {
  if (priceInCents === null || priceInCents === undefined || isNaN(priceInCents)) {
    return `${currency}0`
  }

  // Convert cents to dollars
  const priceInDollars = priceInCents / 100

  // Format with locale-specific thousand separators and decimal places
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })

  const formattedNumber = formatter.format(priceInDollars)

  return `${currency}${formattedNumber}`
}

/**
 * Formats a price from cents to a readable format without currency symbol
 * @param priceInCents - The price value in cents (e.g., 200000)
 * @param locale - The locale for number formatting (default: 'en-US')
 * @returns Formatted price string without currency symbol (e.g., '2,000')
 */
export function formatPrice(priceInCents: number, locale: string = 'en-US'): string {
  if (priceInCents === null || priceInCents === undefined || isNaN(priceInCents)) {
    return '0'
  }

  // Convert cents to dollars
  const priceInDollars = priceInCents / 100

  // Format with locale-specific thousand separators
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })

  return formatter.format(priceInDollars)
}

/**
 * Formats a price range from cents to readable format
 * @param minPriceInCents - The minimum price in cents
 * @param maxPriceInCents - The maximum price in cents
 * @param currency - The currency symbol or code (default: '$')
 * @param locale - The locale for number formatting (default: 'en-US')
 * @returns Formatted price range string (e.g., '$1,000 - $2,000')
 */
export function formatPriceRange(
  minPriceInCents: number,
  maxPriceInCents: number,
  currency: string = '$',
  locale: string = 'en-US'
): string {
  const minFormatted = formatCurrency(minPriceInCents, currency, locale)
  const maxFormatted = formatCurrency(maxPriceInCents, currency, locale)

  return `${minFormatted} - ${maxFormatted}`
}
