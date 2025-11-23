import { useMemo, useState } from 'react';
import { useSavingsProductList } from './useSavingsProductList';
import { useSavingsForm } from './useSavingsForm';

export function useSavingsCalculator() {
  const { products, loading } = useSavingsProductList();

  const { state: formState, actions: formActions, utils } = useSavingsForm();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    // 로딩 중이면 계산할 필요 없음
    if (loading) {
      return [];
    }

    return products.filter(product => {
      const amountNum = utils.getNumericMonthlyAmount();
      const hasAmount = formState.monthlyAmount !== '';

      const isValidAmount = !hasAmount || (amountNum >= product.rawMinAmount && amountNum <= product.rawMaxAmount);
      const isValidTerm = product.term === formState.savingsTerm;

      return isValidAmount && isValidTerm;
    });
  }, [products, loading, formState.monthlyAmount, formState.savingsTerm, utils]);

  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  return {
    formState,
    formActions,
    data: { products: filteredProducts, loading },
    selection: { selectedProductId, setSelectedProductId, selectedProduct },
  };
}
