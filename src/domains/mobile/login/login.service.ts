const LoginService = () => {
    const logic = () => {
        return {
            access_token: '123',
            refresh_token: '123',
        };
    };

    return {
        logic,
    };
};

export const loginService = LoginService();
