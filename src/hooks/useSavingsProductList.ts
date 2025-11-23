import { useState, useEffect } from 'react';
import { SavingsProduct, toSavingsProduct } from 'models/SavingsProduct';
import { fetchSavingsProducts } from 'api/savingsApi';

export function useSavingsProductList() {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSavingsProducts()
      .then(dtos => {
        setProducts(dtos.map(toSavingsProduct));
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
