import { useState, useEffect } from "react";
import ContactForm from "./ContactFrom";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button
        onClick={openCreateModal}
        className="font-bold text-center border-2 p-2 border-black rounded-lg ml-72 mt-10"
      >
        Create New Contact
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="">
            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </div>
          <button
            className="ml-64 border-2 border-black bg-gray-300 rounded-lg font-bold px-2 mt-2"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default App;
