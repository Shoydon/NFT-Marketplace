import React, { useState } from 'react'
import axios from 'axios';
import key from '../key.json'

const MintForm = ({ nfts, setNfts }) => {

    const [file, setFile] = useState('');
    // useEffect(() => {
    //     console.log('nfts changed', nfts)
    //  }, [nfts])

    const handleUpload = async (e) => {
        const start = performance.now();
        console.log("Uploading to IPFS...");
        e.preventDefault();
        try {
            const fileData = new FormData();
            fileData.append("file", file);

            const res = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: fileData,
                headers:{
                    pinata_api_key: key.API_Key,
                    pinata_secret_api_key: key.API_Secret,
                    "Content-Type": "multipart/form-data"
                }
            });
            // https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/Qmc1fus882uTZhJpvsY4xVYRMUV5NAAaqboNeJRomRtaBY
            const fileUrl = "https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/" + res.data.IpfsHash;
            console.log(fileUrl);
            const end = performance.now();
            console.log("Time taken to upload to IPFS: ", end-start);
        // const fileUrl = "abcd";

            const nftName = document.getElementById('nft-name').value;
            const nftDescription = document.getElementById('nft-description').value;
            const nftPrice = parseInt(document.getElementById('nft-price').value);
            const nftUrl = fileUrl;
            const newNFT = { nftName, nftDescription, nftPrice, nftUrl }
            newNFT.isSold = false;
            newNFT.isAdded = false;

            setNfts([...nfts, newNFT ])
            // console.log(nfts);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="mintForm">
                <div class="row justify-content-center">
                <div class="col-sm-8 col-lg-6 col-xl-4 border border-5 rounded shadow mt-5 p-5">
                    <h3 class="fw-bolder text-center my-3">Mint Your NFT</h3>
                    <hr/>
                    <div class="mt-3 mb-3">
                        <label htmlFor="nft-name" class="form-label fw-bold text-primary">
                            NFT name
                        </label>
                        <input type="text" class="form-control" id="nft-name" placeholder="cryptopunk007"
                        />
                    </div>
                    <div class="mt-4 mb-3">
                        <label htmlFor="nft-description" class="form-label fw-bold text-primary">NFT description</label>
                        <textarea class="form-control" id="nft-description" rows="3" placeholder="Decribe your NFT"></textarea>
                    </div>
                    <div class="mt-3 mb-3">
                        <label htmlFor="nft-price" class="form-label fw-bold text-primary">NFT price (in wei)</label>
                        <input type="number" class="form-control" id="nft-price" placeholder="100 wei"/>
                    </div>
                    <div>
                        <label htmlFor="formFile" class="form-label">
                        Upload image
                        </label>
                        <input class="form-control" type="file" id="formFile" onChange={(e) => {setFile(e.target.files[0])}}/>
                    </div>
                    <div class="mt-4 mb-3">
                        <button class="btn btn-primary mt-3 shadow" type="submit" id="mint-nft" onClick={handleUpload}> Mint my NFT </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MintForm;
