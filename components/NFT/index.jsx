import React, { useEffect, useState } from "react";
import { CORS_ENDPOINT } from "../../constant"
import styles from "./nft.module.css"

const NFT = (props) => {
    const [metadata, setMetaData] = useState()
    const [loaded, setLoaded] = useState(false)
    const [nftElement, setNftElement] = useState("")
    
    useEffect(async () => {
        await getMetaData()
    }, [props.uri])

    const getMetaData = async () => {
        fetch(CORS_ENDPOINT+props.uri,{
            "method": "GET",
            "headers": {
              "content-type": "application/json",
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setMetaData(result)
            },
            (error) => {
                console.log(error)
        })
    }
    const handleLoad = () => {
        console.log("Loaded")
        setLoaded(true)
    }

    const handleNftSelect = () => {
        let nftName = metadata["name"];
        nftName = nftName.replace(/\s/g, '').replace("Myopa", "").replace("#", "").replace(/[0-9]/g, '').toLowerCase()
        props.handleSelectedNFT(nftName)
    }

    useEffect(() => {
        if(metadata == undefined) {
            return;
        }
        setNftElement(
            <div className={styles.nft_image} onClick={handleNftSelect}>
                {!loaded && (
                    <div className={styles.loading}></div>
                ) }
                <img src={metadata["image"]} onLoad={handleLoad} />
                <p className="text-lg text-black">{metadata["name"]}</p>
            </div>
        )
    }, [metadata])

    return (
        <div className="mb-12 w-1/5 px-1 cursor-pointer hover:shadow-md">
            {nftElement}
        </div>
    )
}

export default NFT;