import gContacts from '@/data/contacts.json'
import { utilService } from './util.service'
const query = async (): Promise<Object[]> => {
    return gContacts
}

const getById = async (contactId: string) => {
    return gContacts.find(contact => contact._id === contactId)
}

const remove = async (contactId: string) => {
    console.log('removing', contactId)
}

const save = async (contact: { [key: string]: any }): Promise<object> => {
    if (!contact._id) {
        contact._id = utilService.makeId(20)
        return contact
    }
    return contact
}

function getEmptyContact() {
    return {
        name: 'Robo Name',
        email: '',
        phone: '',
        imgUrl: `https://robohash.org/holder.org?gravatar=yes`
    }
}

export const contactService = {
    query,
    save,
    remove,
    getEmptyContact,
    getById
}