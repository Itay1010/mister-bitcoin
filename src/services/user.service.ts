const getUser = ():Object => {
    const user = {
        name: "Ochoa Hyde",
        coins: 100,
        moves: []
    }
    return user
}

export const userService = {
    getUser
}
