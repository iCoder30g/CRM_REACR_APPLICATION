import { useNavigate } from "react-router-dom";
import Not from "../assets/404s.svg"




const NotFound = () => {

    const history = useNavigate();

    function goBack() {
        history(-1);
    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-center" >
            <div>
                <h3>OOPS. This page doesn't exist</h3>
                <img src={Not} alt="404" />
                <div>
                    <button className="btn btn-primary" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </div>
    )
}


export default NotFound;