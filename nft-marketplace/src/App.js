import './App.css';
import NFTCard from './card';
import NFTs from './data.json'
import { useState } from 'react';
import Navbar from './navbar';

function App() {
  const addToCart = (nft, index) => {
    nft.index = index
    setCart([...cart, nft]);
    setTotalAmount(totalAmount + nft.price);
  };

  const handlePayment = () => {
    alert(`Total Amount: ${totalAmount} ETH. Payment Successful!`);
    for(let i = 0; i < cart.length; i++){
      NFTs[cart[i].index].isSold = true
      // console.log(cart[i].index);
    }
    setCart([]);
    setTotalAmount(0);
  };
  
  const [cart, setCart] = useState([]) 
  const [totalAmount, setTotalAmount] = useState(0)

  // console.log(NFTs);

  return (
    <div className="nft-marketplace">
      {/* <h1>NFT Marketplace</h1> */}
      <Navbar cart = {cart} totalAmount={totalAmount} addToCart={addToCart} handlePayment={handlePayment}/>
      <div className="nft-list">
        {NFTs.map((nft, index) => (
        !nft.isSold && <NFTCard key={nft.id} nft={nft} addToCart={addToCart} index = {index} />
        ))}
      </div>
    </div>
  );
}

export default App;
