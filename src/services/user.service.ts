const getUser = ():Object => {
    const user = {
        name: 'Great Guy',
        coins: 100,
        imgUrl: 'https://robohash.org/user.org?gravatar=yes',
        moves: []
    }
    return user
}

export const userService = {
    getUser
}
