
import React from 'react'
import ProductCard from './SharedComponents/ProductCard'
import { get,ref } from '@firebase/database'
import { useEffect,useState } from 'react'
import { database } from './firebase'
import { Row, Col, Spin } from 'antd';

export default function Home() {
    const [products,setProducts]=useState([]);
    const[loading,setLoading]=useState(null);

    const fetchProducts = () => {
        setLoading(true);
        const productsRef = ref(database, 'products');
        get(productsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const productsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }));
                setProducts(productsArray);
                setLoading(false);
            } else {
                console.log('No data available');
            }
        });
    };
    
useEffect(()=>{
fetchProducts();
},[])
 
    return (

<div style={{ margin: '20px', padding: '20px' }}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        {loading ? (
            <Spin size="large" />
        ) : (
            <Row gutter={4}>
                {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={12} lg={6}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        )}
    </div>
</div>        
    )
}
