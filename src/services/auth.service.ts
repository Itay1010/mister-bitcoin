import { firebaseService } from "./firebase.service"
import { userService } from "./user.service"
import type { User, UserCred } from "@/modules/index";

const signup = async ({ name, password }: UserCred) => {
    try {
        const id = await firebaseService.signup(`${name}@gmail.com`, password)
        const newUser = new (userService.User as any)(id, name)
        const savedUser = await userService.addUser(Object.assign({}, newUser))
        return savedUser
    } catch (error) {
        throw error
    }
}

const login = async (user: User) => {
    console.log('user logged in', user)
    return user
}

const doRegister = async ({ name, password }: UserCred) => {
    try {
        const newUser = await signup({ name, password })
        await login(newUser)
        return newUser
    } catch (error: any) {
        throw error
    }
}

export const authService = {
    signup,
    login,
    doRegister
}