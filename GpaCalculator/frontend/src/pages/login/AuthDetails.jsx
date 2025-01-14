// For authorizing and signing out
import {onAuthStateChanged, signOut} from "firebase/auth";
// Frontend library for building UI
import React, {useEffect, useState} from "react";
// Database with login information
import {auth} from "../../firebase";
// For navigating to different pages
import {useNavigate} from "react-router-dom";

const AuthDetails = () => {

   // Set default values
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    // Retrieve login information from database
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    // Signs out user
    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successful");
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };

    // Bring to sign in page
    const userSignIn = () => {
        signOut(auth)
            .then(() => {
                console.log("User requires to sign in");
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };

// Sign in or sign out button at top right of screen
    return (
        <div>
            {authUser ? (
                <>
                    <span style={{paddingRight: '10px'}}>
                        {`Signed In as ${authUser.email}`}
                    </span>
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <button onClick={userSignIn}>Login</button>
                </>
            )}
        </div>
    );
};

export default AuthDetails;
