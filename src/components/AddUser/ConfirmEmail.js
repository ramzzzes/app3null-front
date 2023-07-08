import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './AddUser.css';

const ConfirmEmail = () => {

    const [errors,setErrors] = useState('')
    const {code} = useParams()
    const navigate = useNavigate()

    const checkCode = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/verify`, {
            code
        }).then(() =>  navigate('/home'))
        .catch(e => {
            setErrors(e.response?.data)
        })
    }

    useEffect(() => {
        checkCode()
    },[])

    return (
        <>
            {errors?.length > 0 &&
                <div className={'verify-user-errors'}>
                    {errors}
                </div>
            }
        </>
    )
}

export default ConfirmEmail
