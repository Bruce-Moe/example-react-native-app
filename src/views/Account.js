import React, { useContext } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import Button from "../components/Button"
import UserContext from "../misc/UserContext"

function Account () {
    const { username, avatarUrl, signOut } = useContext(UserContext)
    return (
        <View style={styles.view}>
            <View style={styles.userBlock}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <Text style={styles.username}>{username}</Text>
            </View>
            <Button 
                title="Log Out"
                onPress={signOut}
                style={styles.logout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    userBlock: {
        marginTop: 32,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }, 
    username: {
        fontWeight: "700",
        fontSize: 16,
        color: "#303030"
    },
    avatar: {
        width: 90,
        height: 90,
        resizeMode: "cover",
        borderRadius: 100
    },
    logout: {
        width: "90%",
        marginVertical: 4
    }
})

export default Account