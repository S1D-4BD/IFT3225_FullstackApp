import { verifyUser} from '../api';
import { useNavigate } from 'react-router-dom';
import CircleSvg from '../components/CircleSvg';
import WavesSvg from "../components/WavesSvg";
import { Link } from 'react-router-dom';
import LineSvg from '../components/LineSvg';
export function Landing(){
    return(
        <>
        <LineSvg />
        <div className="center-div">
            <h1> Bienvenue sur Synchro UdeM</h1>

                <Link to="/login">
                    <button> Login </button>
                </Link>
                <Link to="/signin">
                    <button> Register </button>
                </Link>
        </div>
        <WavesSvg />
        </>
    )
}