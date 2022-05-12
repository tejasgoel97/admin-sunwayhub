import { doc, setDoc } from 'firebase/firestore';
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom'

import Navbar from "./components/Navbar"
import { db } from './firebase/config';
import useHomeSetup from './hooks/useHomeSetup';




const App =()=>{
    const {error} = useHomeSetup()
  const categories = [
    {
        "productId": "Accessories",
        "img": {
            "imgName": "Accessories Category",
            "url": "https://cdn2.vectorstock.com/i/1000x1000/48/41/garden-accessories-set-vector-21204841.jpg",
            "altText": "Accessories Category"
        },
        "subCat": [
            {
                "id": "Water Pipe",
                "img": {
                    "url": "https://m.media-amazon.com/images/I/81s6Yf4fqCL._SX679_.jpg",
                    "altText": "Water Pipe"
                },
                "subCatName": "Water Pipe"
            }
        ],
        "catName": "Accessories",
        "id": "Accessories"
    },
    {
        "productId": "Pebbles",
        "img": {
            "altText": "Pebbles Category",
            "url": "https://www.oregonlive.com/resizer/e9eyYqf2gPDHybW-EZjIN3Xe6Po=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/hg_impact/photo/12753795-large.jpg",
            "imgName": "Pebbles Category"
        },
        "catName": "Pebbles",
        "id": "Pebbles",
        "subCat": [
            {
                "id": "Mix Color Pebbles",
                "img": {
                    "url": "https://m.media-amazon.com/images/I/51wx2S11FEL.jpg",
                    "altText": "Mix Color Pebbles"
                },
                "subCatName": "Mix Color Pebbles"
            },
            {
                "id": "Big Size Pebbles",
                "subCatName": "Big Size Pebbles",
                "img": {
                    "url": "https://www.dhresource.com/0x0/f2/albu/g10/M00/E5/F1/rBVaVl1umICAaB5RAAZucff8Xmg332.jpg",
                    "altText": "Big Size Pebbles"
                }
            },
            {
                "img": {
                    "altText": "Small Size Pebbles",
                    "url": "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-pebbles-onex-pebbles-black-medium-1-kg-16969325314188_398x398.jpg?v=1634225033"
                },
                "id": "Small Size Pebbles",
                "subCatName": "Small Size Pebbles"
            }
        ]
    },
    {
        "productId": "Plants",
        "catName": "Plants",
        "img": {
            "url": "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-top-4-die-hard-succulents-pack-1_287x382.jpg?v=1634230202",
            "imgName": "Plants Category",
            "altText": "Plants Category"
        },
        "id": "Plants",
        "subCat": [
            {
                "img": {
                    "url": "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-combo-packs-plants-5-best-indoor-plants-pack-16968508997772_600x600.jpg?v=1634209160"
                },
                "subCatName": "Indoor Plants",
                "id": "Indoor Plants"
            },
            {
                "id": "Outdoor Plants",
                "img": {
                    "url": "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-combo-packs-plants-popular-outdoor-plants-for-gardening-on-terrace-16969219211404_600x600.jpg?v=1634226628"
                },
                "subCatName": "Outdoor Plants"
            },
            {
                "subCatName": "Flowering Plants",
                "img": {
                    "url": "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-top-5-monsoon-flowering-seeds_600x600.jpg?v=1634230337"
                },
                "id": "Flowering Plants"
            }
        ]
    },
    {
        "productId": "Pots",
        "id": "Pots",
        "subCat": [
            {
                "id": "Pots",
                "subCatName": "Pots",
                "img": {
                    "url": "https://m.media-amazon.com/images/I/71akPxYJtPL._SX679_.jpg",
                    "altText": "Pots"
                }
            }
        ],
        "img": {
            "altText": "Pots Category",
            "url": "https://m.media-amazon.com/images/I/71akPxYJtPL._SX679_.jpg",
            "imgName": "Pots Catrgory"
        },
        "catName": "Pots"
    },
    {
        "productId": "Seeds",
        "catName": "Seeds",
        "id": "Seeds",
        "img": {
            "altText": "Seeds Category",
            "imgName": "Seeds Category",
            "url": "https://www.gardentech.com/-/media/Images/GardenTech-NA/US/blog/Starting-Seeds-Right-in-Your-Garden/Starting_Seeds_Right_In_Your_Garden_header.jpg"
        },
        "subCat": [
            {
                "subCatName": "Vegetable/Herb Seeds",
                "id": "Vegetable/Herb Seeds",
                "img": {
                    "url": "https://www.agrifarming.in/wp-content/uploads/2022/02/Vegetable-Seeds-for-Rainy6.jpg"
                }
            },
            {
                "subCatName": "Flower Seeds",
                "id": "Flower Seeds",
                "img": {
                    "url": "https://n1.sdlcdn.com/imgs/j/s/e/OLD-STORE-14-FLOWER-SEEDS-SDL973682940-1-65e4c.jpeg"
                }
            },
            {
                "id": "Fruit Seeds",
                "img": {
                    "url": "https://merriam-webster.com/assets/mw/images/gallery/gal-wap-slideshow-slide/assorted%20fruit%20photo-6825-8b8e196d9d5fd4470911d69ad25fa5e0@1x.jpg"
                },
                "subCatName": "Fruit Seeds"
            }
        ]
    }
]
const homeData = [
    {
        "id": "kKh1LOAlAAXTIhG6NZ8X",
        "position": 0,
        "type": "allcategories"
    },
    {
        "id": "ETFs8Fb0eqlS1svE19Jh",
        "value": {
            "imgUrl": "https://cdn.shopify.com/s/files/1/0047/9730/0847/files/nurserylive-app-home-page-cactus-and-succulent-banner-v3_1_670x400.jpg?v=1637848499",
            "navScreen": "subCategory",
            "navValue": "Indoor Seeds"
        },
        "position": 1,
        "type": "banner"
    },
    {
        "id": "PyR7gCRsLbSRNqJf1tld",
        "position": 2,
        "type": "productlist",
        "value": {
            "groupName": "Flowering Plants",
            "title": "Flowering Plants",
            "groupType": "subCategory"
        }
    },
    {
        "id": "zbAicCUCFTWrIq32z1Iv",
        "type": "slider",
        "position": 3,
        "value": [
            {
                "imgUrl": "https://cdn.shopify.com/s/files/1/0047/9730/0847/files/nurserylive-home-page-banner-buy-1-get-1-seeds-free-v3_7a31c468-0279-4ecc-b9f2-0405ac1115db_1349x500.jpg?v=1636743248",
                "navValue": "Flowering Plants",
                "navScreen": "subCategory"
            },
            {
                "imgUrl": "https://cdn.shopify.com/s/files/1/0047/9730/0847/files/nurserylive-home-page-banner-combo-pack-v3_1349x500.jpg?v=1636743217",
                "navValue": "Plants",
                "navScreen": "category"
            }
        ]
    }
]

function handleCategories() {
  // await setDoc(doc(db, "cities", "new-city-id"), data);
  console.log("before add")
  categories.forEach(item=>{
    setDoc(doc(db, "categories", item.id), item).then((res)=>  console.log(item.id))

  })

}

function handleHome() {
    // await setDoc(doc(db, "cities", "new-city-id"), data);
    console.log("before add Home")
    homeData.forEach(item=>{
      setDoc(doc(db, "home", item.id), item).then((res)=>  console.log(item.id)).catch(console.log)
  
    })
  
  }


  return (
    <div>
      <button onClick = {()=> handleCategories()}>Add Category</button>
      <button onClick = {()=> handleHome()}>Add Home</button>

    </div>
  )
}

export default App;