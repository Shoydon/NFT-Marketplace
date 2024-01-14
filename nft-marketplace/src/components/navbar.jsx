import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Web3 from 'web3';
import Transaction from '../components/trxn';
import { NavLink } from 'react-router-dom';

const Navbar = ({ cart, totalAmount, handlePayment, pastTrxns }) => {

    let connectedAccount;
    // let connected = false;
    
    async function connectWallet() {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // console.log("Wallet connected");
                const accounts = await web3.eth.getAccounts()
                // setAccount(accounts[0]);
                connectedAccount = accounts[0];
                console.log(connectedAccount);
                // connected = true;
                // console.log(account);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }

    // const [pastTrxns, setPastTrxns] = useState([]);

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                <h1 className='text-body-secondary'>NFT-Marketplace</h1>
                </NavLink>
                <form class="d-flex" role="search">
                    {/* {connected ? <button type="button" class="btn btn-success">Connected</button>
 : <button class="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>} */}
                    <button className="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>
                    <button className="btn btn-primary m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Shopping Cart</button>
                    <NavLink to="mintNFT">
                    <button type="button" class="btn btn-info m-2">Mint NFT</button>
                    </NavLink>
                </form>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title" id="offcanvasScrollingLabel">Shopping Cart</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="cart-list">
                        {cart.map((nft) => (
                            !nft.isSold && <img src={nft.nftUrl} className='card-img-top card-img' alt={nft.name} style={{ margin: '5px', borderRadius: '5px' }} />
                        ))}
                    </div>
                    <p className='text-body-secondary'>Total Amount: {totalAmount} wei</p>
                    <button onClick={handlePayment} className='btn btn-primary m-2'>Proceed to Payment</button>
                    
                    <hr></hr>

                    <div className="past-trxns">
                        <h3>Past Transactions</h3>
                        {
                            pastTrxns.map((txn) => {
                                return (<Transaction key={txn.trxnHash} trxnHash={txn.trxnHash} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar