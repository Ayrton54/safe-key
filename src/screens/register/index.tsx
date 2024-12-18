// Importa os componentes Text e View do React Native e o componente personalizado Button
import { KeyboardAvoidingView, Platform, Text, TextInput, View, ScrollView } from "react-native";
import Button from "../../components/buttons/button";

import { RoutesParams } from "../../navigation/routesParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import global from "../../styles/global";
import Input from "../../components/inputs/input";
import { useEffect, useRef } from "react";

// Define o tipo de navegação para a tela de registro
type registerParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

// Função principal do componente RegisterScreen
export default function RegisterScreen() {

    // Configura a navegação usando o hook useNavigation com o tipo registerParamsList
    const navigation = useNavigation<registerParamsList>();

    // Criação de referências para os inputs
    const nameRef = useRef<TextInput>(null);
    const usernameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    useEffect(() => {
        // Foca no input assim que a tela é montada
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    return (
        <KeyboardAvoidingView
            style={[{ flex: 1 }, global.container]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Ajusta o offset para iOS
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} keyboardShouldPersistTaps="handled">
                {/* Container para o título do aplicativo */}
                <View style={styles.containerTitle}>
                    <Text style={[global.title, styles.title]}>SafeKey</Text>
                </View>

                {/* Container para o formulário de cadastro */}
                <View style={styles.containerForm}>
                    <Input
                        title="Nome"
                        placeholder="Seu nome completo"
                        id="name"
                        ref={nameRef}
                        returnKeyType="next"
                        onSubmitEditing={() => usernameRef.current?.focus()}
                    />
                    <Input
                        title="Usuário ou e-mail"
                        keyboardType="email-address"
                        placeholder="Seu nome de usuário"
                        id="username"
                        ref={usernameRef}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        returnKeyType="next"
                    />
                    <Input
                        title="Senha"
                        placeholder="Sua senha"
                        secureTextEntry
                        id="password"
                        ref={passwordRef}
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        returnKeyType="next"
                    />
                    <Input
                        title="Confirmar senha"
                        placeholder="Insira novamente sua senha"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        secureTextEntry
                        returnKeyType="done"
                    />
                    <Button title="Cadastrar" className="primary" onPress={() => navigation.navigate("Home")} />
                </View>
                <View style={styles.containerButtons}>
                    <Button title="Cancelar" className="warning" onPress={() => navigation.navigate("Login")} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
