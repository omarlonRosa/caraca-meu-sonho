// src/components/PasswordStrengthIndicator.tsx
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface PasswordStrengthProps {
  password?: string;
}

const criteria = {
  length: { regex: /.{8,}/, text: 'Pelo menos 8 caracteres' },
  uppercase: { regex: /[A-Z]/, text: 'Pelo menos uma letra maiúscula' },
  lowercase: { regex: /[a-z]/, text: 'Pelo menos uma letra minúscula' },
  number: { regex: /[0-9]/, text: 'Pelo menos um número' },
  special: { regex: /[@$!%*?&]/, text: 'Pelo menos um caractere especial' },
};

export function PasswordStrengthIndicator({ password = '' }: PasswordStrengthProps) {
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setValidations({
      length: criteria.length.regex.test(password),
      uppercase: criteria.uppercase.regex.test(password),
      lowercase: criteria.lowercase.regex.test(password),
      number: criteria.number.regex.test(password),
      special: criteria.special.regex.test(password),
    });
  }, [password]);

  return (
    <div className="p-4 mt-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600">
      <ul className="space-y-2">
        {Object.entries(criteria).map(([key, value]) => (
          <li key={key} className={`flex items-center text-sm transition-colors ${
              // @ts-ignore
              validations[key] ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
            { // @ts-ignore
              validations[key] 
                ? <FaCheckCircle className="mr-2" /> 
                : <FaTimesCircle className="mr-2" />
            }
            {value.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
