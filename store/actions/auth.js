import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        //dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

//(email, password) add more info inside this bracket
export const register = (email, password) => {
    return async dispatch => {
        const responce = await fetch(
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
            const errorResData = await responce.json();
            const errorID = errorResData.error.message;
            let message = 'Something wrong';
            if (errorID === 'EMAIL_EXISTS') {
                message = 'This email exist already!';
            }
            throw new Error(message);
        }

        const responceData = await response.json(); 

        dispatch(authenticate(responceData.localId, responceData.idToken, parseInt(responceData.expiresIn)*1000))

        const expirationDate = new Date(
            new Date().getTime + parseInt(responceData.expiresIn) * 1000
        );

        saveDataToLocal(responceData.token, responceData.localId, expirationDate);

    };
};

export const login = (email, password) => {
    return async dispatch => {
        const responce = await fetch(
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
            const errorResData = await responce.json();
            const errorID = errorResData.error.message;
            let message = 'Something wrong';
            if (errorID === 'EMAIL_NOT_FOUND') {
                message = 'This email cant be found!';
            }
            throw new Error(message);
        }

        const responceData = await response.json(); 

        dispatch(authenticate(responceData.localId, responceData.idToken, parseInt(responceData.expiresIn)*1000));

        const expirationDate = new Date(
            new Date().getTime + parseInt(responceData.expiresIn) * 1000
        );

        saveDataToLocal(responceData.token, responceData.localId, expirationDate);

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