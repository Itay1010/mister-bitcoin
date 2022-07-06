export interface User {
    id?: string,
    name: string,
    imgUrl: string,
    moves: Array<any>
}

export interface UserCred {
    name: string,
    password: string
}