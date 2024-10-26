import React from "react";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import Pagination from "../../Components/Utility/Pagination";
import baseUrl from "../../Api/baseURL";
import { useEffect } from "react";
const AllCategoryPage = () => {
    const functionn=async()=>{
  const res =await baseUrl.get("/api/v1/categories")
  console.log(res)
    }
    useEffect(()=>{
        functionn()
    },[])
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryContainer />
      <Pagination />
    </div>
  );
};

export default AllCategoryPage;
