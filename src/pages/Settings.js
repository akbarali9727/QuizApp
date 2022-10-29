import SelectFields from "../components/SelectFields"
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../hooks/useAxios";
import {useNavigate} from "react-router-dom";

const Settings = () => {
const {response, error, loading} = useAxios({url: "/api_category.php"});
const navigate = useNavigate();

if(loading){
    return <div className="spinner-border text-primary my-spinner" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
}

if(error){
    return <h1>Something go wrong {error}</h1>
}

const difficultyOptions = [
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"}
]

const typeOptions = [
    {id: "multiple", name: "Multiple Choice "},
    {id: "boolean", name: "True/False"}
]

const handleSubmit = (e) => {
    navigate("/questions");
};

    return <form onSubmit={handleSubmit}>
        
            <SelectFields options={response.trivia_categories} label="Category" />
            <SelectFields options={difficultyOptions} label="Difficulty" />
            <SelectFields options={typeOptions} label="Type" />
            <TextFieldComp />
            <button className="btn btn-md btn-primary col-lg-5 col-sm-3 my-btn">Get Started</button>
        
    </form>
}

export default Settings;