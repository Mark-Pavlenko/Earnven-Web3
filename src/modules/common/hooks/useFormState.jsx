import { useState } from 'react';

const useFormState = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  return {
    isSubmitting,
    setSubmitting,
    success,
    setSuccess,
    errors,
    setErrors,
  };
};

export default useFormState;
