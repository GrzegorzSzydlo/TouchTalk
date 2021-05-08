import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {getUserDetails} from '../../actions/getUserDetails.js'
import {useDispatch, useSelector} from "react-redux";
import './accountSettings.css';

const AccountSettings = () => {
    const defaultAvatar = 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png';
    const [userInput, setUserInput] = useState("");
    const [avatar, setAvatar] = useState("");
    const auth = useSelector(state => state.auth)
    console.log(auth)

    const uploadAvatar = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setAvatar(base64);
      };
const xd = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB/';
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
        
        //   fileReader.onerror = (error) => {
        //     reject(error);
        //   };
        });
      };
console.log(avatar)
    const dispatch = useDispatch();
    useEffect(() => {
        getUserDetails()
        .then(res => setUserInput({  
            username: res.data.userDetails.name,
            surname: res.data.userDetails.surname,
            phone: res.data.userDetails.phone,
        }))
    }, []);

    const handleInput = (e) => {
       setUserInput({...userInput, [e.target.name]: e.target.value});

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {
            name: `${userInput.username}`,
            surname: `${userInput.surname}`,
            phone: 1234567890,
            // image: `${avatar}`
            // image: 'https://www.iconfinder.com/icons/2758854/man_avatar_business_icon',
            // image: null
            image: 'zdjecieaaaaaaaaaaaaa'
        }
        const url = `http://localhost:8080/api/users/${localStorage.getItem("id")}/edit`;
        
        await axios.put(url, userDetails)
        getUserDetails()
        .then(res => dispatch({type: 'USERDATA_UPDATE', payload: res.data.userDetails}))
    }

const a = 'data:image/png;base64,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'

let counter = 0;
for (let i=0; i<a.length; i++){
    counter =i;
}

console.log(counter)










    return (
        <div className="accountSettings-wrapper">
            <div className="accountSettings-avatar" >
                <img className="accountSettings-img" src={avatar ? avatar : defaultAvatar} alt="avatar"/>
                <input
                    type="file"
                    onChange={uploadAvatar}
                />
            </div>
            <form className="accountSettings-form"action="submit" onSubmit={handleSubmit}>
            <label className="accountSettings-label">IMIE</label>
            <input 
                name = "username"
                className="input-account" 
                placeholder="imie" 
                value={userInput.username} 
                onChange={handleInput} 
                type="text"
            />
            <label className="accountSettings-label">NAZWISKO</label>
            <input 
                name = "surname"
                className="input-account" 
                placeholder="nazwisko" 
                value={userInput.surname} 
                onChange={handleInput} 
                type="text"
            />
            <label className="accountSettings-label">TELEFON</label>
            <input 
                name = "phone"
                className="input-account" 
                placeholder="telefon" 
                value={userInput.phone} 
                onChange={handleInput} 
                type="text"
            />
            <button className="accountSettings-btn" type="submit">Zapisz</button>
            </form>
        </div>
        
    )
}

export default AccountSettings;