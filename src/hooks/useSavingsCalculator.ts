import { useMemo, useState } from 'react';
import { useSavingsProductList } from './useSavingsProductList';
import { useSavingsForm } from './useSavingsForm';
import { calculateExpectedAmount, calculateRecommendedMonthly } from '../utils/savingsCalculator';

export function useSavingsCalculator() {
  const { products, loading } = useSavingsProductList();
  const { state: formState, actions: formActions, utils } = useSavingsForm();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    // 데이터가 로딩 중이거나 없으면 빈 배열 반환
    if (loading) {
      return [];
    }

    return products.filter(product => {
      const monthlyAmount = utils.getNumericMonthlyAmount();
      const hasAmount = formState.monthlyAmount !== '';

      // 금액 조건: 입력값이 없거나(모든 상품 노출), 입력값이 상품의 최소~최대 한도 내에 있어야 함
      const isValidAmount =
        !hasAmount || (monthlyAmount >= product.rawMinAmount && monthlyAmount <= product.rawMaxAmount);

      // 기간 조건: 사용자가 선택한 저축 기간과 일치해야 함
      const isValidTerm = product.term === formState.savingsTerm;

      return isValidAmount && isValidTerm;
    });
  }, [products, loading, formState.monthlyAmount, formState.savingsTerm, utils]);

  const recommendedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => b.rate - a.rate).slice(0, 2);
  }, [filteredProducts]);

  const selectedProduct = useMemo(() => {
    return filteredProducts.find(p => p.id === selectedProductId) || null;
  }, [filteredProducts, selectedProductId]);

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
    data: {
      products: filteredProducts,
      recommendedProducts,
      loading,
    },
    selection: { selectedProductId, setSelectedProductId, selectedProduct },
    result: calculationResult,
  };
}
