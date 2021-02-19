import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

class Footer extends React.Component {

    render() {
        return (

            <footer id="site-footer" className="page-footer font-small pt-5">

                    <div className="container-fluid text-center text-md-left">
                        <div className="row">
                            <div className="col-md-6 mt-md-0 mt-3">

                                <h5 className="text-uppercase font-weight-bold text-center mb-3">About Us</h5>
                                <p className="text-justify">FOOD SHARE MRKTPLC aims to provide a platform for users to share food products with their neighbours. Simply sign up and start sharing your food with others.</p>

                            </div>

                            <hr className="clearfix w-100 d-md-none pb-3" />

                            <div className="col-md-3 mb-md-0 mb-3">
                                <h5 className="text-uppercase font-weight-bold text-center mb-3">Follow Us</h5>
                                    <ul className="text-center">
                                        <Link to="#"><span className="mt-1 mb-3">Facebook</span></Link>
                                        <Link to="#"><span className="mt-1 mb-3">Instagram</span></Link>
                                    </ul>
                            </div>

                            <hr className="clearfix w-100 d-md-none pb-3" />

                            <div className="col-md-3 mb-md-0 mb-3">
                                <h5 className="text-uppercase font-weight-bold text-center mb-3">Links</h5>
                                    <ul className="text-center">
                                        <Link to="/events"><span className="mt-1 mb-3">Events</span></Link>
                                        <Link to="/listings/all"><span className="mt-1 mb-3">Listings</span></Link>
                                    </ul>
                            </div>

                        </div>

                    </div>

                    <div id="brand" className="footer-copyright text-center py-4">© 2020 Copyright: &nbsp;
                        <Link to="/">FOOD SHARE MRKTPLC</Link>
                    </div>

            </footer>


        )
    }
}

export default Footer