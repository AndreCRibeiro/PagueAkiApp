/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import * as yup from 'yup';
// logic
import { useCommons, useValidation, useLazyFetch } from '../../hooks';
import { useAuth } from '../../global';
// ui
import { Input, Button, Logo, Avatar } from '../../components';
import { Container, ButtonsView } from './styles';
import Endpoints, { api } from '../../services';
import { Imgs } from '../../assets';

const schema = {
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  phone: yup.string().required().min(11), // mascaras
};

function SimpleForm() {
  const [errorValidation, validade] = useValidation(schema);
  const { navigation, route } = useCommons();
  const { product } = route.params;
  const { fetchAuth } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  console.tron.log(product);

  const [fetch, { error, response, loading }] = useLazyFetch(
    Endpoints.postSignUp,
    user
  );
  const handleFetchSuccess = useCallback(() => {
    navigation.navigate('Login');
  }, [response]);

  useEffect(() => {
    if (!errorValidation && !response) {
      fetch();
    }
    if (response) {
      handleFetchSuccess();
    }
  }, [response, errorValidation]);

  const handleSignUp = useCallback(() => validade(user), [
    user,
    navigation,
    errorValidation,
  ]);

  const handleCancel = useCallback(() => navigation.navigate('Home'), []);

  return (
    <Container>
      <Logo
        source={
          product.value === 'PAGUEAKI' ? Imgs.LOGO_BRANCA2 : Imgs.LOGO_MEDICACAO
        }
      />
      {product.value === 'PAGUEAKI' && (
        <>
          <Input
            keyRef="name"
            onChangeText={setUser}
            value={user.name}
            placeholder="Usuário Exemplo"
            title="Nome"
            outline
            error={errorValidation.name}
          />
          <Input
            keyRef="email"
            onChangeText={setUser}
            value={user.email}
            placeholder="exemplo@exemplo.com"
            title="Email"
            outline
            error={errorValidation.email}
          />
          <Input
            keyRef="phone"
            onChangeText={setUser}
            value={user.phone}
            placeholder="(61) 99999-8888"
            title="Celular"
            outline
            error={errorValidation.phone}
          />
          <ButtonsView m>
            <Button text="SOLICITAR" handleOnPress={handleSignUp} />
            <Button
              text="Cancelar"
              tbutton
              tcolor
              handleOnPress={handleCancel}
            />
          </ButtonsView>
        </>
      )}
      {product.value === 'MEDICACAO' && (
        <>
          <Input
            keyRef="name"
            onChangeText={setUser}
            value={user.name}
            placeholder="Usuário Exemplo"
            title="Nome"
            outline
            error={errorValidation.name}
          />
          <Input
            keyRef="email"
            onChangeText={setUser}
            value={user.email}
            placeholder="exemplo@exemplo.com"
            title="Email"
            outline
            error={errorValidation.email}
          />
          <Input
            keyRef="phone"
            onChangeText={setUser}
            value={user.phone}
            placeholder="(61) 99999-8888"
            title="Celular"
            outline
            error={errorValidation.phone}
          />
          <Input
            keyRef="orgao"
            onChangeText={setUser}
            value={user.password}
            placeholder="Orgão"
            title="Orgão"
            outline
            error={errorValidation.password}
          />
          <Input
            keyRef="cpf"
            onChangeText={setUser}
            value={user.password}
            placeholder="XXX.XXX.XXX-XX"
            title="CPF"
            outline
            error={errorValidation.password}
          />
          <Input
            keyRef="payment"
            onChangeText={setUser}
            value={user.password}
            placeholder="Forma de pagamento"
            title="Forma de pagamento"
            outline
            error={errorValidation.password}
          />
          <Input
            keyRef="card"
            onChangeText={setUser}
            value={user.password}
            placeholder="Cartão"
            title="Cartão"
            outline
            error={errorValidation.password}
          />
          <ButtonsView>
            <Button text="SOLICITAR" handleOnPress={handleSignUp} />
            <Button
              text="Cancelar"
              tbutton
              tcolor
              handleOnPress={handleCancel}
            />
          </ButtonsView>
        </>
      )}
    </Container>
  );
}

export default SimpleForm;
