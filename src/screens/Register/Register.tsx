import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import InputForm from "../../components/Form/InputForm";
import Button from "../../components/Form/Button";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
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

const Register = () => {
    const [category, setCategory] = useState({
        key: "category",
        name: "Category",
    });
    const [transactionTypeSelection, setTransactionTypeSelection] =
        useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const { control, handleSubmit } = useForm();

    const handleTransactionTypeSelection = (type: "up" | "down") => {
        setTransactionTypeSelection(type);
    };

    const handleSelectCategoryModal = () => {
        setCategoryModalOpen((state) => !state);
    };

    const handlerRegister = (form: FormData) => {
        const { name, amount } = form;
        const data = {
            name,
            amount,
            transactionTypeSelection,
            category: category.key,
        };

        console.log(data);
    };

    return (
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
                    />

                    <InputForm
                        control={control}
                        name="amount"
                        placeholder="Preço"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelection("up")}
                            isActive={transactionTypeSelection === "up"}
                        />

                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            onPress={() =>
                                handleTransactionTypeSelection("down")
                            }
                            isActive={transactionTypeSelection === "down"}
                        />
                    </TransactionTypes>

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleSelectCategoryModal}
                    />
                </Fields>

                <Button
                    title="Enviar"
                    onPress={handleSubmit(handlerRegister)}
                />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
};

export default Register;
