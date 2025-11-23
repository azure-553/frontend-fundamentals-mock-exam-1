import { useState } from 'react';

export function useSavingsForm() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingsTerm, setSavingsTerm] = useState(12);

  const getNumericMonthlyAmount = () => {
    return Number(monthlyAmount.replace(/,/g, ''));
  };

  return {
    state: { targetAmount, monthlyAmount, savingsTerm },
    actions: { setTargetAmount, setMonthlyAmount, setSavingsTerm },
    utils: { getNumericMonthlyAmount },
  };
}
