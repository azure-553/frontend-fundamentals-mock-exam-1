import { useState } from 'react';
import {
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { useSavingsCalculator } from 'hooks/useSavingsCalculator';
import { SavingsProductList } from 'components/SavingsProductList';
import { SavingsResultDashboard } from 'components/SavingsResultDashboard';

export function SavingsCalculatorPage() {
  const { formState, formActions, data, selection } = useSavingsCalculator();
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
          {selection.selectedProductId ? (
            <SavingsResultDashboard expectedAmount={1000000} difference={-500000} recommendation={100000} />
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

          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'기본 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 3.2%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`100,000원 ~ 500,000원 | 12개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'고급 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 2.8%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`50,000원 ~ 1,000,000원 | 24개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />
          <Spacing size={40} />
        </>
      )}
    </>
  );
}
