import React from "react"
import PropTypes from "prop-types"
import { View, Text, Image, Pressable, StyleSheet } from "react-native"

function Card ({ 
    title, 
    author,
    postDate,
    imageSource, 
    onPress, 
    style,
    ...props 
}) {
    const description = `By ${author}\nOn ${postDate.toLocaleString("en")}`
    return (
        <Pressable onPress={onPress}>
            <View style={[ styles.defaultCard, style ]}>
                { imageSource && (
                    <Image 
                        source={imageSource} 
                        style={styles.image}
                    />
                ) }
                <Meta title={title} description={description} />
            </View>
        </Pressable>
    )
}

function Meta ({ title, description }) {
    return (
        <View style={styles.meta}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

Card.defaultProps = {
    style: {}
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    meta: {
        padding: 12
    },
    title: {
        color: "#303030",
        fontWeight: "700",
        marginVertical: 4
    },
    description: {
        color: "#808080",
        fontSize: 12
    },
    defaultCard: {
        backgroundColor: "#ffffff",
        borderRadius: 4
    }
})

export default Card