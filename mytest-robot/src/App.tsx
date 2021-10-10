import React,{useState, useEffect} from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ShoppingCart from './components/ShoppingCart';

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
interface Props{}

interface State {
  robotGallery: any[];
  count: number;
}

const App:React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<any>();
  // useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => {
  //       response.json()
  //     }).then(data => setRobotGallery(data))
  // })
  
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true)
      try{
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setRobotGallery(data)
      } catch(e) {
        setError(e)
      }
      
      setLoading(false)
    }
    fetchData();

  },[])

  return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt='logo'/>
          <h1>罗伯特机器人炫酷购物平台名字一定要长</h1>
        </div>
        <ShoppingCart />
        <div>
          <button onClick={()=>{setCount(count+1)}}>点击事件</button>
          <span>count:{count}</span>
        </div>
        {!error || error!=='' && <div>网站出错：{error}</div>}
        {!isLoading ?
          <div className={styles.robotList}>
          {robots.map( (r ,i)=> (
          <Robot key={i} id={r.id} name={r.name}  email={r.email}/>)
        )
         }
          </div> : <Spin indicator={antIcon} />
        }
      </div>  
  );
}

export default App;