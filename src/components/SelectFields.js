import { useState } from "react";
import {useDispatch} from "react-redux";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange
} from "../redux/actions";

const SelectFields = props => {
    const { label, options } = props;
    const dispatch = useDispatch();
    const [value, setValue]=useState("");
    const handleChange= (e) =>{
      setValue(e.target.value);
      switch (label) {
        case "Category":
          dispatch(handleCategoryChange(e.target.value));
          break;
        case "Difficulty":
          dispatch(handleDifficultyChange(e.target.value));
          break;
        case "Type":
          dispatch(handleTypeChange(e.target.value));
          break;
        default:
          return;
      }
    };
    

    function createOption(opt){
     return <option key={opt.id} value={opt.id}>{opt.name}</option>
    }

    return (<div>
    <select name={value} placeholder={label} className="selector col-lg-5 col-sm-3" onChange={handleChange}>
  <option >{label}</option>
  {options.map(createOption)}
</select>
    </div>)
}

export default SelectFields;