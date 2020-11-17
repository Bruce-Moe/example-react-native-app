import React from "react"
import { View, Button } from "react-native"

function MyButton ({ style, ...props }) {
    return (
        <View style={style}>
            <Button {...props} />
        </View>
    )
}

export default MyButton