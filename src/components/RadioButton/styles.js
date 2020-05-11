import styled from 'styled-components';
import TextInputMask from 'react-native-text-input-mask';
import { colors, metrics } from '../../styles';

export const Title = styled.Text`
  color: ${colors.DARK};
  margin-bottom: ${metrics.XSMALL}px;
  font-size: 14px;
  align-self: flex-start;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  padding-left: ${metrics.XSMALL};
  color: ${colors.RED};
  margin-bottom: ${metrics.XXSMALL}px;
  align-self: flex-start;
`;

export const RadioContainer = styled.View`
  flex-direction: row;
  width: 80%;
  height: 50px;
  margin-bottom: ${metrics.BIG};
`;

export const OptionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ checked }) =>
    checked ? colors.BACKGROUND : colors.PRIMARY};
`;

export const OptionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;