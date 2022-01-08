export default function dateToLocale(value) {
  return new Date(value).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
