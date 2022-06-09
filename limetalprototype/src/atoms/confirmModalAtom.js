import { atom } from "recoil";

const confirmModalAtom = atom({
    key:"confirmModalState",
    default:false
});

export default confirmModalAtom;