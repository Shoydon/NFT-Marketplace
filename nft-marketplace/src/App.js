import "./App.css";
import NFTCard from "./card";
import NFTs from "./data.json";
import { useState } from "react";
import Navbar from "./navbar";
import contractData from "./contract.json";
import Web3 from "web3";
import handleAppendTrxn from "./navbar";
// import provider from "./navbar";
// import connectedAccount from './navbar';
// import { Transaction, ethers } from "ethers";
// import { ethers, utils } from "ethers";
// import { providers, Wallet } from 'ethers';
// import { ThirdwebSDK } from '@thirdweb-dev/sdk';
// import info from '../info.json';

function App() {
  // async function connectWallet() {
  //   if (window.ethereum) {
  //     const provider = new providers.Web3Provider(window.ethereum);
  //     const accounts = await provider.listAccounts();
  //     const signer = provider.getSigner();
  //     console.log("Connected wallet:", accounts[0]);
  //     return { provider, signer, account: accounts[0] };
  //   } else {
  //     console.log("Please install MetaMask or a compatible browser extension.");
  //     return null;
  //   }
  // }
  // async function connectWallet() {
  //   try {
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     console.log("Wallet connected");
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // }
  // async function pay({buyerAddress, gasLimit}){
  //   try{
  //     const trxnHash = await contract.methods.pay(totalAmount).send({
  //       from: buyerAddress,
  //       gasLimit,
  //     });
  //     console.log(trxnHash);
  //   } catch (error){
  //     console.log(error);
  //   }
  // }

  // async function handlePayment() {
  //   // alert(`Total Amount: ${totalAmount} wei`);
  //   console.log("entered handlePayment");
  //   try {
  //     const accounts = await web3.eth.getAccounts();
  //     const buyerAddress = accounts[0];
  //     const receiverAddress = contractData.owner;
  //     const transaction = {
  //       to: receiverAddress,
  //       value: totalAmount,
  //     };
  //     const gasLimit = await web3.eth.estimateGas({
  //       ...transaction,
  //       from: buyerAddress,
  //     });

  //     await pay(buyerAddress, gasLimit)

  //     for (let i = 0; i < cart.length; i++) {
  //       NFTs[cart[i].index].isSold = true;
  //       // console.log(cart[i].index);
  //     }
  //     alert(`Payment Successful!`);
  //     setCart([]);
  //     setTotalAmount(0);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function connectWallet() {
  //   try {
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     console.log("Wallet connected");
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // }

  // async function handlePayment() {
  //   try {
  //     if (!window.ethereum) {
  //       alert("Please install MetaMask or another Ethereum wallet");
  //       return;
  //     }
  //     if (!await window.ethereum.isConnected()) {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     }
  //     console.log("Wallet connected");
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  //     const accounts = await web3.eth.getAccounts();
  //     const buyerAddress = accounts[0];
  //     const {web3} = useDapp()

  //     const recipientAddress = "0xdF4b182D4b91647e8bC2356971897975C3cC5A0c"; // Replace with your ETH testnet address
  //     // const amountWei = web3.utils.toWei(totalAmount, "wei"); // Adjust as needed

  //     // const transaction = {
  //     //   to: recipientAddress,
  //     //   value: totalAmount,
  //     // };

  //     // const gasLimit = await web3.eth.estimateGas({ ...transaction, from: buyerAddress });

  //     // const signedTransaction = await web3.eth.accounts.signTransaction(transaction, buyerAddress);
  //     // const transactionHash = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  //     // console.log("Transaction hash:", transactionHash);

  //     try {
  //       // Monitor transaction status using the web3 provider
  //       const txReceipt = await web3.eth.waitForTransactionReceipt(transactionHash);
  //       console.log("Transaction successful:", txReceipt.blockNumber);

  //       // Clear cart and total amount
  //       alert(`Payment Successful!`);
  //       setCart([]);
  //       setTotalAmount(0);
  //     } catch (error) {
  //       console.error("Transaction failed:", error);
  //       // Handle transaction failure, e.g., display an error message to the user
  //     }
  //   }

  // async function handlePayment() {
  //   try{
  //     if(!window.ethereum){
  //       alert("Install metamask")
  //     }
  //     await window.ethereum.request({method: 'eth_requestAccounts'});
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = provider.getSigner();
  //     console.log((await signer).address);
  //     const contractAddress = contractData.contractAddress;
  //     const contractABI = contractData.contractABI;
  //     // const contractByteCode = contractData.contractByteCode;
  //     // const web3 = new Web3(window.ethereum);
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);

  //     // const recipientAddress = "0xdF4b182D4b91647e8bC2356971897975C3cC5A0c";

  //     const res = await contract.connect(signer).pay(totalAmount).then(() => {
  //       console.log(res);
  //     })

  //       for (let i = 0; i < cart.length; i++) {
  //               NFTs[cart[i].index].isSold = true;
  //               // console.log(cart[i].index);
  //             }
  //       setCart([]);
  //       setTotalAmount(0);
  //   } catch(error){
  //     console.log(error);
  //   }
  // }
  // const sdk = new ThirdwebSDK(info.API_KEY, "sepolia");

  const addToCart = (nft, index) => {
    nft.index = index;
    setCart([...cart, nft]);
    setTotalAmount(totalAmount + nft.price);
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
        console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        connectedAccount = accounts[0];
        console.log(connectedAccount);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
    const receiverAddress = contractData.owner;
    // const web3 = new Web3(provider);
    const web3 = new Web3(window.ethereum);
    console.log("Connected Account: ", connectedAccount);
    console.log("Receiver: ", receiverAddress);
    console.log("Total Amount: ", totalAmount);
    try {
      const trxnObj = {
        from: connectedAccount,
        to: receiverAddress,
        value: totalAmount,
        gas: "30000",
      };
      const trxn = await web3.eth.sendTransaction(trxnObj);
      const trxnHash = trxn.transactionHash;
      console.log("Transaction sent.\n Hash: ", trxnHash);
      for (let i = 0; i < cart.length; i++) {
        NFTs[cart[i].index].isSold = true;
      }
      alert("Transaction successful!");
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


  return (
    <div className="nft-marketplace">
      <Navbar
        cart={cart}
        totalAmount={totalAmount}
        handlePayment={handlePayment}
        pastTrxns={pastTrxns}
      />
      <div className="nft-list">
        {NFTs.map(
          (nft, index) =>
            !nft.isSold && (
              <NFTCard
                key={nft.id}
                nft={nft}
                addToCart={addToCart}
                index={index}
              />
            )
        )}
      </div>
    </div>
  );
}

export default App;
