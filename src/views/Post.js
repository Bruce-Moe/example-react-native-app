import React from "react"
import { Text, Image, ScrollView, StyleSheet } from "react-native"

function Post ({ route, navigation }) {
    const { title, content, author, postDate, thumbnail } = route.params
    return (
        <ScrollView contentContainerStyle={styles.scrollView} bounces={true}>
            { thumbnail && <Image 
                source={{ uri: thumbnail }} 
                style={styles.image}
            /> }
            
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.meta}>By {author}</Text>
            <Text style={styles.meta}>Posted on {postDate.toLocaleString("en")}</Text>
            <Text style={styles.content}>{content}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fcfcfc"
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover"
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginVertical: 8,
        color: "#303030",
        width: "90%"
    },
    meta: {
        fontSize: 12,
        color: "#808080",
        width: "90%"
    },
    content: {
        marginVertical: 8,
        padding: 4,
        color: "#606060",
        width: "90%"
    }
})

export default Post