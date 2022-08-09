const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');


const listContacts =async() =>{
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(contacts);
    }
    catch(error) {
        console.log(error);
    }
}

const getContactById= async(contactId) => {
    try {
        const contacts = await listContacts();
        
        const contactById =contacts.find((contact) => contact.id === contactId);
        return contactById;
    }
    catch (error) {
        console.log(error);
    }
    
}

const removeContact= async(contactId) =>{
    try {
        const contacts = await listContacts();
        const newContacts = contacts.filter((contact) => contact.id !== contactId);
    
        await fs.writeFile(contactsPath, JSON.stringify(newContacts));
        return newContacts;

    }
    catch (error) {
        console.log(error);
    }
}

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        
        const newContact = {
            id: v4(),
            name,
            email,
            phone
        };
        await contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return newContact;

    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
