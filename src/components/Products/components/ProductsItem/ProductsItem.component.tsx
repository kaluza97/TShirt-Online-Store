import React, { FC, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import {
  Img,
  ProductImageWrapper,
  favoriteIcon,
  favoriteIconButton,
  imageText,
  productBox,
} from '@/components/Products/Products.styles';
import { useRouter } from 'next/router';
import { ProductItemsProps } from '@/components/Products/Products.types';
import { displayPriceOrSpecialPrice } from '@/components/Products/Products.utils';
import { useDispatch, useSelector } from '@/redux/hooks';
import { AuthContext } from '@/context/Auth.context';
import {
  removeFavorite,
  saveFavorite,
} from '@/redux/slices/Favorites/Favorites.thunk';
import { FavoriteItem } from '@/redux/slices/Favorites/Favorites.types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ProductsItem: FC<ProductItemsProps> = ({
  id,
  img,
  name,
  price,
  specialPrice,
}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const favorites = useSelector((state) => state.favorites.data);

  const handleProductClick = () => {
    push(`/products/${id}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const favoriteItem: FavoriteItem = {
      id: id,
      img: img,
      name: name,
      price: specialPrice ? specialPrice : price,
    };

    if (user) {
      if (favorites?.some((favorite) => favorite.id === id)) {
        dispatch(removeFavorite({ uid: user.uid, favorite: favoriteItem }));
      } else {
        dispatch(saveFavorite({ uid: user.uid, favorite: favoriteItem }));
      }
    }
  };

  return (
    <Box sx={productBox} onClick={handleProductClick}>
      <ProductImageWrapper>
        <Img src={img} alt={name} width={250} height={350} priority />

        <IconButton
          aria-label={
            favorites?.some((favorite) => favorite.id === id)
              ? 'remove from favorites'
              : 'add to favorites'
          }
          sx={favoriteIconButton}
          onClick={handleFavoriteClick}
        >
          {favorites?.some((favorite) => favorite.id === id) ? (
            <FavoriteIcon sx={favoriteIcon} />
          ) : (
            <FavoriteBorderIcon sx={favoriteIcon} />
          )}
        </IconButton>
      </ProductImageWrapper>
      <Typography sx={imageText}>{name}</Typography>
      {displayPriceOrSpecialPrice({ price, specialPrice })}
    </Box>
  );
};
