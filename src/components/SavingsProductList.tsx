import { ListRow, colors, Assets } from 'tosslib';
import { SavingsProduct } from 'models/SavingsProduct';

interface Props {
  products: SavingsProduct[];
  loading: boolean;
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function SavingsProductList({ products, loading, selectedProductId, onSelectProduct }: Props) {
  if (loading) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중입니다..." />} />;
  }

  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => {
        const isSelected = selectedProductId === product.id;
        return (
          <ListRow
            key={product.id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={product.title}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={product.rateText}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${product.amountRange} | ${product.term}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
            onClick={() => onSelectProduct(product.id)}
          />
        );
      })}
    </>
  );
}
