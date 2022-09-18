import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";


export default function ViewGuestList({open, thisGuestList, hostId, thisEventId, onClose}) {

    const urlRoot = "http://localhost:3000";

    const handleLinkCopy = (guest) => {
		const link = urlRoot + "/eventview/" + thisEventId + "/" + guest.inviteUrl;
		navigator.clipboard.writeText(link);
	}
    
    const mapGuestList = (guestList) => {
        return guestList.map((guest) => {
            return (guest.userId !== hostId ? 
                <tr key={guest.id}>
                <th>{guest.nickname}</th>
                <td><input type="text" className="linkTextBox" value={urlRoot + "/eventview/" + thisEventId + "/" + guest.inviteUrl}></input><button onClick={() => handleLinkCopy(guest)}><i className="fa fa-clone"></i></button></td>
                </tr>
                : null
            );
        })
    }

    if (!open && thisGuestList.length > 0) {
        return null;
    } else {
        return (
            <motion.div className="modalContainer"
                initial={{ left: "2000px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 1, transition: { duration: .4 }}}
            >
                <span className="modalClose" onClick={onClose}>❌</span>
                <h2>Guest List:</h2>
                <div className='guestListContainer'>
                    <table>
                        <tbody>
                        {mapGuestList(thisGuestList)}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        )
    }
}