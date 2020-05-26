/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import * as yup from 'yup';
// logic
import { useCommons, useValidation, useLazyFetch } from '../../hooks';
import { useAuth } from '../../global';
// ui
import {
  Input,
  Button,
  Logo,
  RadioButton,
  Picker,
  InputMask,
} from '../../components';
import { Container, ButtonsView } from './styles';
import Endpoints, { api } from '../../services';
import { Imgs } from '../../assets';

const schema = {
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
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
    cpf: '',
  });
  const [userMed, setUserMed] = useState({
    name: '',
    last_name: '',
    email: '',
    phone1: '',
    public_agency: '',
    professional_situation: '',
    cpf: '',
    payment_method: '',
    bank_name: '',
    bank_agency: '',
    bank_account_number: '',
  });

  const [fetch, { error, response, loading }] = useLazyFetch(
    Endpoints.postPague,
    user
  );

  const [fetch2, { error2, response2, loading2 }] = useLazyFetch(
    Endpoints.postMed,
    userMed
  );

  const handleFetchSuccess = useCallback(() => {
    navigation.navigate('Finish');
  }, [response, response2]);

  useEffect(() => {
    if (!errorValidation && !response) {
      if (user.name !== '') {
        fetch();
      }
      if (userMed.name !== '') {
        if (userMed.professional_situation === 'SIM') {
          userMed.professional_situation = 'Servidor';
        }

        fetch2();
      }
    }
    if (response) {
      handleFetchSuccess();
    }
  }, [response, errorValidation]);

  const handlePague = useCallback(() => validade(user), [
    user,
    navigation,
    errorValidation,
  ]);

  const handleMed = useCallback(() => validade(userMed), [
    userMed,
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
          <InputMask
            keyRef="cpf"
            onChangeText={setUser}
            value={user.cpf}
            placeholder="XXX.XXX.XXX-XX"
            title="CPF"
            mask="[000].[000].[000]-[00]"
            keyboardType="numeric"
            outline
            error={errorValidation.password}
          />
          <InputMask
            keyRef="phone"
            onChangeText={setUser}
            value={user.phone}
            placeholder="(DD) XXXXX-XXXX"
            title="Celular"
            mask="([00]) [00000]-[0000]"
            keyboardType="numeric"
            outline
            error={errorValidation.phone}
          />
          <ButtonsView m>
            <Button
              text="SOLICITAR"
              handleOnPress={handlePague}
              loading={loading}
            />
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
            onChangeText={setUserMed}
            value={userMed.name}
            placeholder="Nome"
            title="Nome"
            outline
            error={errorValidation.name}
          />
          <Input
            keyRef="last_name"
            onChangeText={setUserMed}
            value={userMed.last_name}
            placeholder="Sobrenome"
            title="Sobrenome"
            outline
            error={errorValidation.name}
          />
          <Input
            keyRef="email"
            onChangeText={setUserMed}
            value={userMed.email}
            placeholder="exemplo@exemplo.com"
            title="Email"
            outline
            error={errorValidation.email}
          />
          <InputMask
            keyRef="cpf"
            onChangeText={setUserMed}
            value={userMed.cpf}
            placeholder="XXX.XXX.XXX-XX"
            title="CPF"
            mask="[000].[000].[000]-[00]"
            outline
            error={errorValidation.password}
            keyboardType="numeric"
          />
          <InputMask
            keyRef="phone1"
            onChangeText={setUserMed}
            value={userMed.phone1}
            placeholder="(61) 99999-8888"
            title="Celular"
            mask="([00]) [00000]-[0000]"
            keyboardType="numeric"
            outline
            error={errorValidation.phone}
          />
          <RadioButton
            keyRef="professional_situation"
            title="Funcionário público?"
            opt1="SIM"
            opt2="NÃO"
            onChangeOption={setUserMed}
            value={userMed.professional_situation}
          />
          <Input
            keyRef="public_agency"
            onChangeText={setUserMed}
            value={userMed.public_agency}
            placeholder="Orgão"
            title="Orgão"
            outline
            error={errorValidation.password}
          />
          <Picker
            keyRef="payment_method"
            onChangeOption={setUserMed}
            value={userMed.payment_method}
            title="Forma de pagamento"
            error={errorValidation.password}
            options={[
              'Cartão de crédito',
              'Cartão de débito',
              'Débito em conta',
              'Boleto',
            ]}
          />
          {userMed.payment_method === 'Débito em conta' && (
            <>
              <Input
                keyRef="bank_name"
                onChangeText={setUserMed}
                value={userMed.bank_name}
                placeholder="Banco"
                title="Banco"
                outline
                error={errorValidation.password}
              />
              <InputMask
                keyRef="bank_agency"
                onChangeText={setUserMed}
                value={userMed.bank_agency}
                placeholder="Cartão"
                title="Agência"
                mask="[0000]"
                outline
                error={errorValidation.password}
              />
              <Input
                keyRef="bank_account_number"
                onChangeText={setUserMed}
                value={userMed.bank_account_number}
                placeholder="Número da conta"
                title="Número da conta"
                outline
                error={errorValidation.password}
              />
            </>
          )}

          <ButtonsView>
            <Button
              text="CONTRATAR"
              handleOnPress={handleMed}
              loading={loading2}
            />
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
