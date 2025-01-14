import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';

const ProtectedRoutes = () => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return authUser ? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
