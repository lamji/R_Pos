export function generateUniqueBarcode(): string {
  const now = new Date();

  // Format date and time as YYYYMMDDHHMMSS
  const formattedDate = now
    .toISOString()
    .replace(/[-T:.Z]/g, '') // Remove unwanted characters
    .substring(0, 14); // Keep up to YYYYMMDDHHMMSS

  // Generate a random 4-digit number for added uniqueness
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Random number between 1000 and 9999

  // Combine date and random number
  const barcode = `${formattedDate}${randomPart}`;

  return barcode;
}
