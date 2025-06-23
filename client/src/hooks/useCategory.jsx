import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    // get Category
    const getCategories = async()=>{
        try {
            const { data } = await axios.get(`${API_URL}/api/category/get-category`);
            setCategories(data?.categories); 
        } catch (error) {
            console.error(error);
        }
    }
    
    // Fetch categories on mount
    useEffect(()=>{
        getCategories();
    }, []);
    
    return { categories }; 
}