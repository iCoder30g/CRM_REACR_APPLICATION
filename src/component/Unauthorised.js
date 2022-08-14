import { useNavigate } from "react-router-dom";
import Not from "../assets/403s.svg"




const Unauthorised = () => {

    const navigate  = useNavigate();

    const goBack = () => {
        navigate (-1);
    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-center" >
            <div>
                <h3>Unauthorised access</h3>
                <img src={Not} alt="403" />
                <div>
                    <button className="btn btn-primary" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </div>
    )
}


export default Unauthorised;