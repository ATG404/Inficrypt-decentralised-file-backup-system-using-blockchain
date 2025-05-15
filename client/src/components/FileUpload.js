import {useState} from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload=({ contract,account,provider })=>{
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("No image selected");
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                        headers: {
                            pinata_api_key: `4a726560cdcc579bed26`,
                            pinata_secret_api_key: `ef26c13bcf6f6a904f45240c884af6efc971ec66b00b859861d544665bc3522e`,
                            "Content-Type": "multipart/form-data",
                            },
         });
               const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
               contract.add(account, ImgHash);
               alert("Successfully Image is uplaoded");
               setFileName("No image selected");
               setFile(null);
            }catch(e){
                alert("unable to upload in pinata");
            }
        }
    };
    const retriveFile =(e)=>{
        const data = e.target.files[0];//array
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    }

    return <div className = "top">
        <form className="form" onSubmit = {handleSubmit}>
            <label htmlFor = "file-upload" className = "choose">
                Choose Image
            </label>
            <input 
                disabled = {!account}
                type = "file" 
                id = "file-upload" 
                name = "data" 
                onChange = {retriveFile}
            />
            <span className = "textArea">Image: {fileName}</span>
            <button type="submit" className = "upload" disabled = {!file}>
                Upload File
            </button>
        </form>
    </div>;
    
};
export default FileUpload;