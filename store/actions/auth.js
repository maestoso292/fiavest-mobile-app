import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const DID_AUTO_LOGIN = 'DID_AUTO_LOGIN';

export const setDidAutoLogin = () => {
    return { type: DID_AUTO_LOGIN };
};

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        //dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

//(email, password) add more info inside this bracket
export const register = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJDYVoRRinh626T1wLJh6MI6sCl7YZ5BM',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorID = errorResData.error.message;
            let message = 'Something wrong';
            if (errorID === 'EMAIL_EXISTS') {
                message = 'This email exist already!';
            }
            throw new Error(message);
        }

        const responseData = await response.json(); 

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn)*1000))

        const expirationDate = new Date(
            new Date().getTime + parseInt(responseData.expiresIn) * 1000
        );

        saveDataToLocal(responseData.token, responseData.localId, expirationDate);

    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJDYVoRRinh626T1wLJh6MI6sCl7YZ5BM',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorID = errorResData.error.message;
            let message = 'Something wrong';
            if (errorID === 'EMAIL_NOT_FOUND') {
                message = 'This email cant be found!';
            } else if (errorID === 'USER_DISABLED') {
                message = 'User disable';
            } else if (errorID === 'INVALID_PASSWORD') {
                message = 'Password Problem';
            }
            throw new Error(message);
        }

        const responseData = await response.json(); 

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn)*1000));

        const expirationDate = new Date(
            new Date().getTime + parseInt(responseData.expiresIn) * 1000
        );

        saveDataToLocal(responseData.token, responseData.localId, expirationDate);

    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return{type: LOGOUT}
}

const saveDataToLocal = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
}