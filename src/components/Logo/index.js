import React from 'react';
import { LogoImage } from './styles';
import { Imgs } from '../../assets';

export const Logo = ({ big, marBottom, source }) => (
  <LogoImage
    source={source || Imgs.LOGO_BRANCA2}
    big={big}
    marBottom={marBottom}
  />
);
