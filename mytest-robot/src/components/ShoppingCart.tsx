import React, {useState} from 'react';
import styles from './ShoppingCart.module.css';
// import {FiShoppingCart} from 'react-icons/fi';
import {appContext} from '../AppState'

interface Props {

}

interface State{
    isOpen: boolean
}

const ShoppingCart = () => {
    const [state, setState] = useState({isOpen: false});
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if((e.target as HTMLElement).nodeName === 'SPAN'){
            setState({isOpen: !state.isOpen});
        }  
    }
    return (
        <appContext.Consumer>
            {(value) => {
                console.log('value.shoppingCart.items',value.shoppingCart.items)
                return(
                    <div className={styles.cartContainer}>
                <button className={styles.button} onClick={handleClick}
                >
                    {/* <FiShoppingCart /> */}
                    <span>购物车{value.shoppingCart.items.length}件</span>
                </button>
                <div className={styles.cartDropDown} style={{
                    display: state.isOpen ? "block" : "none"
                }}>
                    <ul >
                        {value.shoppingCart.items.map((i,index) => ( <li key={index}>{i.name}</li>)
                        )
                        }
                    </ul>
                    </div>
        </div>
                )
            }}
        </appContext.Consumer>
    )
}
export default ShoppingCart;