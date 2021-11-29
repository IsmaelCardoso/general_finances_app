import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import InputForm from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import CategorySelect from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  amount: string;
  name: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Digite um valor positivo")
    .required("Campo obrigatório"),
});

const Register = () => {
  const dataKey = "@generalfinance:transactions";

  const [category, setCategory] = useState({
    key: "category",
    name: "Category",
  });
  const [transactionTypeSelection, setTransactionTypeSelection] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const navigation = useNavigation();

  const handleTransactionTypeSelection = (type: "positive" | "negative") => {
    setTransactionTypeSelection(type);
  };

  const handleSelectCategoryModal = () => {
    setCategoryModalOpen((state) => !state);
  };

  const handlerRegister = async (form: FormData) => {
    if (!transactionTypeSelection) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const { name, amount } = form;
    const newTrasaction = {
      id: String(uuid.v4()),
      name,
      amount,
      type: transactionTypeSelection,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [newTrasaction, ...currentData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionTypeSelection("");
      setCategory({
        key: "category",
        name: "Category",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log("Error: ", error);

      Alert.alert("Não foi possivel salvar");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    };

    loadData();

    // const removeAll = async () => {
    //   await AsyncStorage.removeItem(dataKey);
    // };

    // removeAll();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelection("positive")}
                isActive={transactionTypeSelection === "positive"}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelection("negative")}
                isActive={transactionTypeSelection === "negative"}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handlerRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
