import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number in the format +XX XXXX XXXX XXX
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+\d{1,3}\s\d{3,4}\s\d{3,4}\s\d{3}$/;
  return phoneRegex.test(phone);
}

/**
 * Formats a phone number to the required format
 */
export function formatPhoneNumber(input: string): string {
  // Remove all non-digit characters except the plus sign
  const digitsOnly = input.replace(/[^\d+]/g, '');
  
  if (!digitsOnly.startsWith('+')) {
    return '+' + digitsOnly;
  }
  
  return digitsOnly;
}

/**
 * Converts HTML content to plain text
 */
export function htmlToPlainText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
