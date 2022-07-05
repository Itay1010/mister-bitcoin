import { firebaseService } from "./firebase.service"
const collectionName = 'user'

const getUser = async (): Promise<Object> => {
    const user = await firebaseService.getDocument(collectionName, '88QXFkAERIf0G1gDe9Hd')
    return user
}

const save = async (user: { [key: string]: any }): Promise<Object> => {
    console.log('saving user')
    const savedUser = await firebaseService.saveDocument(collectionName, user, user.id)
    return savedUser
}

export const userService = {
    getUser,
    save
}