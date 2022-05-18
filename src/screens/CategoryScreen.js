import LoadingIndicator from "../components/comman/LoadingIndicator";
import useCategories from "../hooks/useCategories";

const CategoryScreen = () => {
    const {categories,isCategoriesloading, categoriesLoadingError} = useCategories();
    console.log({isCategoriesloading, categoriesLoadingError})
    console.log(categories)
    if(isCategoriesloading){
        return <LoadingIndicator />
    }
    if(categoriesLoadingError){
        return <p className="font-extrabold"> SomeThing Went Wrong...Reload the Page</p>
    }
    return <div className="p-10">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div>
            {categories.map((cat)=>{
                return <div className="bg-green-200 m-5 p-5">
                    <div className=" flex justify-between">
                        <div>
                            <p>Category Name: {cat.catName}</p>
                            <p>Category Id: {cat.id}</p>
                            <p className="text-xl font-bold">SubCategories</p>
                            <div>
                                {cat.subCat.map((sc)=>{
                                    return<div className="bg-white p-3 m-3">
                                        <div className="flex justify-between">
                                            <h1>SubCat Name: {sc.subCatName}</h1>
                                            <img src={sc.img.url} className="w-32 h-32 mx-10"></img>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="h-40">
                            <img src={cat.img.url} className="h-52 w-52"></img>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default CategoryScreen