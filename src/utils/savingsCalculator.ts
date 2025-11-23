/**
 * 1,000원 단위 반올림
 */
const roundToThousand = (value: number) => Math.round(value / 1000) * 1000;

/**
 * 예상 수익 금액 계산
 * 공식: 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
 */
export function calculateExpectedAmount(monthlyAmount: number, term: number, annualRate: number): number {
  if (term === 0) {
    return 0;
  }

  // 연이자율이 퍼센트로 들어온다고 가정하고 100으로 나눔
  const rateDecimal = annualRate / 100;
  const result = monthlyAmount * term * (1 + rateDecimal * 0.5);

  return roundToThousand(result);
}

/**
 * 추천 월 납입 금액 계산
 * 공식: 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
 */
export function calculateRecommendedMonthly(targetAmount: number, term: number, annualRate: number): number {
  if (term === 0 || targetAmount === 0) {
    return 0;
  }

  const rateDecimal = annualRate / 100;
  // 분모가 0이 되는 것을 방지
  const result = targetAmount / (term * (1 + rateDecimal * 0.5));

  return roundToThousand(result);
}
