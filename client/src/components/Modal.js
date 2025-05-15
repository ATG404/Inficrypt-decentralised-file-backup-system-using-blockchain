import {useEffect} from "react";
import "./Modal.css";

const Modal=({setModalOpen,contract})=>{
    const sharing =async() =>{
        const address = document.querySelector(".address").value;
        await contract.allow(address)
    };
    useEffect(()=>{
        const accessList = async()=>{
            const accessList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const option = accessList;

            for(let i=0;i<option.length;i++){
                let opt = option[i];
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }
        contract && accessList();
    },[]);
    return <>
    <div className="modalBackground">
        <div className = "modalContainer">
            <div className="title">Share with</div>
            <div className = "body">
            <input type="text" className = "address" placeholder="Enter Address"></input>
        </div>
        <form id="myForm">
            <select id="selectNumber">
                <option className="address">People With Access</option>
            </select>
        </form>
        <div className="footer">
            <button onClick = {()=>{
                setModalOpen(false);
                }}
                id="cancelBtn"
                >Cancel
                </button>
            <button onClick = {()=>sharing()}>Share</button>
        </div>
    </div>
    </div>
    </>;
};
export default Modal;