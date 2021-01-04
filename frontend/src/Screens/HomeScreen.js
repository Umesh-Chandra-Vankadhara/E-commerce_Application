import React, { useEffect, useState } from 'react';
import Product from '../Components/Product';
import axios from 'axios';
import MessageBox from '../Components/MessageBox';
import LoadingBox from '../Components/LoadingBox';

export default function HomeScreen() {
    // React hook to use or manage state of reactcomponent
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const fetchData=async ()=>{
          try{
            setLoading(true);
            const {data}=await axios.get('/api/products');
            setLoading(false);
            setProducts(data);
          }
          catch(err){
            setError(err.message);
            setLoading(false);
          }
        };
        fetchData();
    },[]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
                ) : error ? (
                <MessageBox varient="danger">{error}</MessageBox>
                ) : (
                <div className="row center">
                    {
                        products.map((product)=>(

                        <Product  key={product._id} product={product}></Product>
                        ))
                    }
                </div>
                )
            }
        </div>
    );
}
