import React, { useState } from "react";
import { Modal } from "react-native";

import Input from "../../components/Form/Input";
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

const Register = () => {
    const [category, setCategory] = useState({
        key: "category",
        name: "Category",
    });
    const [transactionTypeSelection, setTransactionTypeSelection] =
        useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const handleTransactionTypeSelection = (type: "up" | "down") => {
        setTransactionTypeSelection(type);
    };

    const handleSelectCategoryModal = () => {
        setCategoryModalOpen((state) => !state);
    };

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />

                    <Input placeholder="Preço" />

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

                <Button title="Enviar" />
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
