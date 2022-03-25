import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, SafeAreaView } from "react-native"
import Card from "../components/Card"
import { getPosts } from "../misc/Firebase"

function Feed ({ navigation }) {

    const [ posts, setPosts ] = useState([])

    const fetchPosts = async () => {
        const posts = await getPosts()
        setPosts(posts)
    }

    const cardRenderer = ({ item }) => {
        const { thumbnail, content, ...post } = item
        return <Card 
            {...post}
            imageSource={thumbnail && { uri: thumbnail }}
            style={styles.card}
            onPress={() => navigation.navigate("Post", item)}
        />
    }

    useEffect(() => {
        fetchPosts()
        const tid = setTimeout(fetchPosts, 45000)
        return () => clearTimeout(tid)
    }, [])

    return (
        <SafeAreaView style={styles.page}>
            <FlatList 
                data={posts}
                renderItem={cardRenderer}
                style={{ width: "96%" }}
                keyExtractor={(item, idx) => idx.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        width: "100%",
        marginVertical: 4
    }
})

export default Feed