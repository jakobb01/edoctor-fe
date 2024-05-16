"use client"
import React, {useEffect} from "react";

function Search({params}) {

    useEffect(()=> {
        console.log(params.categoryName)

    })
    return (
        <div>Search</div>
    )
}

export default Search