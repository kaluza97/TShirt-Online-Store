import styled from '@emotion/styled';
import {
  Breakpoints,
  Colors,
  FontSizes,
  FontWeights,
  ResetAutofill,
} from '@/styles/variables';
import { SxProps } from '@mui/system';

export const SignInFormWrapper = styled.div`
  @media (min-width: ${Breakpoints.desktop}) {
    width: 35rem;
  }
`;

export const inputText: SxProps = {
  fontSize: `${FontSizes.middle}`,
  paddingTop: '0.5rem',
  marginBottom: '2rem',
  color: `${Colors.blackLight}`,
  'input:-webkit-autofill': {
    WebkitBoxShadow: ResetAutofill,
  },
};

export const paragraph: SxProps = {
  fontSize: `${FontSizes.middle}`,
  textAlign: 'left',
  fontWeight: `${FontWeights.bold}`,
  color: `${Colors.blackLight}`,
};

export const submitButton: SxProps = {
  fontSize: `${FontSizes.small}`,
  color: `${Colors.white}`,
  fontWeight: `${FontWeights.bold}`,
  marginTop: '3rem',
  padding: '1rem',
};
