import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import styles from "./ConnectToPhantom.module.css"
import Controller from "./Controller"

type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const ConnectToPhantom = () => {
  const [phantom, setPhantom] = useState<Phantom | null>(null);

  const getProvider = async () => {
    if ("solana" in window) {
      const provider = window["solana"];
      if (provider.isPhantom) {
        const connect = createConnectionConfig(clusterApiUrl("devnet"));
        let ownerToken = provider.publicKey;
        const result = isValidSolanaAddress(ownerToken);
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
          connection: connect,
          serialization: true,
        });
        console.log(nfts)
        return nfts;
      }
    }
  };

  useEffect(() => {
    if ("solana" in window) {
      setPhantom(window["solana"]);
    }
  }, []);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    phantom?.on("connect", () => {
      setConnected(true);
      getProvider()
    });

    phantom?.on("disconnect", () => {
      setConnected(false);
    });
  }, [phantom]);

  useEffect(() => {
    if(phantom != null) {
      connectHandler()
    }
  }, [phantom])

  const connectHandler = () => {
    console.log("Wallect connected")
    phantom?.connect();
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
  };

  let phantomButton;

  if (phantom) {
    if (connected) {
      phantomButton = (
        <button
          onClick={disconnectHandler}
          className="py-2 px-4 border border-purple-700 rounded-md text-sm font-medium text-purple-700 whitespace-nowrap hover:bg-purple-200"
        >
          Disconnect from Phantom
        </button>
      );
    } else {
      phantomButton = (
        <button
          onClick={connectHandler}
          className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75"
        >
          Connect to Phantom
        </button>
      )
    }
  } else {
    <a
        href="https://phantom.app/"
        target="_blank"
        rel="noreferrer"
        className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white"
    >
      Get Phantom
    </a>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <img src="shell.png" className="mb-12"/>
        {phantom && connected && (
          <img src="man_1.png" className={styles.character}/>
        )}
      </div>
      <Controller/>
      { phantomButton }
    </div>
  );
};

export default ConnectToPhantom;
