import styled from 'styled-components/native';
import { metrics } from '../../styles';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: metrics.BIG,
    paddingTop: metrics.XXBIG,
  },
})`
  flex: 1;
  background: #f9f9f9;
`;

export const ButtonsView = styled.View`
  padding-bottom: 30px;
  width: 90%;
  align-items: center;
  margin-top: ${({ m }) => (m ? metrics.XBIG : metrics.SMALL)};
`;
