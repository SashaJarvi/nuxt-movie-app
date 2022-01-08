export default function currencyToLocale(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
