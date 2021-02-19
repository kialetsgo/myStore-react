import axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './Cart.scss'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_cart: [],
            newCart: []
        }
    }

    componentDidMount() {
        this.getUserCart()
    }

    getUserCart() {
        const token = this.props.cookies.get('token')
        console.log(token)
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios.get('http://localhost:5000/cart', config)
            .then(response => {
                this.setState({
                    user_cart: response.data
                })
                console.log(this.state.user_cart)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // filterProductId() {
    //     let cartItems = this.state.user_cart
    //     let newCart = {}
    //     cartItems.forEach(product => {
    //         if (!newCart[`${product.product_id}`]) {
    //             newCart[`${product.product_id}`] = product
    //         }
    //         else {
    //             newCart[`${product.product_id}`].quantity += product.quantity
    //         }
    //         // if new obj doesnt have product_id, then insert
    //     })
    //     console.log(newCart)
    //     let newArr = []
    //     for (const product in newCart) {
    //         newArr.push(newCart[product])
    //     }
    //     console.log(newArr)
    //     this.setState({
    //         newCart: newArr
    //     })
    // }

    render() {
        return (
            <div className="container" >
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <div className="row">
                        {
                            this.state.user_cart.length > 0 ? (
                                this.state.user_cart.map(cart_item => {
                                    return (
                                        <div className="listing col-4">
                                            <div className="card" style={{ "width": "18rem" }}>
                                                <div className="card-header">
                                                    <p className="card-text p-username">{cart_item.User.username}</p>
                                                </div>
                                                <hr />
                                                <div className="card-body">
                                                    <p className="card-text p-item_name">{cart_item.Product.product_name}</p>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text p-price"> Total Price: ${cart_item.Product.price * cart_item.quantity}</p>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text p-quantity"> Quantity: {cart_item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                    <p>No items in cart at this moment</p>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default withCookies(Cart)
