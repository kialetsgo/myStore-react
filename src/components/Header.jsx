/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import { HashLink as HLink } from 'react-router-hash-link';
import axios from 'axios'
import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            superUser: false
        }
    }
    componentDidMount() {
        this.checkSuperUser()
    }
    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
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
            <header id="site-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">
                        <img src="../../img/myStore_logo.png" alt="logo" id="brand-logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link font-weight-bold">myStore</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/all" className="nav-link font-weight-bold">Products</Link>
                            </li>
                            {
                                this.state.superUser ? (
                                    <li className="nav-item">
                                        <Link to="/product/new" className="nav-link font-weight-bold">Create Product</Link>
                                    </li>
                                ) : ""
                            }
                        </ul>
                        {
                            this.isAuthenticated() ? (
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link btn active font-weight-bold" id="login-btn">Logout</Link>
                                </li>
                            ) : (
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link btn active font-weight-bold" id="login-btn">Login</Link>
                                    </li>
                                )
                        }
                    </div>
                </nav>


            </header >

        )
    }
}

export default withCookies(Header)
