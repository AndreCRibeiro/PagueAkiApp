import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useCommons } from '../../hooks';
import { MainContainer, ProgressContainer, ButtonContainer } from './styles';
import { colors } from '../../styles';
import {
  Input,
  InputMask, // change name
  Container,
  ButtonTouchable,
  RadioButton,
  Picker,
  Camera,
} from '../../components';

import ProgressForm from './components/ProgressForm';

import { Schemas } from '../../util';

const FORM = [
  {
    name: 'Informações Pessoais',
    components: [
      {
        name: 'Input',
        key: 'name',
        title: 'Nome',
      },
      {
        name: 'Input',
        key: 'lastName',
        title: 'Sobrenome',
      },
      {
        name: 'InputMask',
        key: 'birthday',
        title: 'Data de Nascimento',
        mask: '[00]/[00]/[0000]',
        type: 'numeric',
      },
      {
        name: 'InputMask',
        key: 'cpf',
        title: 'CPF',
        mask: '[000].[000].[000]-[00]',
        type: 'numeric',
      },
      {
        name: 'InputMask',
        key: 'rg',
        title: 'RG',
        mask: '[000000]-[00]',
        type: 'numeric',
      },
      {
        name: 'Picker',
        key: 'Picker',
        title: 'Picker Test',
        options: [
          'Aposentado',
          'Pensionista',
          'Em plena atividade profissional',
          'Funcionario publico',
        ],
      },
      {
        name: 'Radio',
        key: 'Radio',
        title: 'Radio Button Test',
      },
    ],
  },
  {
    name: 'Informações Pessoais',
    components: [
      {
        name: 'Input',
        key: 'civilState',
        title: 'Estado Civil',
      },
      {
        name: 'Input',
        key: 'genere',
        title: 'Gênero',
      },
      {
        name: 'Input',
        key: 'childrens',
        title: 'Filhos',
        type: 'numeric',
      },
    ],
  },
  {
    name: 'Endereço',
    components: [
      {
        name: 'Input',
        key: 'city',
        title: 'Cidade',
      },
      {
        name: 'Input',
        key: 'state',
        title: 'Estado',
      },
      {
        name: 'Input',
        key: 'street',
        title: 'bairro',
      },
      {
        name: 'Input',
        key: 'number',
        title: 'Numero',
        type: 'numeric',
      },
      {
        name: 'InputMask',
        key: 'cep',
        title: 'CEP',
        mask: '[00000]-[000]',
        type: 'numeric',
      },
    ],
  },
  {
    name: 'Informações pagamento',
    components: [
      {
        name: 'Input',
        key: 'bank',
        title: 'Banco',
      },
      {
        name: 'Input',
        key: 'agc',
        title: 'Agencia',
        type: 'numeric',
      },
      {
        name: 'Input',
        key: 'count',
        title: 'Conta',
      },
    ],
  },
];

// lidar com o inputmask

const Forms = () => {
  const { navigation } = useCommons();
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({});

  // constroi campos com chaves
  useEffect(() => {
    Schemas.MEDICACAO.map((step) =>
      step.components.map((item) =>
        setForm((prevState) => ({ ...prevState, [item.key]: null }))
      )
    );
  }, []);

  const handleFinish = () => { };

  const handleNextStep = useCallback(() => {
    if (index < Schemas.MEDICACAO.length - 1) setIndex(index + 1);
    else handleFinish();
  }, [index]);

  const handlePreviousStep = useCallback(() => {
    if (index > 0 && index < Schemas.MEDICACAO.length) setIndex(index - 1);
    else navigation.navigate('Home');
  }, [index, navigation]);

  const textOutlineButton = useMemo(() => (index === 0 ? 'HOME' : 'VOLTAR'), [
    index,
  ]);

  const textButton = useMemo(
    () => (index < Schemas.MEDICACAO.length - 1 ? 'PRÓXIMO' : 'FINALIZAR'),
    [index]
  );

  const date = new Date('01/05/1994');
  console.log({ date });

  return (
    <Container>
      <ProgressForm form={Schemas.MEDICACAO} index={index} />
      <MainContainer>
        {Schemas.MEDICACAO[index].components.map((component) => {
          if (component.name === 'Input') {
            return (
              <Input
                value={form[component.key]}
                outline
                title={component.title}
                keyRef={component.key}
                onChangeText={setForm}
                keyboardType={component?.type}
                placeholder={component.placeholder}
              />
            );
          }
          if (component.name === 'InputMask') {
            return (
              <InputMask
                value={form[component.key]}
                outline
                title={component.title}
                keyRef={component.key}
                onChangeText={setForm}
                mask={component.mask}
                keyboardType={component?.type}
                placeholder={component.placeholder}
              />
            );
          }
          if (component.name === 'Radio') {
            return (
              <RadioButton
                keyRef={component.key}
                value={form[component.key]}
                title={component.title}
                onChangeOption={setForm}
                opt1={component.opt1}
                opt2={component.opt2}
              />
            );
          }
          if (component.name === 'Picker') {
            return (
              <Picker
                keyRef={component.key}
                value={form[component.key]}
                options={component.options}
                title={component.title}
                onChangeOption={setForm}
              />
            );
          }
          if (component.name === 'Image') {
            return (
              <Camera
                keyRef={component.key}
                value={form[component.key]}
                title={component.title}
                crop={component.crop}
              />
            );
          }
          return null;
        })}
      </MainContainer>
      <ButtonContainer>
        <ButtonTouchable
          handleOnPress={handlePreviousStep}
          text={textOutlineButton}
          half
          outline
        />
        <ButtonTouchable
          handleOnPress={handleNextStep}
          text={textButton}
          half
        />
      </ButtonContainer>
    </Container>
  );
};

export { Forms };

/*
<Input outline title="Questão form" />
        <Input outline title="Questão form" />
        <Input outline title="Questão form" />
        <Input outline title="Questão form" />
        <Input outline title="Questão form" />
        <Input outline title="Questão form" />
*/
