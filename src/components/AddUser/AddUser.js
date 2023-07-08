import './AddUser.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const AddUser = () => {

    const [countries,setCountries] = useState([])
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [country,setCountry] = useState(null)
    const [birthdate,setBirthdate] = useState(null)
    const [saving,setSaving] = useState(false)
    const [errors,setErrors] = useState('')
    const navigate = useNavigate()

    const getCountries = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/country`).then(countries => {
            const countriesList = countries.data
            setCountries(countriesList)
            if(countriesList?.length > 0){
                setCountry(countriesList[0]?.id)
            }

        })
    }

    const handleAddUser = async () => {
        try{
            setSaving(true)
            setErrors('')

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/add`,{
                name,
                email,
                password,
                country,
                birthdate,
            })

            navigate('/home')
        }catch (e){
            setErrors(e.response?.data)
        } finally {
            setSaving(false)
        }

    }

    useEffect(() => {
        getCountries()
    },[])

    return (
        <>
            <div className={'add-user-sidebar-container'}>
                <div className={'add-user-sidebar-title'}>
                    Hello Friend
                </div>
                <div className={'add-user-sidebar-desc'}>
                    Enter your personal details and start journey  with us!
                </div>
            </div>
            <div className={'add-user-sidebar-form-container'}>
                <div className={'add-user-sidebar-form-header'}>
                    Add a User
                </div>
                <div className={'add-user-sidebar-form-desc'}>
                    Type in your info
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Name'} className={'add-user-sidebar-form-input'} type="text"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} className={'add-user-sidebar-form-input'} type="text"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Password'} className={'add-user-sidebar-form-input'} type="password"/>
                <select onChange={(e) => setCountry(e.target.value)} id="country" name="country" className={'add-user-sidebar-form-dropdown'} >
                    {countries.map((country,index) => (
                        <option key={index} value={country?.id}>{country?.name}</option>
                    ))}
                </select>
                <input value={birthdate} onChange={(e) => setBirthdate(e.target.value)}  type="date"  placeholder={'Date of birth'}  className={'add-user-sidebar-form-input'} />

                {errors?.length > 0 &&
                    <div className={'add-user-errors'}>
                        {errors}
                    </div>
                }
                <input disabled={saving} onClick={() => handleAddUser()} type={'button'} value={saving ? 'Saving...' : 'Save'} className={saving ? 'add-user-sidebar-form-button-saving' : 'add-user-sidebar-form-button'} />
            </div>
        </>
    )
}

export default AddUser
