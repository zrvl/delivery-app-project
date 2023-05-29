import styles from './homePage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { axiosInstance } from '../../config.js';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  // const [carts, setCarts] = useState([]);

  const getShops = async () => {
    // const resp = await axios.get(`http://127.0.0.1:5000/api/shops`);
    // const resp = await axiosInstance.get(`/shops`);
    // const resp = await axios.get(`https://delivery-app-zhuravel.herokuapp.com/api/shops`);
    const resp = await axios.get(`api/shops`);
    const data = await resp.data;
    setShops(data);
  }

  const getProducts = async (id) => {
    // const resp = await axios.get(`http://127.0.0.1:5000/api/shops/${id}/products`);
    // const resp = await axiosInstance.get(`/shops/${id}/products`);
    // const resp = await axios.get(`https://delivery-app-zhuravel.herokuapp.com/api/shops/${id}/products`);
    const resp = await axios.get(`api/shops/${id}/products`);
    const data = await resp.data.products;
    setProducts(data);
  }

  const addToCart = async (shopId,productId) => {
    const shop = localStorage.getItem(`shop`)
    if (shop) {
      localStorage.setItem(`shop`, shop+`,${productId}`)
    } else {
      localStorage.setItem(`shop`,productId.toString())
    }
  }

  useEffect(() => {
    getShops();
    getProducts(1);
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles.menu}>
        {
          shops.map((item) => (
            <button className={styles.item} key={item.id} onClick={() => getProducts(item.id)}>{item.name}</button>
          ))
        }
      </div>
      <div className={styles.info}>
        {
          products.map((product) => (
            <div className={styles.product} key={product.id}>
              {console.log(product)}
              <div className={styles.box}>
                <img className={styles.img} src={`${product.image}`} />
              </div>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.price}>${product.price}</div>
              <button onClick={() => addToCart(product.ShopId,product.id)} className={styles.add}>Add to cart</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default HomePage;
