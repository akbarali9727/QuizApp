import {useDispatch} from "react-redux";
import { handleAmountChange } from "../redux/actions";

const TextFieldComp = () => {
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        dispatch(handleAmountChange(e.target.value));
    };

    return <div><input  className="col col-lg-5 col-sm-3 text-field" type="number" placeholder="Amount of Questions" onChange={handleChange} /></div>

}


export default TextFieldComp;