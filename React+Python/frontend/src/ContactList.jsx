import React from "react"

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div className="grid place-content-center">
        <h2 className="font-bold text-6xl mt-52 ml-80 mb-10">Contacts</h2>
        <table className="border-4 border-black px-2">
            <thead>
                <tr className="flex gap-52 px-2 justify-between">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id} className="flex gap-52 px-2 justify-between">
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td className="flex gap-1">
                            <button onClick={() => updateContact(contact)} className="border-2 bg-gray-300 border-black px-1 font-bold">Update</button>
                            <button onClick={() => onDelete(contact.id)} className="border-2 bg-gray-300 border-black px-1 font-bold">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList