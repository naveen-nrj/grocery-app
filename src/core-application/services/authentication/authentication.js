export const registerLogin = (userName, password) => {
    sessionStorage.setItem("user", userName);
}
export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem("user");
    if (!user) return false
    return true;
}
export const logout = () => {
    sessionStorage.removeItem("user");
}
export const getLoggedInUserName = () => {
    let user = sessionStorage.getItem("user")
    if (user === null) return ''
    return user
}