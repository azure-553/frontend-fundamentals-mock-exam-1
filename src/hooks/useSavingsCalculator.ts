import { useState, useEffect, useMemo } from 'react';
import { SavingsProduct, toSavingsProduct, SavingsProductDto } from '../models/SavingsProduct';

export function useSavingsCalculator() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [savingsTerm, setSavingsTerm] = useState(12);

  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/savings-products')
      .then(res => res.json())
      .then((data: SavingsProductDto[]) => {
        setProducts(data.map(toSavingsProduct));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const amountNum = Number(monthlyAmount);
      const hasAmount = monthlyAmount !== '';

      const isValidAmount = !hasAmount || (amountNum >= product.rawMinAmount && amountNum <= product.rawMaxAmount);
      const isValidTerm = product.term === savingsTerm;

      return isValidAmount && isValidTerm;
    });
  }, [products, monthlyAmount, savingsTerm]);

  return {
    formState: { targetAmount, monthlyAmount, savingsTerm },
    formActions: { setTargetAmount, setMonthlyAmount, setSavingsTerm },
    data: { products: filteredProducts, loading },
  };
}
