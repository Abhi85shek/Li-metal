import { atom } from "recoil";


const loggedInUserAtom = atom({

    key:"loggedInUserState",
    default:""

});

export default loggedInUserAtom;