import NFTCard from "../components/card";
import './home.css'

const Home = ({ addToCart, cart, setCart, nfts }) => {

    // const addToCart = (nft, index) => {
    //     nft.index = index;
    //     setCart([...cart, nft]);
    //     setTotalAmount(totalAmount + nft.price);
    //   };
    
    //   const handlePayment = async () => {
    //     if (totalAmount === 0) {
    //       alert("Your cart can't be empty");
    //       return;
    //     }
    //     let connectedAccount;
    //     try {
    //       if (window.ethereum) {
    //         const web3 = new Web3(window.ethereum);
    //         await window.ethereum.request({ method: "eth_requestAccounts" });
    //         console.log("Wallet connected");
    //         const accounts = await web3.eth.getAccounts();
    //         connectedAccount = accounts[0];
    //         console.log(connectedAccount);
    //       }
    //     } catch (error) {
    //       console.error("Error connecting wallet:", error);
    //     }
    //     const receiverAddress = contractData.owner;
    //     const web3 = new Web3(window.ethereum);
    //     console.log("Connected Account: ", connectedAccount);
    //     console.log("Receiver: ", receiverAddress);
    //     console.log("Total Amount: ", totalAmount);
    //     try {
    //       const trxnObj = {
    //         from: connectedAccount,
    //         to: receiverAddress,
    //         value: totalAmount,
    //         gas: "30000",
    //       };
    //       const trxn = await web3.eth.sendTransaction(trxnObj);
    //       const trxnHash = trxn.transactionHash;
    //       console.log("Transaction sent.\n Hash: ", trxnHash);
    //       for (let i = 0; i < cart.length; i++) {
    //         NFTs[cart[i].index].isSold = true;
    //       }
    //       alert("Transaction successful!");
    //       setCart([]);
    //       setTotalAmount(0);
    //       const trxnURL = `https://sepolia.etherscan.io/tx/${trxnHash}`;
    //       const newTrxn = { trxnHash, trxnURL };
    //       let transactions = [...pastTrxns, newTrxn]
    //       setPastTrxns(transactions)
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };

      // const removeFromCart = ({nft}) => {
      //   for (let i = 0; i < cart.length; i++) {
      //     setCart(cart.filter(nft => nft.nftUrl !== cart[i].nftUrl))          
      //   }
      // }
      
    //   const [cart, setCart] = useState([]);
    //   const [totalAmount, setTotalAmount] = useState(0);
    //   const [pastTrxns, setPastTrxns] = useState([]);

 
    return(
        <div>
            {/* <Navbar
              cart={cart}
              totalAmount={totalAmount}
              handlePayment={handlePayment}
              pastTrxns={pastTrxns}
            /> */}
            <div className="nft-list">
              {nfts.length ? nfts.map(
                (nft, index) =>
                  !nft.isSold && (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      addToCart={addToCart}
                      index={index}
                      // removeFromCart={removeFromCart}
                    />
                  )
              ) : <div className="no-nfts"><h1 className="no-nfts-h1">No more NFTs to display</h1> </div>}
            </div>
        </div>
    )
};

export default Home