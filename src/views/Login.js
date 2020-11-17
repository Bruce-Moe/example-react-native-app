import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import Button from "../components/Button"
import UserContext from "../misc/UserContext"

function Login () {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState(null)

    const { signIn, error } = useContext(UserContext)

    const handleLogin = () => {
        if (email === "") {
            setErrorMessage("Username is not filled out.")
        } else if (password === "") {
            setErrorMessage("Password is not filled out.")
        } else {
            signIn(email, password)
        }
    }

    return (
        <View style={styles.flexContainer}>
            <Text style={styles.title}>Login</Text>
            { (error || errorMessage) && <Text style={styles.error}>{error || errorMessage}</Text> }
            <TextInput 
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
            />
            <TextInput 
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
                style={styles.input}
            />
            <Button 
                style={styles.button}
                title="Log In"
                onPress={handleLogin}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70%"
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center"
    },
    button: {
        marginVertical: 12,
        width: "90%",
        maxWidth: 420
    },
    input: {
        width: "90%",
        maxWidth: 420,
        marginVertical: 8,
        padding: 8,
        backgroundColor: "#e0e0e0"
    },
    error: {
        textAlign: "center",
        color: "red",
        fontWeight: "700"
    }
})

export default Login