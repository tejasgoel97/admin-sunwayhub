import React, { useState } from 'react';
import InputformComp from './InputFormComp';

const AddProductForm =() =>{
    const [name, setName] = useState('');
    const [MRP, setMRP] = useState(0);
    const [SP, setSP] = useState(0);
    const [discription, setDiscription] = useState(["ok Bhai", "kjkjkj"])

    function handleDescriptionChange(index, value){
        console.log(index, value)
        let disc = [...discription];
        disc[index] = value;
        setDiscription(disc);
    }
    function handleNewDescrition(){
        let disc = [...discription];
        disc.push("")
        setDiscription(disc)
    }
    function removeDiscription(index){
        let disc = [...discription];
        disc.splice(index, 1);
        setDiscription(disc)
    }

    return (
        <div className="w-auto xl:w-4/6 space-y-3">
            <InputformComp label="Product Name" text={name} setText={setName} type="text"/>
            <div className="flex justify-center space-x-2 flex-1">
               <InputformComp label="MRP" text={MRP} setText={setMRP} type="number"/>
               <InputformComp label="Selling Price" text={SP} setText={setSP} type="number"/>
            </div>
            <div>
                <span>
                <span class="font-bold ">Description</span>
                <span class="font-bold mx-3 p-1 px-3 bg-green-500 mb-3 hover:cursor-pointer active:bg-red-600 rounded-full" onClick={handleNewDescrition}>Add New + </span>
                </span>
            <div>

                
                {discription.map((text, index)=>{
                    return <div className="flex align-middle m-0 p-0">
                    <InputformComp  text={text} setText={handleDescriptionChange.bind(this, index)} type="number"/>
                    <button class="font-bold  mb-3 hover:text-red-400" onClick={()=>removeDiscription(index)}>Remove </button>
                    </div>
                })}
                </div>
            </div>
            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full">Create</button>
        </div>
    )
}


export default AddProductForm;