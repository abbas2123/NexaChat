import { useState } from "react";
type Modalprop ={
  isModal:boolean;
  isClose:()=>void;
  onSave:(nexaId:number)=>void
}

function ContactSaveModal({isModal,isClose,onSave}:Modalprop){
const [nexaId, setNexaId] = useState<number|''>('');
  if(!isModal) return null;

 const handleSave = () => {
   if (nexaId === "") return;

   onSave(nexaId);
   setNexaId("");
   isClose();
 };
return (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="w-full max-w-md bg-[#151E16] border border-[#333B33] rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Add Contact</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Nexa ID"
          value={nexaId}
          onChange={(e) => setNexaId(e.target.value?Number(e.target.value):"")}
          className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none focus:border-[#25D366]"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={isClose}
          className="px-5 py-2 border border-[#333B33] rounded-xl text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-5 py-2 bg-[#25D366] text-black rounded-xl font-semibold"
        >
          Save Contact
        </button>
      </div>
    </div>
  </div>
);
}

export default ContactSaveModal;