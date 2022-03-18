import { useDispatch } from 'react-redux';
import { sendLogInRequest, sendRegisterRequest } from '../redux/user';
import {useNavigate} from "react-router-dom"
import { getCart } from '../redux/cart';

function useForm(userName, email, password, type, setLoader ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault()
    setLoader(true)
    
    if(type === "register"){
      userName.reset();
      email.reset();
      password.reset();
      dispatch(sendRegisterRequest({        
        name: userName.value,
        email: email.value,
        password: password.value,
      }))
        .then(data => {
          if (data.type.includes('rejected')) {
            setLoader(false)
          } else {
            dispatch(getCart())
              .then(() => setLoader(false))
              .then(() => navigate("/home"))
              .catch(() => console.log('catch'))
          }
        })/* 
        .then(() => dispatch(getCart()))
        .then(() => setLoader(false))
        .then(() => navigate("/home")) */
        
    }else{
      email.reset();
      password.reset();
      dispatch(sendLogInRequest({
        email: email.value,
        password: password.value,
      }))
        .then(data=>{
          if (data.type.includes('rejected')){
            setLoader(false)
          }else{
            dispatch(getCart())
              .then(() => setLoader(false))
              .then(() => navigate("/home"))
          }
        })/* 
        .then(()=> dispatch(getCart()))
        .then(() => setLoader(false))
        .then(()=> navigate("/home"))
        .catch(()=> console.log('catch')) */
    }
  };

  return handleSubmit;
}
export default useForm;
