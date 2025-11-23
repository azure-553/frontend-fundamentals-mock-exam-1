import { useState } from 'react';

export function useSavingsForm() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingsTerm, setSavingsTerm] = useState(12);

  const getNumericMonthlyAmount = () => Number(monthlyAmount.replace(/[^\d]/g, ''));
  const getNumericTargetAmount = () => Number(targetAmount.replace(/[^\d]/g, ''));

  const createAmountChangeHandler = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^\d]/g, '');
    const formatted = numbersOnly ? Number(numbersOnly).toLocaleString() : '';
    setter(formatted);
  };

  return {
    state: { targetAmount, monthlyAmount, savingsTerm },
    actions: {
      setTargetAmount,
      setMonthlyAmount,
      setSavingsTerm,
      handleTargetAmountChange: createAmountChangeHandler(setTargetAmount),
      handleMonthlyAmountChange: createAmountChangeHandler(setMonthlyAmount),
    },
    utils: { getNumericMonthlyAmount, getNumericTargetAmount },
  };
}
