import React from "react";
import { useState } from "react";
import { motion } from "framer-motion"
import './AddNewLink.css'

export default function AddNewLink({open, onClose}) {

    //Constant States
    const [inviteLink, setInviteLink] = useState('');

    //Handles input of Invite Link
    const handleInputChange = (event => {
        setInviteLink(event.target.value);
    })

    if (!open) {
        return null;
    } else {
        return (
            <motion.div className="modalContainer"
                initial={{ left: "2000px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 1, transition: { duration: .4 }}}
            >
                <span className="modalClose" onClick={onClose}>❌</span>
                <h2>Add New Invite Link</h2>
                <p>Please Insert New Invite Link Below</p>
                <div className='user-box'>
                    <input
                        type="text"
                        id="inviteLink"
                        name="inviteLink"
                        className="form-control"
                        onChange={handleInputChange}
                        required
                    />
                    <label className="sr-only">Invite Link</label>
                    <button type="submit">Add Link</button>
                </div>
            </motion.div>
        )
    }
}