import axios from 'axios'
import React from 'react'
import jwt from 'jwt-decode'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './Product.scss'
import qs from 'qs'

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: '',
            quantity: 1,
            size: 'US 9',
            superUser: false
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params
        // console.log(routeParams)
        // console.log(this.props)
        console.log('hi')
        this.getProduct(routeParams.slug)
        this.confirmUser()
        this.checkSuperUser()
        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                product: this.props.location.state.product
            })
            return
        }
    }

    getProduct(slug) {
        return axios.get(`http://localhost:5000/product/${slug}`)
            .then(response => {
                console.log(response)
                this.setState({
                    product: response.data.product // why cant i use response.data
                })
                // console.log(this.state.product) // then console.log this.state.product.products instead
            })
            .catch(err => {
                console.log(err)
            })
    }
    checkSuperUser() {
        const token = this.props.cookies.get('token')
        // console.log(token)
        const config = {
            headers: {
                auth_token: token
            }
        }
        axios.get('http://localhost:5000/superuser', config)
            .then(response => {
                // console.log(response.data)
                console.log(response)
                console.log(this.state.superUser)
                console.log('super user results', response.data.user.is_superuser)
                console.log("super user", this.state.superUser)
                if (response.data.user.is_superuser) {

                    this.setState({
                        superUser: true
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    confirmUser() {
        // get token
        const token = this.props.cookies.get("token");
        // let userId = decodedToken.user
        try {
            const decodedToken = jwt(token);
            // console.log(decodedToken)
            if (decodedToken) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    addToCart(id) {
        const token = this.props.cookies.get("token");
        const config = {
            headers: {
                auth_token: token
            }
        }
        const decodedToken = jwt(token);
        return axios.post(`http://localhost:5000/product/${id}`, qs.stringify({
            product_id: this.state.product.id,
            user_id: decodedToken.userid,
            quantity: this.state.quantity,
            size: this.state.size
        }), config)
            .then(response => {
                console.log(response)
                this.setState({
                    quantity: 1
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e, elemName) {
        this.setState({ [elemName]: e.target.value })
        // console.log(this.state)
    }

    handleDelete(e) {
        e.preventDefault()
        console.log('click')
        const slug = this.props.match.params.slug
        console.log(slug)
        const token = this.props.cookies.get("token");
        const config = {
            headers: {
                auth_token: token,
            },
        };
        axios.delete(`http://localhost:5000/product/${slug}`, config)
            .then(response => {
                // console.log(response.data)
                this.props.history.push('/products/all')
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div id="page-product">
                <div className="container">
                    {
                        this.state.product ? (
                            <div className="product row">
                                <div className="col-5">
                                    <figure>
                                        <img src={this.state.product.image} className="img-fluid" alt="" />
                                    </figure>
                                </div>
                                <div className="col-7">
                                    <div className="page-heading">
                                        <h1>{this.state.product.product_name}</h1>
                                        <h1>asdasda</h1>
                                        <p className="price">${this.state.product.price}</p>
                                    </div>
                                    {
                                        this.confirmUser() ? (
                                            <div className="options-to-buy">
                                                <div className="form-group">
                                                    <label className="quantity" htmlFor="quantity">Quantity</label>
                                                    <select className="form-control" value={this.state.quantity} onChange={e => { this.handleChange(e, 'quantity') }} id="quantity">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="size" htmlFor="size">Quantity</label>
                                                    <select className="form-control" value={this.state.size} onChange={e => { this.handleChange(e, 'size') }} id="size">
                                                        <option>US 7</option>
                                                        <option>US 8</option>
                                                        <option>US 9</option>
                                                        <option>US 10</option>
                                                        <option>US 11</option>
                                                    </select>
                                                </div>
                                                <div className="add-to-cart-button">
                                                    <button onClick={e => { this.addToCart(this.state.product.id) }} type="button" id="add-to-cart-button" className="btn">Add to cart</button>
                                                    <Link to={{
                                                        // link to cart
                                                        pathname: `/cart`,
                                                    }}>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                            : <div>
                                                <h4>Please log in to purchase item</h4>
                                            </div>
                                    }
                                    {
                                        this.state.superUser ? (
                                            <div className="buttons">
                                                <div className="edit-button">
                                                    <button type="button" id="edit-button" className="btn">Edit Product</button>
                                                    <Link to={{
                                                        // link to edit path
                                                        pathname: `/product/edit/${this.state.product.slug}`,
                                                        state: {
                                                            product: this.state.product.slug
                                                        }
                                                    }}>
                                                    </Link>
                                                </div>
                                                <div className="delete-button">
                                                    <button onClick={e => { this.handleDelete(e) }} type="button" id="delete-button" className="btn">Delete Product</button>
                                                </div>
                                            </div>
                                        ) : ""
                                    }
                                    <article>
                                        <p><h2>Product Details</h2></p>
                                        <hr />
                                        <p>{this.state.product.description}</p>
                                    </article>
                                </div>
                            </div>
                        ) : 'Product does not exist'
                    }
                </div>
            </div>
        )
    }

}

export default withCookies(Product)
