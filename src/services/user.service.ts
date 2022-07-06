import { firebaseService } from "./firebase.service"
import type { User } from "@/modules/index";
const collectionName = 'user'

const getUserProfile = async (id: string): Promise<Object> => {
    const user = await firebaseService.getDocument(collectionName, id)
    return user
}

const save = async (user: { [key: string]: any }): Promise<Object> => {
    console.log('saving user')
    const savedUser = await firebaseService.saveDocument(collectionName, user, user.id)
    return savedUser
}

const addUser = async (newUser: User): Promise<User> => {
    const savedUser = await firebaseService.saveDocument(collectionName, newUser, newUser.id)
    return newUser
}

function User(id: string, name = '') {
    this.id = id,
        this.name = name,
        this.imgUrl = `https://robohash.org/${name.split(' ')[0]}.org?gravatar=yes`,
        this.moves = []
}

export const userService = {
    getUserProfile,
    save,
    User,
    addUser
}