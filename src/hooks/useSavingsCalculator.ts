import { useMemo, useState } from 'react';
import { useSavingsProductList } from './useSavingsProductList';
import { useSavingsForm } from './useSavingsForm';
import { calculateExpectedAmount, calculateRecommendedMonthly } from '../utils/savingsCalculator';

export function useSavingsCalculator() {
  const { products, loading } = useSavingsProductList();
  const { state: formState, actions: formActions, utils } = useSavingsForm();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  const calculationResult = useMemo(() => {
    if (!selectedProduct) {
      return null;
    }

    const monthlyAmount = utils.getNumericMonthlyAmount();
    const targetAmount = utils.getNumericTargetAmount();
    const term = formState.savingsTerm;
    const rate = selectedProduct.rate;

    const expected = calculateExpectedAmount(monthlyAmount, term, rate);
    const recommend = calculateRecommendedMonthly(targetAmount, term, rate);
    const diff = targetAmount - expected;

    return {
      expectedAmount: expected,
      difference: diff,
      recommendation: recommend,
    };
  }, [selectedProduct, formState.savingsTerm, utils]);

  return {
    formState,
    formActions,
    data: { products, loading },
    selection: { selectedProductId, setSelectedProductId, selectedProduct },
    result: calculationResult,
  };
}
