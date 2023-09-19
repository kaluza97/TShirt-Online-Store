import React, { FC, useContext, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { AuthContext } from '@/context/Auth.context';
import { useDispatch, useSelector } from '@/redux/hooks';
import { CustomAlert } from '@/components/Message/components/CustomAlert/CustomAlert.component';
import { headerTitle } from '@/components/Order/Order.styles';
import { fetchFavorites } from '@/redux/slices/Favorites/fetch/Favorites.thunk';
import { ProductsList } from '../Products/components/ProductsList/ProductsList.component';
import Image from 'next/image';
import { FavoritesWrapperContainer } from './Favorites.styles';

export const FavoritesWrapper: FC = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user]);

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
      {data?.length ? (
        <>
          <Typography variant="h5" sx={headerTitle}>
            Your favorites:
          </Typography>
          <ProductsList
            queryCondition={{
              fieldPath: 'id',
              opStr: '==',
              value: data,
            }}
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
