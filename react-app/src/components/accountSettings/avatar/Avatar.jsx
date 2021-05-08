import React, {useState} from 'react';

const Avatar = () => {
    const [baseImage, setBaseImage] = useState("");

    const uploadAvatar = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setBaseImage(base64);
    };

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        // fileReader.onerror = (error) => {
        //   reject(error);
        // };
      });
    };
const url = 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png';
    return(
<div className="avatar">
      <input
        type="file"
        // onChange={(e) => {
        //   uploadAvatar(e);
        // }}
        onChange={uploadAvatar}
      />
      <br></br>
      <img src={baseImage ? baseImage : url} alt="xd" height="200px" />
    </div>
    )
}

export default Avatar;