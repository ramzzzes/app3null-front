import './Home.css';
import axios from "axios";
import {useEffect, useState} from "react";

const Home = () => {

    const [users,setUsers] = useState([])

    const getUsers = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get`)
            .then((response) =>  setUsers(response.data))
            .catch(e => {
                console.log(e.response?.data)
            })
    }

    useEffect(() => {
        getUsers()
    },[])


    return (
        <div className={'header'}>
            <div className={'header-title'}>
                User Data Table
            </div>
            <div className={'header-container'}>
                <div className={'header-item'}>
                    Name
                </div>
                <div className={'header-item'}>
                    Country
                </div>
                <div className={'header-item'}>
                    Date of birth
                </div>
            </div>

            {users?.map(user => (
                <div className={'content'}>
                    <div className={'content-item'}>{user?.name}</div>
                    <div className={'content-item'}>{user?.country}</div>
                    <div className={'content-item'}>{user?.birthdate}</div>
                </div>
            ))}

        </div>
    )
}

export default Home
