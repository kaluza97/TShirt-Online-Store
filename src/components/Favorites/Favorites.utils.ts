import { FavoriteItem } from '@/redux/slices/Favorites/Favorites.types';

export const checkIsProductFavorite = (
  productId: number,
  favorites: Array<FavoriteItem> | null
) => {
  return favorites?.some((favorite) => favorite.id === productId);
};
