import React from "react";

import { View, Text, TextInput, Button } from "react-native";

// import { Container, Title } from "./styles";

const Profile = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Ismael"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Cardoso"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};
export default Profile;
