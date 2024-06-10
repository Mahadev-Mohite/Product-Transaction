import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import './Navbar.css';
import { FaXTwitter } from "react-icons/fa6";
const Navbar = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const iconSize=38;
    const iconColor = 'blue';

    const togglePopup = () => { 
        setShowPopup(!showPopup);
    };

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing tokens)
        navigate('');
    };

    return (
        <div style={styles.nav}>
            <div style={styles.headLogoContainer}>
            <FaXTwitter style={{ fontSize: iconSize , color:iconColor}} />
                <h3 style={{color:iconColor}}><b>Roxiler</b>System</h3>
            </div>
            <div style={styles.profileContainer} onClick={togglePopup}>
                <CgProfile />
            </div>

            {/* Popup window */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3><AiOutlineLogout /> Log Out</h3>
                        {/* Add profile details or actions here */}
                        <button onClick={handleLogout}>Confirm</button>
                        <button onClick={togglePopup}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;

const styles = {
    cartIcon: {
        height: 36,
        marginRight: 20
    },
    nav: {
        height: 50,
        background: '#001f3f',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        position:'fixed',
        top:0,
        width:'100%'
    },
    profileContainer: {
        position: 'relative',
        fontSize: '30px', // Increase the size of the icon
        width: '40px', // Increase the width of the container
        height: '40px', // Increase the height of the container
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white'
    },
    headLogoContainer: {
        position: 'relative',
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        color:'white'
    }
};
