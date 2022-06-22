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

// const user = {
//     name: 'Great Guy',
//     coins: 100,
//     imgUrl: 'https://robohash.org/user.org?gravatar=yes',
//     moves: [
//         {
//             amount: 50,
//             contact: {
//                 name: "William Gibson ",
//                 _id: "5a566402fsa69f443a5d64b32ca",
//             },
//             date: 1655847812327
//         },
//         {
//             amount: 102,
//             contact: {
//                 name: "Mark Hamill",
//                 _id: "5a5664fs0269f443a5d64b32ca",
//             },
//             date: 1655849812907
//         },
//         {
//             amount: 5,
//             contact: {
//                 name: "Spike Spiegel",
//                 _id: "5a56640269f443a5d64b32ca",
//             },
//             date: 1655848426180
//         },

//     ]
// }