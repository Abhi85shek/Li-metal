import { atom } from "recoil";

const userRoleAtom = atom({
    key:'userRoleState',
    default:""
});

export default userRoleAtom;