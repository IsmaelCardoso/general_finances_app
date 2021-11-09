import React, { useState } from 'react';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

const Register = () => {
    const [transactionTypeSelection, setTransactionTypeSelection] = useState('');

    const handleTransactionTypeSelection = (type: 'up' | 'down') => {
        setTransactionTypeSelection(type)
    }
    
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder='Nome'/>

                    <Input placeholder='Preço'/>

                    <TransactionTypes>
                        <TransactionTypeButton 
                        type='up'
                        title='Income'
                        onPress={() => handleTransactionTypeSelection('up')}
                        isActive={transactionTypeSelection === 'up'}
                        />
                            
                        <TransactionTypeButton 
                        type='down'
                        title='Outcome'
                        onPress={() => handleTransactionTypeSelection('down')}
                        isActive={transactionTypeSelection === 'down'}
                        />
                    </TransactionTypes>
                </Fields>

                <Button title='Enviar' />
            </Form>

        </Container>
    )
}

export default Register;