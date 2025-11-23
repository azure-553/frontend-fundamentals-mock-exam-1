export interface SavingsProductDto {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export interface SavingsProduct {
  id: string;
  title: string;
  rateText: string;
  amountRange: string;
  term: number;
  // 계산 로직을 위해 원시값도 남겨둠
  rawMinAmount: number;
  rawMaxAmount: number;
}

export function toSavingsProduct(dto: SavingsProductDto): SavingsProduct {
  return {
    id: dto.id,
    title: dto.name,
    rateText: `연 이자율: ${dto.annualRate}%`,
    amountRange: `${dto.minMonthlyAmount.toLocaleString()}원 ~ ${dto.maxMonthlyAmount.toLocaleString()}원`,
    term: dto.availableTerms,
    rawMinAmount: dto.minMonthlyAmount,
    rawMaxAmount: dto.maxMonthlyAmount,
  };
}
