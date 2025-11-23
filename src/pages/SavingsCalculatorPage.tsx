import { useState } from 'react';
import { Border, ListHeader, ListRow, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { useSavingsCalculator } from 'hooks/useSavingsCalculator';
import { SavingsProductList } from 'components/SavingsProductList';
import { CalculationResult } from 'components/CalculationResult';

export function SavingsCalculatorPage() {
  const { formState, formActions, data, selection, result } = useSavingsCalculator();
  const [currentTab, setCurrentTab] = useState<'products' | 'results'>('products');

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formState.targetAmount}
        onChange={formActions.handleTargetAmountChange}
      />
      <Spacing size={16} />

      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formState.monthlyAmount}
        onChange={formActions.handleMonthlyAmountChange}
      />
      <Spacing size={16} />

      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={formState.savingsTerm}
        onChange={val => formActions.setSavingsTerm(val as number)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={val => setCurrentTab(val as 'products' | 'results')}>
        <Tab.Item value="products" selected={currentTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={currentTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {currentTab === 'products' ? (
        <SavingsProductList
          products={data.products}
          loading={data.loading}
          selectedProductId={selection.selectedProductId}
          onSelectProduct={selection.setSelectedProductId}
        />
      ) : (
        <>
          {selection.selectedProduct && result ? (
            <CalculationResult
              expectedAmount={result.expectedAmount}
              difference={result.difference}
              recommendation={result.recommendation}
            />
          ) : (
            <>
              <Spacing size={8} />
              <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
            </>
          )}

          <Spacing size={8} />
          <Border height={16} />
          <Spacing size={8} />

          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
          <Spacing size={12} />

          <SavingsProductList
            products={data.recommendedProducts}
            loading={data.loading}
            selectedProductId={selection.selectedProductId}
            onSelectProduct={selection.setSelectedProductId}
          />

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
