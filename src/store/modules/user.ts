import { userService } from "@/services/user.service"

export default {
    strict: true,
    state: {
        user: null
    },
    mutations: {
        setUser(state: any, { user }: { user: Object }): void {
            state.user = user
        },
        removeUser(state: any): void {
            state.user = null
        },
    },
    actions: {
        async loadUser({ commit }: { commit: Function }): Promise<void> {
            try {
                const user = await userService.getUser()
                commit({ type: 'setUser', user })
            } catch (error) {
                throw error
            }
        },
        removeUser({ commit }: { commit: Function }) {
            try {
                commit({ type: 'removeContact' })
            } catch (error) {
                throw error
            }
        },
        async updateUser(
            { commit }: { commit: Function },
            { user }: { [key: string]: { [key: string]: any } }
        ): Promise<void> {
            try {
                const savedUser = await userService.save(user)
                commit({ type: 'setUser', user: savedUser })
            } catch (error) {
                throw error
            }
        },
        async updateUserFunds(context: any, { payload }: { diff: number, move: object, [key: string]: any }) {
            try {
                const userToSave: { [key: string]: any } = JSON.parse(JSON.stringify(context.getters.user))

                userToSave.coins += payload.diff
                userToSave.moves.unshift(payload.move)
                const savedUser = await userService.save(userToSave)
                context.commit({ type: 'setUser', user: savedUser })
            } catch (error) {
                console.error('updateUserFunds - error', error)
                throw error
            }
        }
    },
    getters: {
        user(state: any) { return state.user }
    }
}