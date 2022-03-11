import { useDispatch } from 'react-redux';
import { sendLogInRequest, sendRegisterRequest } from '../redux/user';
import {useNavigate} from "react-router-dom"
import { getCart } from '../redux/cart';

function useForm(userName, email, password, type) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {

      e.preventDefault()

      if(type === "register"){
        userName.reset();
        email.reset();
        password.reset();
        dispatch(sendRegisterRequest({        
          name: userName.value,
          email: email.value,
          password: password.value,
        }))
          .then(() => dispatch(getCart()))
          .then(()=>navigate("/home"))
      }else{
        email.reset();
        password.reset();
        dispatch(sendLogInRequest({
          email: email.value,
          password: password.value,
        }))
          .then(()=> dispatch(getCart()))
          .then(()=>navigate("/home"))
      }
  };

  return handleSubmit;
}
export default useForm;
