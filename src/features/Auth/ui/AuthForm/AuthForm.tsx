import React, {useCallback, useState} from 'react';
import RegForm from "../RegForm/RegForm";
import LoginForm from "../LoginForm/LoginForm";



const AuthForm = () => {
    const [typeAuthLogin, setTypeAuth] = useState(false)
    const handleSetTypeAuth = useCallback(() => {
        setTypeAuth(!typeAuthLogin)
    }, [typeAuthLogin])
    if (typeAuthLogin) {
        return <LoginForm setTypeAuth={handleSetTypeAuth}/>
    }
    return (
        <RegForm setTypeAuth={handleSetTypeAuth}/>
    )
};

export default AuthForm;
