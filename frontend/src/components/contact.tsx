import { Search, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { contacts, saveContact, deleteContact } from "../services/UserService";
import ContactSaveModal from "./contacts/contactSaveModal";
import toast from "react-hot-toast";
import ContactItem from "./contacts/contactItems";
import Swal from "sweetalert2";
type Contact = {
  _id: string;
  contactId: {
    _id: string;
    name: string;
    profilePic: string;
    nexaId: number;
  };
};
const ContactDirectory = () => {
  const [contact, setcontact] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await contacts();
        setcontact(response.contacts);
      } catch (error) {
        console.error("Failed to load contacts:", error);
        toast.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);
  const handleSave = async (value: number) => {
    try {
      const response = await saveContact(value);
      console.log("dvdvd", response);
      setcontact((prev) => [...prev, response.contact]);
      toast.success("Contact saved successfully ✅");

      setIsModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        text: "Do you want to delete this contact?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        await deleteContact(id);
      } else {
        return null;
      }
      setcontact((prev) => prev.filter((contact) => contact._id !== id));

      toast.success("Contact deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete contact:", error);
    }
  };
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      {/* Header Section */}
      <header className="p-8 pb-6 border-b border-[#333B33]/50">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333B33] group-focus-within:text-[#25D366] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search contacts, teams or Nexa IDs..."
              className="w-full max-w-2xl bg-[#081009] border border-[#333B33] rounded-xl py-3.5 pl-12 pr-4 text-[#E1E3DF] placeholder-[#333B33] outline-none focus:border-[#25D366]/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 bg-[#25D366] text-[#0D150E] font-bold px-5 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => setIsModal(true)}
            >
              <UserPlus size={18} />
              <span>Add Contact</span>
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#333B33] cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
                alt="Me"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B9389]">
              Directory
            </span>
            <span className="text-[10px] font-mono text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/20">
              {contact.length}
            </span>
          </div>
        </div>
      </header>
      <ContactSaveModal
        isModal={isModal}
        isClose={() => setIsModal(false)}
        onSave={handleSave}
      />
      {/* Contact List Feed */}
      <div className="flex-1 overflow-y-auto p-8 space-y-2 custom-scrollbar">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : contact.length > 0 ? (
          contact.map((con) => (
            <ContactItem
              key={con._id}
              id={con._id}
              name={con.contactId.name}
              nexaId={String(con.contactId.nexaId)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-10 text-[#8B9389]">
            No contacts found
          </div>
        )}

        <div className="py-12 text-center">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#333B33]">
            End of Contacts
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDirectory;
