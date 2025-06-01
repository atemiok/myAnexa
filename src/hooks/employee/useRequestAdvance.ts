import { useState } from 'react';

export function useRequestAdvance() {
  const [submitting, setSubmitting] = useState(false);
  const maxAmount = 3500;

  function submitAdvance() {
    setSubmitting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmitting(false);
        resolve({ success: true });
      }, 1000);
    });
  }

  return { maxAmount, submitting, submitAdvance };
} 