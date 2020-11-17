import React, { useState, useContext, useEffect } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import Button from "../components/Button"
import UserContext from "../misc/UserContext"

const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

function emailIsValid (email) {
    return EMAIL_REGEX.test(email)
}

function Login () {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirmed, setPasswordConfirmed ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState(null)

    const { register, error } = useContext(UserContext)

    const handleRegister = () => {
        if (name === "") {
            setErrorMessage("Name is not filled out")
        } if (email === "") {
            setErrorMessage("Email is not filled out.")
        } else if (!emailIsValid(email)) {
            setErrorMessage("Invalid email.")
        } else if (password === "") {
            setErrorMessage("Password is not filled out.")
        } else if (password !== passwordConfirmed) {
            setErrorMessage("Passwords don't match.")
        } else {
            register(name, email, password)
        }
    }

    return (
        <View style={styles.flexContainer}>
            <Text style={styles.title}>Register New User</Text>
            { (error || errorMessage) && <Text style={styles.error}>{error || errorMessage}</Text> }
            <TextInput 
                placeholder="Display Name"
                onChangeText={text => setName(text)}
                value={name}
                style={styles.input}
            />
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
            <TextInput 
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={text => setPasswordConfirmed(text)}
                value={passwordConfirmed}
                style={styles.input}
            />
            <Button 
                style={styles.button}
                title="Register"
                onPress={handleRegister}
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