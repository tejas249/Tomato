import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc , id }) => {
    const [itemCount, setItemCount] = useState(0);
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

    // State for managing comment box visibility and the comment itself
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");

    // State for managing wishlist
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Function to toggle comment box
    const toggleCommentBox = () => {
        setShowCommentBox(!showCommentBox);
    };

    // Function to handle comment submission
    const handleCommentSubmit = () => {
        console.log(`Comment for ${name}:`, comment);
        setComment("");  // Clear comment after submission
        setShowCommentBox(false); // Close the comment box after submission
    };

    // Function to toggle wishlist status
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price"> ₹{price}</p>
            </div>

            {/* Wishlist button */}
            <button 
                className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`} 
                onClick={toggleWishlist}
            >
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {/* Button to toggle comment box */}
            <button className='comment-button' onClick={toggleCommentBox}>
                {showCommentBox ? "Cancel" : "Add Comment"}
            </button>

            {/* Comment input box */}
            {showCommentBox && (
                <div className='comment-box'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                        className='enter-comment'
                    />
                    <button className='submit-comment-button' onClick={handleCommentSubmit}>
                        Submit Comment
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodItem;
