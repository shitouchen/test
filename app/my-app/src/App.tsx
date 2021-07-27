import React, {useState, useEffect} from 'react';
import logo from './assets/images/logo.svg';
import robots from "./mockdata/robots.json";
import Robot from './components/Robot';
import styles from './App.module.css';
import ShoppingCart from './components/ShoppingCart';
import { ProgressPlugin } from 'webpack';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RobotDiscount from './components/RobotDiscount';

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

interface Props{}

interface State {
  robotGallery: any[];
  count: number;
}

const App:React.FC = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState();
  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

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
        setError(e.message)
      }
      
      setLoading(false)
    }
    fetchData();

  },[])

  return (
    <div>
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo"/>
        <h1>罗伯特机器人购物平台的名字要长</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
          Click
      </button>
      <span>count: {count}</span>
      <ShoppingCart />
      {!error || error!=='' && <div>网站出错：{error}</div>}
      { !isLoading ?
        <div className={styles.robotList}>
        {robotGallery.map((r, index:number) => 
        ( index % 2 !==0 ?
        <Robot key={index} id={r.id} name={r.name} email={r.email} />
        :<RobotDiscount key={index} id={r.id} name={r.name} email={r.email} />
        )
        )
        }
        </div>
        : <Spin indicator={antIcon} />
      }
    </div>
    </div>
  )
}
export default App;
