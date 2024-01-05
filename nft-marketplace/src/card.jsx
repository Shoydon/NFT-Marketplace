import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './card.css'

const NFTCard = ({ nft, addToCart, index }) => {
    const handleAddToCart = () => {
        if(!nft.isAdded){
            nft.isAdded = true;
            addToCart(nft, index);
        }
    };

    return (
        <div className="card m-5">
            {/* <img src={`${img}/${nft.id}`} className = 'card-img-top card-img' alt={nft.name}  /> */}
            {/* <img src={require(`../../nft-marketplace/public/assets/nft-images/${nft.image}`)} className = 'card-img-top' alt={nft.id}  /> */}
            <div className="card-img">
                <img src={require(`../src/nft-images/${nft.id}.jpg`)} className = 'card-img-top card-img' alt={nft.name} />
            </div>
            <div className="card-body">
                <h5 className='card-title'>{nft.id}</h5>
                <p className='card-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, sunt.</p>
                <p className='card-text'>Price: {nft.price} ETH</p>
                {!nft.isAdded && <button onClick={handleAddToCart} className='btn btn-primary'>Add to Cart</button>}
            </div>
        </div>
    );
};

export default NFTCard
