import React, { useState, useEffect, useMemo } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { Account, CreatePost, Feed, Post, Login, Welcome, Register } from "./views"
import UserContext from "./misc/UserContext"
import { registerUser, login } from "./misc/Firebase"

const LoginStack = createStackNavigator()
const FeedStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

function FeedPage () {
	return (
		<FeedStack.Navigator initialRouteName="Feed">
			<FeedStack.Screen name="Feed" component={Feed} options={{ title: "Your Feed" }} />
			<FeedStack.Screen name="Post" component={Post} />
		</FeedStack.Navigator>
	)
}

const defaultAvatar = "https://1.bp.blogspot.com/-24mjP6SQK_c/XuAdsmjSh3I/AAAAAAABUIo/zwFQ8PZhBdk7Irxek_-76DLdqDmx24IGgCNcBGAsYHQ/s1600/avatar-the-last-airbender-cabbage-merchant-header-nickelodeon-nick_2.png"

export default function App() {
	const [ user, setUser ] = useState({
		username: "",
		avatarUrl: "",
		userId: "",
		error: "",
		authenticated: false
	})

	const handleLogin = async (email, password) => {
		const { username, photo, id, code, message } = await login(email, password)
		if (!code) {
			setUser({
				...user,
				authenticated: true,
				username: username,
				id: id,
				avatarUrl: photo
			})
		} else {
			console.log("hi")
			setUser({
				...user,
				error: message
			})
		}
	}

	const handleLogout = () => {
		setUser({
			...user,
			authenticated: false
		})
	}

	const handleRegistration = async (name, email, password) => {
		const { username, photo, id, code, message } = await registerUser(name, email, password)
		if (!code) {
			setUser({
				...user,
				authenticated: true,
				username: username,
				id: id,
				avatarUrl: photo
			})
		} else {
			setUser({
				...user,
				error: message
			})
		}
	}

	useEffect(() => {
		// check for local token here
		// setUser({
		// 	...user,
		// 	authenticated: true,
		// 	username: "dehunter456",
		// 	avatarUrl: defaultAvatar,
		// 	userId: 1
		// })
	}, [])

	const context = useMemo(() => ({
		...user,
		signIn: handleLogin,
		signOut: handleLogout,
		register: handleRegistration
	}), [user])

    return (
        <NavigationContainer>
			<UserContext.Provider value={context}>
				{ user.authenticated ? (
					<BottomTab.Navigator>
						<BottomTab.Screen name="Feed" component={FeedPage} />
						<BottomTab.Screen name="Create" component={CreatePost} options={{ title: "New Post" }} />
						<BottomTab.Screen name="Account" component={Account} />
					</BottomTab.Navigator>
				) : (
					<LoginStack.Navigator initialRouteName="Welcome">
						<LoginStack.Screen name="Welcome" component={Welcome} />
						<LoginStack.Screen name="Register" component={Register} />
						<LoginStack.Screen name="Login" component={Login} />
					</LoginStack.Navigator>
				) }
			</UserContext.Provider>
        </NavigationContainer> 
    )
}