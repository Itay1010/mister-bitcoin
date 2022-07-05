import { contactService } from '@/services/contact.service.js'
// setting type as any for properties coming from workframe or lib
export default {
    strict: true,
    state: {
        contacts: null,
    },
    mutations: {
        setContacts(state: any, { contacts }: { contacts: Object[] }): void {
            state.contacts = contacts
        },
        removeContact(state: any, { contactId }: { contactId: string }): void {
            const idx: number = state.contacts.findIndex((contact: any) => contact._id === contactId)
            state.contacts.splice(idx, 1)
        },
        saveContact(
            state: any,
            { contact }: { [key: string]: { [key: string]: any } }
        ) {
            const contactId = contact._id
            const idx: number = state.contacts.findIndex((contact: { [key: string]: any }) => contact._id === contactId)
            if (idx === -1) {
                state.contacts.push(contact)
            } else {
                state.contacts.splice(idx, 1, contact)
            }
        }
    },
    actions: {
        async loadContacts(context: any): Promise<void> {
            try {
                const contacts = await contactService.query()
                context.commit({ type: 'setContacts', contacts })
            } catch (error) {
                throw error
            }
        },
        async removeContact({ commit }: { commit: Function }, { contactId }: { contactId: string }) {
            try {
                await contactService.remove(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (error) {
                throw error
            }
        },
        async saveContact(
            { commit }: { commit: Function },
            { contact }: { [key: string]: { [key: string]: any } }
        ): Promise<void> {
            try {
                const savedContact = await contactService.save(contact)
                commit({ type: 'saveContact', contact: savedContact })
            } catch (error) {
                throw error
            }
        },
        async updateContactFunds(context: any, { payload }: { payload: { contactId: string, diff: number, [key: string]: any } }) {
            try {
                const contact: { [key: string]: any } | undefined = context.getters.contacts.find(
                    (contact: { [key: string]: any }) => contact._id === payload.contactId
                )
                if (!contact) throw new Error('contact not found')
                const contactToSave = JSON.parse(JSON.stringify(contact))
                contactToSave.coins += payload.diff
                const savedContact = await contactService.save(contactToSave)
                context.commit({ type: 'saveContact', contact: savedContact })
            } catch (error) {
                console.error('updateContactFunds - error', error)
                throw error
            }
        }
    },
    getters: {
        contacts(state: any) { return state.contacts }
    }
}