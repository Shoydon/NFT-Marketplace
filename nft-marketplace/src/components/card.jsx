import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../components-css/card.css'

// const NFTCard = ({ nft, addToCart, index, removeFromCart}) => {
const NFTCard = ({ nft, addToCart, index}) => {
    const handleAddToCart = () => {
        if(!nft.isAdded){
            nft.isAdded = true;
            addToCart(nft, index);
        }
    };

    // const handleRemoveFromCart = ({nft}) => {
    //     removeFromCart(nft);
    // }

    return (
        <div className="card m-5">
            <div className="card-img">
                <img src={nft.nftUrl} className = 'card-img-top card-img' alt={nft.name} />
            </div>
            <div className="card-body">
                <h5 className='card-title'>{nft.id}</h5>
                <p className='card-text'>{nft.nftDescription}</p>
                <p className='card-text'>Price: {nft.nftPrice} wei</p>
                {!nft.isAdded && <button onClick={handleAddToCart} className='btn btn-primary'>Add to Cart</button>}
                {/* {!nft.isAdded ? <button onClick={handleAddToCart} className='btn btn-primary'>Add to Cart</button> : <button onClick={handleRemoveFromCart(nft)} className='btn btn-primary'>Remove</button>} */}
            </div>
        </div>
    );
};

export default NFTCard
