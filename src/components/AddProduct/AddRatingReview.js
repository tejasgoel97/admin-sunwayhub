import React from 'react'
import InputformComp from '../InputFormComp';


const AddRatingReview = (props) =>{
    const {rating, setRating, reviews, setReviews} = props;

    function handleReviewChange(text){
        if(isNaN(text)) return 
        if(+text> 5) return 
        if(text.length >3) return 
        setRating(text)
    }
    function handleNewDescrition(){
        let disc = [...reviews];
        disc.push({reviewText:"", reviewerName:""})
        setReviews(disc)
    }
    function handleReviewsChange(index,type, value){

        let disc = [...reviews];
        disc[index] = {...disc[index], [type]: value};
        setReviews(disc);
    }
    function removereviews(index){
        let disc = [...reviews];
        disc.splice(index, 1);
        setReviews(disc)
    }
    return <>
    <InputformComp label="Product Rating" text={rating} setText={handleReviewChange} type="text"/>
    <div>  
                <span className ="font-bold ">Reviews  </span>
                <span className="hover:animate-bounce cursor-pointer" onClick={handleNewDescrition}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png"/></span>
            <div> 
                {reviews.map((text, index)=>{
                    return <div className="flex align-middle m-0 p-0" key={index}>
                        <>
                    <h5 className='block'>Text</h5>
                    <InputformComp  text={text.reviewText} setText={handleReviewsChange.bind(this, index, "reviewText")} type="text"/>
                    </>
                    <>
                    <h5 className='block'>Name</h5>
                    <InputformComp  text={text.reviewerName} setText={handleReviewsChange.bind(this, index, "reviewerName")} type="text"/>
                    </>
                    <button className="font-bold  mb-3 hover:text-red-400" onClick={()=>removereviews(index)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png"/> </button>
                    </div>
                })}
                </div>
            </div>
    </>
}


export default AddRatingReview;