import { atom } from "recoil";

const userAtom = atom({
    key:'user',
    default: (() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null; 
    })()
});
export default userAtom;