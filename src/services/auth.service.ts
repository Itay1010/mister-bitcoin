import { firebaseService } from "./firebase.service"
import { userService } from "./user.service"
import type { User, UserCred } from "@/modules/index";

const login = async ({ name, password }: UserCred) => {
    try {
        const id: string = await firebaseService.login(`${name}@gmail.com`, password)
        const user = await userService.getUserProfile(id)
        if (!user) throw new Error('login failed, wrong credentials')
        return user
    } catch (error) {
        throw error
    }
}

const doRegister = async ({ name, password }: UserCred) => {
    try {
        const id = await firebaseService.signup(`${name}@gmail.com`, password)
        const newUser = new (userService.User as any)(id, name)
        const savedUser = await userService.save(Object.assign({}, newUser))
        return savedUser
    } catch (error: any) {
        throw error
    }
}

export const authService = {
    login,
    doRegister
}