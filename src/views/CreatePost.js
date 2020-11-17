import React, { useState, useEffect, useContext } from "react"
import { Platform, Text, TextInput, ScrollView, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import Button from "../components/Button"
import UserContext from "../misc/UserContext"
import { getMimetype } from "../misc/ImageTypes"
import { uploadImage, createPost } from "../misc/Firebase"

function CreatePost () {
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ image, setImage ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(false)
    const { username } = useContext(UserContext)
    
    const handleImageUpload = async () => {
        const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })
        if (!imagePickerResult.cancelled) {
            const { uri } = imagePickerResult
            const fname = uri.split("/").pop()
            // Get blob
            const response = await fetch(uri)
            console.log(response)
            const blob = await response.blob()
            // Do something with this
            const mimetype = getMimetype(fname.split(".").pop())
            if (mimetype) {
                // Save in state
                setImage({
                    filename: fname,
                    mimetype: mimetype,
                    blob: blob
                })
            } else {
                setError("Unsupported image type. Upload a jpeg, png, or gif.")
            }
        } 
    }

    const handleSubmit = async () => {
        // Validate input
        if (title === "" || content === "") {
            setError("Title or content fields are empty.")
            return
        }
        // Call firebase
        try {
            const post = { 
                title: title, 
                content: content,
                author: username
            }
            if (image) {
                post.thumbnail = await uploadImage(image, (uploaded, total) => console.log(uploaded / total * 100, "percent uploaded"))
            }
            await createPost(post)
            setSuccess(true)
        } catch (error) {
            setError(error.message)
        }
    }
    
    useEffect(() => {
        if (Platform.OS !== "web") {
            ImagePicker.requestCameraRollPermissionsAsync().then(({ status }) => {
                if (status !== "granted") {
                    alert("You didn't give me camera roll permissions :(")
                }
            })
        }
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Post</Text>
            <Text style={[ styles.subtitle, styles.error ]}>{error}</Text>
            <Text style={styles.subtitle}>{ success && "Sucessfully created post." }</Text>
            <TextInput 
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
            />
            <TextInput 
                value={content}
                onChangeText={text => setContent(text)}
                multiline={true}
                numberOfLines={10}
                style={[ styles.input, styles.multiline ]}
            />
            <Button 
                title="Upload Image"
                onPress={handleImageUpload}
                style={styles.button}
            />
            <Button 
                title="Submit Post"
                onPress={handleSubmit}
                style={styles.button}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 48,
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
    multiline: {
        textAlignVertical: "top"
    },
    subtitle: {
        textAlign: "center",
        fontWeight: "700"
    },
    error: {
        color: "red"
    }
})

export default CreatePost