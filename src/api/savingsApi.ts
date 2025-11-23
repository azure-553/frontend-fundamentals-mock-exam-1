import { SavingsProductDto } from 'models/SavingsProduct';

export async function fetchSavingsProducts(): Promise<SavingsProductDto[]> {
  const response = await fetch('/api/savings-products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
