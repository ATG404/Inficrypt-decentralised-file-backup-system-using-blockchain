import { useState } from 'react';
import "./Display.css";

const Display = ({ contract, account }) => {
    const [images, setImages] = useState([]);
    const [address, setAddress] = useState("");

    const getdata = async () => {
        let dataArray;
        const targetAddress = address || account;

        try {
            dataArray = await contract.display(targetAddress);
            console.log("Raw data:", dataArray);
        } catch (e) {
            alert("You don't have access");
            return;
        }

        const isEmpty = !dataArray || dataArray.length === 0;

        if (!isEmpty) {
            // If data is a comma-separated string, convert to array
            let imageArray = Array.isArray(dataArray)
                ? dataArray
                : dataArray.toString().split(",");

            console.log("Parsed image array:", imageArray);
            setImages(imageArray);
        } else {
            alert("No image to display");
        }
    };

    // Helper function to clean IPFS URI
    const getIpfsHash = (item) => {
        if (item.startsWith("ipfs://")) {
            return item.replace("ipfs://", "");
        }
        return item;
    };

    return (
        <>
            <div className="image-list">
                {images.map((item, i) => {
                    const hash = getIpfsHash(item);
                    const imageUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
                    return (
                        <a href={imageUrl} key={i} target="_blank" rel="noopener noreferrer">
                            <img
                                src={imageUrl}
                                alt="NFT"
                                className="image-list"
                            />
                        </a>
                    );
                })}
            </div>
            <input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="address"
            />
            <button className="center button" onClick={getdata}>Get Data</button>
        </>
    );
};

export default Display;
