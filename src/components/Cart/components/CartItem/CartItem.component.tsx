import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import MinusIcon from '@mui/icons-material/Remove';
import { Size } from '@/redux/slices/Cart/Cart.types';
import {
  removeFromCart,
  addToCart,
  openConfirmModal,
  closeConfirmModal,
} from '@/redux/slices/Cart/Cart.slice';
import { useDispatch, useSelector } from '@/redux/hooks';
import { ConfirmModal } from '@/components/ConfirmModal/ConfirmModal.component';
import { CartItemProps } from '@/components/Cart/Cart.types';
import {
  ButtonContainer,
  CartItemsContainer,
  DescriptionContainer,
} from '@/components/Cart/Cart.styles';
import { CustomAlert } from '@/components/Message/components/CustomAlert/CustomAlert.component';
import { button, normalTextBlack } from '@/styles/global.styles';

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { id, name, img, price, quantities } = item;
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { data } = useSelector((state) => state.productById);
  const { lastItemToDelete } = useSelector((state) => state.cart);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const handleRemoveFromCart = (id: number, size: Size, quantity: number) => {
    if (quantity === 1) {
      dispatch(openConfirmModal({ id, size }));
    } else {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const handleAddToCart = (
    id: number,
    size: Size,
    img: string,
    name: string,
    price: number,
    quantity: number
  ) => {
    if (data && data.totalQuantity && data.totalQuantity[size] !== undefined) {
      if (data.totalQuantity[size] > quantity) {
        dispatch(addToCart({ id, size, img, name, price }));
      } else {
        setIsAlertVisible(true);
      }
    } else {
      setIsAlertVisible(true);
    }
  };

  const handleConfirmModal = () => {
    if (lastItemToDelete) {
      dispatch(removeFromCart(lastItemToDelete));
    }
  };

  const handleCloseConfirmModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleRedirectToDetail = (id: number) => {
    push(`/products/${id}`);
  };

  return (
    <Box>
      <CustomAlert
        alertType="warning"
        isVisible={isAlertVisible}
        alertMessage="There are no more products in this size."
      />
      {Object.entries(quantities).map(([size, quantity], index) => (
        <div key={name + index}>
          {quantity ? (
            <CartItemsContainer>
              <Image
                src={img}
                alt={name}
                width={110}
                height={150}
                priority
                onClick={() => handleRedirectToDetail(id)}
              />
              <DescriptionContainer>
                <Typography component="h3" sx={normalTextBlack}>
                  Name: {name}
                </Typography>
                <Typography component="h3" sx={normalTextBlack}>
                  Size: {size}
                </Typography>
                <Typography component="h3" sx={normalTextBlack}>
                  Quantity: {quantity}
                </Typography>
                <Typography component="h3" sx={normalTextBlack}>
                  Price: {price * quantity} $
                </Typography>
              </DescriptionContainer>
              <ButtonContainer>
                <Button
                  variant="contained"
                  sx={button}
                  endIcon={<AddIcon />}
                  onClick={() =>
                    handleAddToCart(
                      id,
                      size as Size,
                      img,
                      name,
                      price,
                      quantity
                    )
                  }
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={button}
                  endIcon={<MinusIcon />}
                  onClick={() =>
                    handleRemoveFromCart(id, size as Size, quantity)
                  }
                >
                  Remove
                </Button>
              </ButtonContainer>

              <ConfirmModal
                open={!!lastItemToDelete}
                onClose={handleCloseConfirmModal}
                onConfirm={handleConfirmModal}
                title="Confirm Removal"
                message="Are you sure you want to remove this item from the cart?"
              />
            </CartItemsContainer>
          ) : (
            <></>
          )}
        </div>
      ))}
    </Box>
  );
};
