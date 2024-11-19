import { FC } from 'react';
import {
  Border,
  FooterContainer,
  FooterContent,
  FooterSection,
  LinkStyled,
} from '@/components/Footer/Footer.styles';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { footerData } from '@/data/footer.data';
import { headerTextWhite, normalTextWhite } from '@/styles/global.styles';
import { FooterTransition } from '@/components/Footer/components/FooterTransition/FooterTransition.component';

export const Footer: FC = () => (
  <FooterContainer>
    <FooterTransition />
    <FooterContent>
      {footerData.map(({ header, links, socialLinks }) => (
        <FooterSection key={header}>
          <Typography sx={headerTextWhite}>{header}</Typography>
          <Border />
          {links &&
            links.map((link) => (
              <Typography key={link} sx={normalTextWhite}>
                {link}
              </Typography>
            ))}
          <div>
            {socialLinks &&
              socialLinks.map(({ src, href, text }) => (
                <LinkStyled key={src} href={href}>
                  <Image
                    src={src}
                    width={30}
                    height={30}
                    alt={`${text} logo`}
                  />
                </LinkStyled>
              ))}
          </div>
        </FooterSection>
      ))}
    </FooterContent>
  </FooterContainer>
);
