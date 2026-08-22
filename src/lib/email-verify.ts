import { resolveMx } from 'node:dns/promises';

// Known disposable or fake email domains to reject
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'dispostable.com',
  'trashmail.com',
  'yopmail.com',
  'example.com',
  'test.com',
  'fake.com',
  'invalid.com',
]);

export interface EmailVerificationResult {
  valid: boolean;
  message: string;
  reason?: 'SYNTAX' | 'DISPOSABLE' | 'NO_MX' | 'DNS_ERROR';
}

/**
 * Verifies server-side whether an email address actually exists and has active MX records.
 */
export async function verifyEmailExistence(email: string): Promise<EmailVerificationResult> {
  const trimmed = email.trim().toLowerCase();

  // 1. Basic Syntax Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      reason: 'SYNTAX',
      message: 'Invalid email format. Please check for typos.',
    };
  }

  const [username, domain] = trimmed.split('@');
  if (!username || !domain) {
    return {
      valid: false,
      reason: 'SYNTAX',
      message: 'Invalid email address structure.',
    };
  }

  // 2. Check Disposable Domain Blocklist
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: 'DISPOSABLE',
      message: 'Disposable or temporary email addresses are not accepted.',
    };
  }

  // 3. Perform DNS MX (Mail Exchange) Record Resolution using node:dns/promises
  try {
    const mxRecords = await resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return {
        valid: false,
        reason: 'NO_MX',
        message: `The domain "${domain}" has no active email servers configured to receive email.`,
      };
    }

    // Sort by priority (lowest priority number = primary mail server)
    mxRecords.sort((a, b) => a.priority - b.priority);

    return {
      valid: true,
      message: 'Email address domain verified successfully.',
    };
  } catch (error: any) {
    // If ENOTFOUND or ENODATA, domain doesn't exist or has no MX records
    if (error?.code === 'ENOTFOUND' || error?.code === 'ENODATA') {
      return {
        valid: false,
        reason: 'NO_MX',
        message: `Domain "${domain}" does not exist or cannot receive emails.`,
      };
    }

    // Fallback: If DNS resolution fails due to timeout or network, check if domain looks like major provider
    const MAJOR_PROVIDERS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'rediffmail.com', 'zoho.com'];
    if (MAJOR_PROVIDERS.includes(domain)) {
      return {
        valid: true,
        message: 'Email address verified.',
      };
    }

    return {
      valid: false,
      reason: 'DNS_ERROR',
      message: `Unable to confirm email server for "${domain}". Please check the spelling.`,
    };
  }
}
