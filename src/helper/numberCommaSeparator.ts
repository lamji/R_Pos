export function formatNumberWithPeso(value: number | string): string {
  const parsedValue = parseFloat(value as string);
  if (isNaN(parsedValue)) return 'Invalid Number';
  return `₱ ${parsedValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
