/**
 * Form validation and normalization utilities
 */

export function validateFullName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters long.' };
  }
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  // Standard RFC 5322 compatible regex check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Enter a valid email address.' };
  }
  return { valid: true };
}

/**
 * Normalizes Indian and international phone numbers into clean +91XXXXXXXXXX format.
 * E.g. "9876543210" -> "+919876543210"
 * E.g. "09876543210" -> "+919876543210"
 * E.g. "+91 98765 43210" -> "+919876543210"
 */
export function normalizeWhatsAppNumber(phone: string): string {
  // Remove all spaces, hyphens, parentheses
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If starts with 0 and 11 digits total (e.g. 09876543210), strip leading 0
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  
  // If starts with +91
  if (cleaned.startsWith('+91')) {
    return cleaned;
  }
  
  // If starts with 91 and has 12 digits (e.g. 919876543210)
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // If 10 digits (e.g. 9876543210)
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }
  
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
}

export function validateWhatsAppNumber(phone: string): { valid: boolean; error?: string; normalized?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your WhatsApp number.' };
  }
  
  const normalized = normalizeWhatsAppNumber(trimmed);
  // Check if Indian format (+91 followed by 10 digits starting with 6-9)
  const indianRegex = /^\+91[6-9]\d{9}$/;
  // Also accept valid general international e.164 format (+ followed by 10 to 15 digits)
  const e164Regex = /^\+\d{10,15}$/;

  if (!indianRegex.test(normalized) && !e164Regex.test(normalized)) {
    return { 
      valid: false, 
      error: 'Enter a valid 10-digit WhatsApp number (e.g. 9876543210).' 
    };
  }
  
  return { valid: true, normalized };
}

export function validateCourseId(courseId: string): { valid: boolean; error?: string } {
  if (!courseId || (courseId !== 'ML-EN' && courseId !== 'HI-EN')) {
    return { valid: false, error: 'Please select a course to proceed.' };
  }
  return { valid: true };
}
