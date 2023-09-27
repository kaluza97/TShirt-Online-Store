import React, { FC } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useSelector } from '@/redux/hooks';
import { CustomAlert } from '@/components/Message/components/CustomAlert/CustomAlert.component';
import { headerTitle } from '@/components/Order/Order.styles';
import { ProductsList } from '@/components/Products/components/ProductsList/ProductsList.component';
import Image from 'next/image';
import { FavoritesWrapperContainer } from '@/components/Favorites/Favorites.styles';

export const FavoritesWrapper: FC = () => {
  const { data, loading, error } = useSelector((state) => state.favorites);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <CustomAlert
        alertType="error"
        alertMessage="The operation has failed. Please contact technical support."
      />
    );
  }

  return (
    <FavoritesWrapperContainer>
      {data && data.length > 0 ? (
        <>
          <Typography variant="h5" sx={headerTitle}>
            Your favorites:
          </Typography>
          <ProductsList
            categoryQuery={[
              {
                fieldPath: 'id',
                opStr: '==',
                value: data,
              },
            ]}
          />
        </>
      ) : (
        <>
          <Typography variant="h5" sx={headerTitle}>
            No favorite products
          </Typography>
          <Image
            src={`/assets/shirtWithBrokenHeart.jpg`}
            alt="shirt with broken heart"
            width={120}
            height={120}
            priority
          />
        </>
      )}
    </FavoritesWrapperContainer>
  );
};
