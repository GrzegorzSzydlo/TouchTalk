const setToken = () => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
        return {
            Authorization: `Bearer ${userToken.token}`
        };
    }
}
export default setToken;