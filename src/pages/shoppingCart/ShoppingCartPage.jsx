import styles from './shoppingCart.module.css'
import PersonInput from '../../components/PersonInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { axiosInstance } from '../../config.js';

const ShoppingCartPage = () => {
  const [products, setProducts] = useState([]);
  let [totalSum, setTotalSum] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState('');
  const [products_ids, setProducts_ids] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [emptyProducts, setEmptyProducts] = useState(false);

  const getProductCarts = async () => {
    setEmptyProducts(false);
    const productsId = localStorage.getItem('shop');
    if (productsId) {
      // const resp = await axios.get(`http://127.0.0.1:5000/api/products/filtered?ids=${productsId}`);
      // const resp = await axiosInstance.get(`/products/filtered?ids=${productsId}`);
      // const resp = await axios.get(`https://delivery-app-zhuravel.herokuapp.com/api/products/filtered?ids=${productsId}`);
      const resp = await axios.get(`api/products/filtered?ids=${productsId}`);
      const data = await resp.data;
      setProducts(data.products);
    } else {
      setEmptyProducts(true);
    }
  }

  const submitOrder = async () => {
    if (name == '' || email == '' || phone == '' || address == '') {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 2000);
    } else {
      // const resp = await axios.post(`http://127.0.0.1:5000/api/orders`,{name: name, email: email, phone: phone, address: address, products_ids});
      // const resp = await axiosInstance.post(`/orders`,{name: name, email: email, phone: phone, address: address, products_ids});
      // const resp = await axios.post(`https://delivery-app-zhuravel.herokuapp.com/api/orders`,{name: name, email: email, phone: phone, address: address, products_ids});
      const resp = await axios.post(`api/orders`,{name: name, email: email, phone: phone, address: address, products_ids});
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      localStorage.clear();
    }
  } 

  const changeCount = (value, idx) => {
    const tmp = [...products_ids]
    tmp[idx].count=Number(value)
    setProducts_ids(tmp);
    const result = products.map(el => el.price * tmp.forEach(el => el.count))
    console.log(result)
  }

  useEffect(() => {
    getProductCarts();
    const products_ids_init = [];
    const productsId = localStorage.getItem('shop');
    setEmptyProducts(false);
    if (productsId) {
      for (const idx of productsId.split(',')) {
        products_ids_init.push({idx:idx,count:1})
      }
      setProducts_ids(products_ids_init)
    } else {
      setEmptyProducts(true);
    }
  }, [products])
  
  return (
    <div className={styles.carts}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <PersonInput onChange={(e) => setName(e.target.value)} className={styles.input} type="text" placeholder="Name..."/>
          <PersonInput onChange={(e) => setEmail(e.target.value)} className={styles.input} type="text" placeholder="Email..."/>
          <PersonInput onChange={(e) => setPhone(e.target.value)} className={styles.input} type="number" placeholder="Phone..."/>
          <PersonInput onChange={(e) => setAddress(e.target.value)} className={styles.input} type="text" placeholder="Address..."/>
        </div>
        { !emptyProducts ? 
        <div className={styles.products}>
          {products.map((product,idx) => (
            <div className={styles.product} key={product.id}>
            <div className={styles.box}>
              <img className={styles.img} src={`${product.image}`} />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
            <input onChange={(e) => changeCount(e.target.value, idx)} className={styles.count} type="number" defaultValue={products_ids[idx].count}/>
          </div>
          ))}
        </div>
        :
        <div>Add some products</div>
        }
      </div>
      <div className={styles.total}>
        <div className={styles.price}>
          {
            totalSum
          }
        </div>
        {
          empty ?
          <div>Enter all inputs</div>
          :
          <button onClick={() => submitOrder()} className={styles.submit} type="submit">Submit</button>
        }
      </div>
    </div>
  );
};
export default ShoppingCartPage;
