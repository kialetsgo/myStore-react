import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Redirect, Link } from 'react-router-dom'
import './CreateProduct.scss'

class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            image: '',
            product_name: '',
            brand: '',
            color: '',
            price: '',
            superUser: false
        }
    }
    componentDidMount() {
        this.checkSuperUser()
    }

    handleChange(e, elemName) {
        this.setState({ [elemName]: e.target.value })
        console.log(this.state)
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        console.log(token)
        axios.post('http://localhost:5000/product/new', qs.stringify({
            description: this.state.description,
            image: this.state.image,
            product_name: this.state.product_name,
            brand: this.state.brand,
            color: this.state.color,
            price: this.state.price,
        }), config)
            .then(response => {
                console.log(response.data)
                this.setState({
                    description: '',
                    image: '',
                    product_name: '',
                    brand: '',
                    color: '',
                    price: '',
                    redirect: true,
                })
                this.props.history.push('/products/all')
            })
            .catch(err => {
                console.log(err)
            })
    }

    checkSuperUser() {
        const token = this.props.cookies.get('token')
        console.log(token)
        const config = {
            headers: {
                auth_token: token
            }
        }
        axios.get('http://localhost:5000/superuser', config)
            .then(response => {
                // console.log(response.data)
                console.log(response.data.user.is_superuser)
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

    render() {
        return (
            this.state.superUser ? (
                < div id="page-createList" >
                    <div className="container">
                        <div className="wrapper">
                            <div className="form-input">
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">
                                        <div className="titleDiv">
                                            <p className="title">Create Product</p>
                                        </div>
                                        <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="product_name">Name of Product</label>
                                                <input type="text" value={this.state.product_name} onChange={e => { this.handleChange(e, 'product_name') }} className="form-control" id="product_name" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="image">Image URL</label>
                                                <input type="text" value={this.state.image} onChange={e => { this.handleChange(e, 'image') }} className="form-control" id="image" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="description">Product Description</label>
                                                <textarea className="form-control" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} id="description" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="price">Price</label>
                                                <input type="text" value={this.state.price} onChange={e => { this.handleChange(e, 'price') }} className="form-control" id="price" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="brand">Brand</label>
                                                <input type="text" value={this.state.brand} onChange={e => { this.handleChange(e, 'brand') }} className="form-control" id="brand" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="brand">Color</label>
                                                <input type="text" value={this.state.color} onChange={e => { this.handleChange(e, 'color') }} className="form-control" id="color" />
                                            </div>
                                            <button type="submit" className="btn font-weight-bold" id="submit-btn">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >) : (
                    < div >
                        <h3>Not Super User, click to log in</h3>
                        <Link to={{
                            // link to new path
                            pathname: `/login/`,
                        }}></Link>
                    </div >

                )
        )
    }
}

export default withRouter(withCookies(CreateProduct))