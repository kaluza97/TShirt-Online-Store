import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { fetchProducts } from '@/redux/slices/Products/Products.thunk';
import { ProductsItem } from '@/components/Products/components/ProductsItem/ProductsItem.component';
import { useDispatch, useSelector } from '@/redux/hooks';
import {
  ProductType,
  ProductsListProps,
} from '@/components/Products/Products.types';
import {
  ProductsListContainer,
  buttonWithMargin,
} from '@/components/Products/Products.styles';
import { checkIsProductFavorite } from '@/components/Favorites/Favorites.utils';

export const ProductsList: FC<ProductsListProps> = ({
  categoryQuery,
  isPaginate,
}) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.data);
  const [limit, setLimit] = useState<number>(8);
  const [products, setProducts] = useState<Array<ProductType>>(data);

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryQuery: categoryQuery,
        itemsLimit: limit,
      })
    );
  }, [categoryQuery, limit]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!data) {
    return null;
  }

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 32);
  };

  return (
    <>
      <ProductsListContainer>
        {products.map(({ id, img, name, price, specialPrice }) => (
          <ProductsItem
            key={name}
            id={id}
            img={img}
            name={name}
            price={price}
            specialPrice={specialPrice}
            isFavorite={checkIsProductFavorite(id, favorites)}
          />
        ))}
      </ProductsListContainer>
      {isPaginate && (
        <Button
          variant="contained"
          sx={buttonWithMargin}
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )}
    </>
  );
};
