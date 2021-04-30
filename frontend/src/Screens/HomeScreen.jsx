import React, { useEffect } from "react";
import MessageBox from "../Components/MessageBox";
import LoadingBox from "../Components/LoadingBox";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { loading, error, products } = productList;
  
  useEffect(() =>{  
    dispatch(listProducts());}
    , [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}

// const [products, setProducts] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(false);
//  useEffect(() => {
//    const fetchData = async () => {
//      try {
//        setLoading(true);
//        const { data } = await axios.get("/api/products");
//        setLoading(false);
//        setProducts(data);
//      } catch (err) {
//        setError(err.message);
//        setLoading(false);
//      }
//    };
//    fetchData();
//  }, []);
