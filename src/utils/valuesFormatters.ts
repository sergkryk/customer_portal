export const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB', // You can change this to any currency code like EUR, GBP, etc.
});

export const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export function phoneNumberFormatter(number: string) {
  const cleaned = number.replace(/\D/g, ''); // Remove non-numeric characters
  const match = cleaned.match(/^(7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/); // Pattern for phone number
  if (match) {
    return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return number; // Return the original if it doesn't match the pattern
}

export function addressFormatter(string: string) {
  const parts = string.split(',');
  const trimmed = parts.map(el => el.trim())
  const [country,
    region,
    district,
    city,
    settlement,
    street,
    building,
    apartment,
    apartment2,
    apartment3,
    postalCode] = trimmed

  return `${city ? city : settlement}, ${street}, ${building}${apartment ? ', ' + apartment : ""}`
}