export const setToken = (str)=>{
    localStorage.setItem('USERTOKEN',str)
}
export const getToken = ()=>{
    return localStorage.getItem('USERTOKEN')
}
export const setUserName = (str)=>{
    localStorage.setItem('USERNAME',str)
}
export const getUserName = ()=>{
    return localStorage.getItem('USERNAME')
}