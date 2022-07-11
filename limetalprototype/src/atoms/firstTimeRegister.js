import { atom,useRecoilState } from "recoil";


const firstTimeRegisterAtom = atom({
    key:"firstTimeRegisterState",
    default:false

});

export default firstTimeRegisterAtom;