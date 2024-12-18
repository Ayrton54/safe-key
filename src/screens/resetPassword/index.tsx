// Importa os componentes Text e View do React Native e o componente personalizado Button
import { KeyboardAvoidingView, Platform, Text, TextInput, View, ScrollView, ToastAndroid } from "react-native";
import Button from "../../components/buttons/button";

import { RoutesParams } from "../../navigation/routesParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import global from "../../styles/global";
import Input from "../../components/inputs/input";
import { useEffect, useRef } from "react";

// Define o tipo de navegação para a tela de registro
type registerParamsList = NativeStackNavigationProp<RoutesParams, 'ResetPassword'>;

// Função principal do componente RegisterScreen
export default function ResetPasswordScreen() {

    // Configura a navegação usando o hook useNavigation com o tipo registerParamsList
    const navigation = useNavigation<registerParamsList>();

    // Criação de referências para os inputs
    const usernameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    useEffect(() => {
        // Foca no input assim que a tela é montada
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    })

    const handleUpdatePassword = () => {
        ToastAndroid.show('Senha alterada com sucesso! Faça login.', ToastAndroid.LONG);
        navigation.navigate("Login");
    }
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
                        title="Usuário ou e-mail"
                        keyboardType="email-address"
                        placeholder="Seu nome de usuário"
                        id="username"
                        ref={usernameRef}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        returnKeyType="next"
                        autoCapitalize="none"  
                    />
                    <Input
                        title="Nova senha"
                        placeholder="Sua nova senha"
                        secureTextEntry
                        id="password"
                        ref={passwordRef}
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        returnKeyType="next"
                        autoCapitalize="none"  
                    />
                    <Input
                        title="Confirmar nova senha"
                        placeholder="Insira novamente sua senha"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        secureTextEntry
                        returnKeyType="done"
                        onSubmitEditing={() => handleUpdatePassword()}
                        autoCapitalize="none"
                    />
                    <Button title="Alterar senha" className="primary" onPress={() => handleUpdatePassword()}/>
                </View>
                <View style={styles.containerButtons}>
                    <Button title="Cancelar" className="warning" onPress={() => navigation.navigate("Login")} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
