import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { productContainer } from '@/components/Products/Products.styles';
import { ProductsList } from '@/components/Products/components/ProductsList/ProductsList.component';
import { FlexContainer, headerTextBlack } from '@/styles/global.styles';
import { menAndWomanCategories } from '@/data/category.data';

export const ProductsWrapper: FC = () => (
  <FlexContainer>
    <Typography component="h3" sx={headerTextBlack}>
      Our most recomended products
    </Typography>
    <Box sx={productContainer}>
      <ProductsList categoryQuery={menAndWomanCategories} isPaginate={false} />
    </Box>
  </FlexContainer>
);
