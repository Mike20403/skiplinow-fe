export function maskPhoneNumber(phoneNumber: string, maskLength = 4) {
  const visibleLength = phoneNumber.length - maskLength;
  const maskedSection = '*'.repeat(maskLength);
  return phoneNumber.substring(0, visibleLength) + maskedSection;
}
export function capitalizeFirstLetter(string: string): string {
  if (string.length === 0) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

