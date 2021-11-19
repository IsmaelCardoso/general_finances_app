import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import Input from "../Input";

import { Container } from "./styles";

interface Props extends TextInputProps {
    control: Control;
    name: string;
}

const InputForm = ({ control, name, ...rest }: Props) => {
    return (
        <Container>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        {...rest}
                    />
                )}
            />
        </Container>
    );
};

export default InputForm;
