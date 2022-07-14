import { atom } from "recoil";


const userNameAtom = atom({

    key:"userNameState",
    default:""

});

export default userNameAtom;