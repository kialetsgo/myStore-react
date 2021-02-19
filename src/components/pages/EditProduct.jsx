import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Redirect } from 'react-router-dom'
import './EditProduct.scss'

class EditProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: '',
            superUser: false
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params
        // console.log(routeParams)
        // console.log(this.props)


        // call getListing with the slug input
        this.autoFillForm(routeParams.slug)
        this.checkSuperUser()
        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                product: this.props.location.state.product
            })
            return
        }
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

    handleChange(e, elemName) {
        this.setState({
            product: { ...this.state.product, [elemName]: e.target.value } //elemName=name
        })
        console.log(this.state.product)
    }

    autoFillForm(slug) {
        console.log(slug)
        return axios.get(`http://localhost:5000/product/${slug}`)
            .then(response => {
                console.log(this.state.product)
                this.setState({
                    product: response.data.product
                })
                console.log(this.state.product)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        // console.log(token)
        let slug = this.props.match.params.slug
        console.log(slug)
        axios.patch(`http://localhost:5000/product/edit/${slug}`, qs.stringify({
            description: this.state.product.description,
            image: this.state.product.image,
            product_name: this.state.product.product_name,
            brand: this.state.product.brand,
            color: this.state.product.color,
            price: this.state.product.price,
        }), config)
            .then(response => {
                console.log(response.data)
                this.props.history.push(`/product/${slug}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            this.state.superUser ? (
                <div id="page-editList">
                    <div className="container">
                        <div className="wrapper">
                            <div className="form-input">
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">
                                        <div className="titleDiv">
                                            <p className="title">Edit Product</p>
                                        </div>
                                        <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="product_name">Name of Product</label>
                                                <input type="text" value={this.state.product.product_name} onChange={e => { this.handleChange(e, 'product_name') }} className="form-control" id="product_name" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="image">Image URL</label>
                                                <input type="text" value={this.state.product.image} onChange={e => { this.handleChange(e, 'image') }} className="form-control" id="image" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="description">Product Description</label>
                                                <textarea className="form-control" value={this.state.product.description} onChange={e => { this.handleChange(e, 'description') }} id="description" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="price">Price</label>
                                                <input type="text" value={this.state.product.price} onChange={e => { this.handleChange(e, 'price') }} className="form-control" id="price" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="brand">Brand</label>
                                                <input type="text" value={this.state.product.brand} onChange={e => { this.handleChange(e, 'brand') }} className="form-control" id="brand" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="brand">Color</label>
                                                <input type="text" value={this.state.product.color} onChange={e => { this.handleChange(e, 'color') }} className="form-control" id="color" />
                                            </div>
                                            <button type="submit" className="btn font-weight-bold" id="submit-btn">Update Product</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <h1>hi</h1>
                )
        )
    }
}

export default withRouter(withCookies(EditProduct))