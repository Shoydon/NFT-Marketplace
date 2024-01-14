import "./App.css";
// import NFTCard from "./components/card";
import NFTs from "./data.json";
import { useEffect, useState } from "react";
import contractData from "./contract.json";
import Web3 from "web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MintForm from "./pages/mintNFT";
import Navbar from "./components/navbar";

function App() {

  const addToCart = (nft, index) => {
    nft.index = index;
    setCart([...cart, nft]);
    setTotalAmount(totalAmount + nft.nftPrice);
  };

  const handlePayment = async () => {
    if (totalAmount === 0) {
      alert("Your cart can't be empty");
      return;
    }
    let connectedAccount;
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        connectedAccount = accounts[0];
        // console.log(connectedAccount);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
    const receiverAddress = contractData.owner;
    const web3 = new Web3(window.ethereum);
    // console.log("Connected Account: ", connectedAccount);
    // console.log("Receiver: ", receiverAddress);
    // console.log("Total Amount: ", totalAmount);
    try {
      const trxnObj = {
        from: connectedAccount,
        to: receiverAddress,
        value: totalAmount,
        gas: "30000",
      };
      const start = performance.now();
      console.log("Initiating transaction...");
      const trxn = await web3.eth.sendTransaction(trxnObj);
      const end = performance.now();
      alert(`Transaction successful!. Time taken to execute transaction: ${end-start}`);
      const trxnHash = trxn.transactionHash;
      console.log("Transaction sent.\n Hash: ", trxnHash);
      for (let i = 0; i < cart.length; i++) {
        setNfts(nfts.filter(nft => nft.nftUrl !== cart[i].nftUrl));
      }
      setCart([]);
      setTotalAmount(0);
      const trxnURL = `https://sepolia.etherscan.io/tx/${trxnHash}`;
      const newTrxn = { trxnHash, trxnURL };
      let transactions = [...pastTrxns, newTrxn]
      setPastTrxns(transactions)
    } catch (e) {
      console.log(e);
    }
  };

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pastTrxns, setPastTrxns] = useState([]);
  const [nfts, setNfts] = useState([]);

  // useEffect(() => {console.log(nfts);}, [nfts]);

  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        totalAmount={totalAmount}
        handlePayment={handlePayment}
        pastTrxns={pastTrxns}
      />
      <hr/>
      <Routes>
        <Route index element={<Home addToCart={addToCart} nfts={nfts}/>}></Route>
        {/* <Route index element={<Home addToCart={addToCart} cart={cart} setCart={setCart}/>}></Route> */}
        <Route path="mintNFT" element={<MintForm nfts={nfts} setNfts={setNfts}/>}></Route>
      </Routes>
    </BrowserRouter>

    // <div className="nft-marketplace">
    //   <Navbar
    //     cart={cart}
    //     totalAmount={totalAmount}
    //     handlePayment={handlePayment}
    //     pastTrxns={pastTrxns}
    //   />
    //   <div className="nft-list">
    //     {NFTs.map(
    //       (nft, index) =>
    //         !nft.isSold && (
    //           <NFTCard
    //             key={nft.id}
    //             nft={nft}
    //             addToCart={addToCart}
    //             index={index}
    //           />
    //         )
    //     )}
    //   </div>
    // </div>
  );
}

export default App;
