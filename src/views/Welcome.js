import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Button from "../components/Button"

function Welcome ({ navigation }) {
    return (
        <View style={styles.flexContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Button 
                onPress={() => navigation.navigate("Register")} 
                title="Register" 
                style={styles.button}
            />
            <Button 
                onPress={() => navigation.navigate("Login")} 
                title="Login" 
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
    }
})

export default Welcome