import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import contractData from './contract.json';
import Web3 from 'web3';


const Navbar = ({ cart, addToCart, totalAmount, handlePayment }) => {

    const web3 = new Web3(window.ethereum);
    let account = '';

    async function connectWallet() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Wallet connected");
            const accounts = await web3.eth.getAccounts();
            account = accounts[0]
            console.log(account);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <h1 className='text-body-secondary'>NFT-Marketplace</h1>
                <form class="d-flex" role="search">
                    {/* <button class="btn btn-outline-success">Shopping Cart</button> */}
                    {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Shopping cart</button> */}
                    <button class="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Shopping Cart</button>
                </form>
            </div>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title" id="offcanvasScrollingLabel">Shopping Cart</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div className="cart-list">
                        {/* {cart.map((nft, index) => (
                            !nft.isSold && <NFTCard key={nft.id} nft={nft} addToCart={addToCart} index={index} />
                        ))} */}
                        {cart.map((nft) => (
                            !nft.isSold && <img src={require(`../src/nft-images/${nft.id}.jpg`)} className='card-img-top card-img' alt={nft.name} style={{ margin: '5px', borderRadius: '5px' }} />
                        ))}
                    </div>
                    <p className='text-body-secondary'>Total Amount: {totalAmount} wei</p>
                    <button onClick={handlePayment} className='btn btn-primary m-2'>Proceed to Payment</button>
                </div>
            </div>

            {/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasRightLabel offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <div className="cart">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <h2 class="offcanvas-title" id="offcanvasScrollingLabel">Shopping Cart</h2>
                        <div className="cart-list">
                            {cart.map((nft, index) => (
                                !nft.isSold && <NFTCard key={nft.id} nft={nft} addToCart={addToCart} index={index} />
                            ))}
                        </div>
                        <p className='text-body-secondary'>Total Amount: {totalAmount} ETH</p>
                        <button onClick={handlePayment} className='btn btn-info m-2'>Proceed to Payment</button>
                    </div>
                </div>
            </div> */}
        </nav>
    );
};

export default Navbar