import { SxProps } from '@mui/material';
import { FontSizes, FontFamily, FontWeights, Colors } from '@/styles/variables';
import Link from 'next/link';
import styled from '@emotion/styled';

export const FlexContainer = styled.div`
  display: flex;
  min-height: 50rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LinkText = styled(Link)`
  font-size: ${FontSizes.small};
  font-family: ${FontFamily.sans};
  text-decoration: underline;
`;

export const LinkTextWhite = styled(LinkText)`
  color: ${Colors.white};
`;

export const normalText: SxProps = {
  fontSize: FontSizes.middle,
  fontFamily: FontFamily.sans,
  fontWeight: FontWeights.normal,
  marginBottom: '0.5rem',
};

export const boldText: SxProps = {
  fontSize: FontSizes.middle,
  fontFamily: FontFamily.sans,
  fontWeight: FontWeights.bold,
  color: Colors.blackLight,
};

export const pointerText: SxProps = {
  ...normalText,
  color: Colors.white,
  cursor: 'pointer',
};

export const normalTextPrimary: SxProps = {
  ...normalText,
  color: Colors.primary,
};

export const normalTextRed: SxProps = {
  ...normalText,
  color: Colors.red,
};

export const normalTextWhite: SxProps = {
  ...normalText,
  color: Colors.white,
};

export const normalTextBlack: SxProps = {
  ...normalText,
  color: Colors.blackLight,
};

export const headerText: SxProps = {
  fontSize: FontSizes.large,
  fontFamily: FontFamily.sans,
  fontWeight: FontWeights.bold,
  marginBottom: '1rem',
};

export const headerTextBlack: SxProps = {
  ...headerText,
  color: Colors.blackLight,
};

export const headerTextWhite: SxProps = {
  ...headerText,
  color: Colors.white,
};

export const logoText: SxProps = {
  FontSize: FontSizes.large,
  fontFamily: FontFamily.pacifico,
  color: Colors.blackLight,
  fontWeight: FontWeights.bold,
};

export const button: SxProps = {
  fontFamily: FontFamily.sans,
  fontSize: FontSizes.small,
  fontWeight: FontWeights.bold,
  color: Colors.white,
  padding: '1rem',
  height: '4rem',
};
