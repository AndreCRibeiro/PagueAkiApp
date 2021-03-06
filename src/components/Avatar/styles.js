import styled from 'styled-components/native';
import { colors, metrics } from '../../styles';

export const AvatarView = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 10px;
`;

export const ButtonChangeAvatar = styled.TouchableOpacity`
  width: 100px;
  height: ${(props) => (props.photoIsSet ? '100px' : '100px')};
  margin-top: ${(props) => (props.photoIsSet ? '5px' : 0)};
  border-radius: 200px;
  border-width: 3px;
  border-color: #77a93a;
  align-items: center;
  justify-content: center;
  background: #c4c4c4;
  elevation: 10;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 200px;
`;

export const AvatarText = styled.Text`
  font-weight: bold;
  font-size: 13.5px;
`;
