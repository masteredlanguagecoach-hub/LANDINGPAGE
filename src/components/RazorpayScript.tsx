'use client';

import Script from 'next/script';

export default function RazorpayScript() {
  return (
    <Script
      id="razorpay-checkout-sdk"
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="lazyOnload"
      onLoad={() => {
        console.log('[Razorpay SDK] Loaded successfully');
      }}
      onError={(e) => {
        console.error('[Razorpay SDK] Failed to load script:', e);
      }}
    />
  );
}
