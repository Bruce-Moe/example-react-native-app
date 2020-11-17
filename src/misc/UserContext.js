import { createContext } from "react"

const UserContext = createContext({
    username: "",
    avatarUrl: "",
    userId: -1,
    signIn: () => {},
    signOut: () => {},
    register: () => {},
    error: null
})

export default UserContext