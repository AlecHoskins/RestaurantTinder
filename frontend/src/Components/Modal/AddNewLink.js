import React from "react";
import { useState } from "react";
import { motion } from "framer-motion"
import './AddNewLink.css'
import axios from "axios";
import { API } from '../../Shared/API'

export default function AddNewLink({open, onClose, addLinkURL, token}) {

    //Constant States
    const [inviteLink, setInviteLink] = useState('');

    //Handles input of Invite Link
    const handleInputChange = (event => {
        setInviteLink(event.target.value);
    })

	const handleAddLink = () => {
		console.log(token);
		const guestURL = inviteLink.substring(inviteLink.lastIndexOf('/'))
		axios.put(addLinkURL + guestURL, null, API.createAuthorizedHeaders(token)).catch((error) => {
			alert('Failed to add the link.');
		})
        onClose();
	}

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
                    <button type="submit" onClick={handleAddLink}>Add Link</button>
                </div>
            </motion.div>
        )
    }
}