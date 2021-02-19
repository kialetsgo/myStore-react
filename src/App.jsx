import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Cart from './components/pages/Cart'
import Product from './components/pages/Product'
import AllProducts from './components/pages/AllProducts'
import CreateProduct from './components/pages/CreateProduct'
import EditProduct from './components/pages/EditProduct'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Header />
                    <Switch>
                        <GuestRoute path="/login" component={Login} />
                        <GuestRoute path="/register" component={Register} />
                        <ProtectedRoute path="/cart" component={Cart} />
                        <ProtectedRoute path="/product/new" component={CreateProduct} />
                        <Route path="/product/edit/:slug" component={EditProduct} />
                        <Route path="/products/all" component={AllProducts} />
                        <Route path="/product/:slug" component={Product} />

                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

export default App;

