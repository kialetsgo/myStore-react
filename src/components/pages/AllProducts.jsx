/* eslint-disable array-callback-return */
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import './AllProducts.scss'

class AllProducts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            brand: '',
            filteredProducts: []
        }
    }

    componentDidMount() {
        this.getAllProducts()
    }

    getAllProducts() {
        return axios.get('http://localhost:5000/products/all')
            .then(response => {
                this.setState({
                    products: response.data.products,
                    filteredProducts: response.data.products
                })
                console.log(this.state.products)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e, elemName) {
        if (e.target.value === '') {
            this.setState({
                filteredProducts: this.state.products,
                [elemName]: e.target.value,
            })
            return
        }
        // console.log(this.state.listings[0])
        const results = this.state.products.filter(item => {
            if (item.brand === e.target.value) {
                return true
            }
            console.log(this.state)
        })
        this.setState({
            [elemName]: e.target.value,
            filteredProducts: results
        })
    }
    render() {
        return (
            <div id="page-products" className="page-1-col">
                < div className="container" >
                    <div className="page-heading text-center mt-5">
                        <h1>All Products</h1>
                        <hr />
                    </div>
                    <div className="row page-body mb-10">
                        <div className="col-3">
                            <div className="input-group filter-header">
                                <h3>Brands</h3>
                                <select className="form-control text-center" value={this.state.brand} onChange={e => { this.handleChange(e, 'brand') }} id="filter-category">
                                    <option value="">-Please Select-</option>
                                    <option>Adidas</option>
                                    <option>Nike</option>
                                    <option>Common Projects</option>
                                    <option>Vans</option>
                                    {/* {
                                // this.state.products.length > 0 ? (
                                this.state.products.map(product => {
                                    return <option value={product.brand}>{product.brand}</option>
                                })
                                // ) : " No Products"
                            } */}
                                </select>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                {
                                    this.state.filteredProducts.length > 0 ? (
                                        this.state.filteredProducts.map(product => {
                                            return (
                                                <div className="product border-0 col-4">
                                                    <div className="card border-0" style={{ "width": "18rem" }}>
                                                        <div className="card-img">
                                                            <img src={product.image} className="card-img-top" alt="" />
                                                        </div>
                                                        <div className="card-body card-product-name">
                                                            <p className="card-text p-product_name">{product.product_name}</p>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text p-color">{product.color}</p>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text p-price">S${product.price}</p>
                                                        </div>
                                                        <Link to={{
                                                            // link to new path
                                                            pathname: `/product/${product.slug}`,
                                                            state: {
                                                                product: product
                                                            }
                                                        }}>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                            <p>No products at this moment</p>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default AllProducts
