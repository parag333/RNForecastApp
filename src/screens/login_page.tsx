import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme";
import { LoginPageProps } from "../navigation/types";

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
    const [isLogIn, setIsLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onSubmit = () => {
        if(!email || !userName || !password || !confirmPassword){
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        if(password != confirmPassword){
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        Alert.alert('Success', 'Login Success');
        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.title}>Login screen</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="name" 
                            placeholderTextColor="#999"
                            value={userName} 
                            onChangeText={setUserName}>
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Id</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="email" 
                            placeholderTextColor="#999"
                            value={email} 
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}>
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********" 
                            placeholderTextColor="#999"
                            value={password} 
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={setPassword}>
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********" 
                            placeholderTextColor="#999"
                            value={confirmPassword} 
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={setConfirmPassword}>
                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={onSubmit}>
                        <Text style={{color: '#ffffff'}} >Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16
    },
    label: {
        fontSize: 16,
        color: '#4a4a4a',
        marginBottom: 8,
        fontWeight: '600'
    },
    input:{
        backgroundColor: '#f9f9fb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize:16,
        color: '#1a1a1a',
        height: 50,
    },
    button: {
        backgroundColor: '#2563eb',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },

});

export default LoginPage;