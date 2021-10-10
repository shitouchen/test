import React,{useContext} from 'react';
import styles from './Robot.module.css';
import {appContext, appSetStateContext} from '../AppState';
interface RobotProps
 {
     id: number,
     name: string,
     email: string
 }
// FC = function component 函数式组件 范型参数 P = props
// const Robot : React.FC<RobotProps> = (props) => {
//     const id = props.id;
//     return <></>
// };

//ES6写法
const Robot : React.FC<RobotProps> = ({id, name, email}) => {
    const value = useContext(appContext);
    const setState = useContext(appSetStateContext)
    const addToCart = () => {
        if(setState){
            setState(state => {
                return {
                    ...state,
                    shoppingCart: {
                        items: [...state.shoppingCart.items, {id, name}]
                    }
                }
            })
        }
    }
    return (
        <div className={styles.cardContainer}>
            <img alt='robot' src={`https://robohash.org/${id}`}/>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={addToCart}>加入购物车</button>
        </div>  
    )
}

export default Robot;