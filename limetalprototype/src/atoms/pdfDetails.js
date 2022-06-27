import { atom } from "recoil";

const pdfDetailsAtom = atom({
    key:"pdfDetailsState",
    default:{
        PoNumber:"",
    }
});

export default pdfDetailsAtom;