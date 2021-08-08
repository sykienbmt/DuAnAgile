import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DataFeaturedCategorri from './../Json/Featured_Categorri.json'
import FeaturedCategorri from './../Json/Featured_Categorri'
import DataFeaturedProducts from './../Json/Featured_Products.json'
import FeaturedProducts from './../Json/Featured_Products'
import LatestProducts from './../Json/Latest_Products'
import DataLatestProducts from './../Json/Latest_Products.json'
import Testimonial from './../Json/Testimonial'
import DataTestimonial from './../Json/Testimonial.json'
import Brand from './../Json/Brand'
import DataBrand from './../Json/Brands.json'

class home extends Component {

    display_Featured_Categorries = () => {
        return (
            <div className="small-container">
                <div className="row">
                    {DataFeaturedCategorri.map((value, key) => {
                        return (
                            <FeaturedCategorri key={key} image={value.image} ></FeaturedCategorri>
                        )
                    })}
                </div>
            </div>)
    }

    display_Featured_Products = () => {
        return (
            <div className="row">
                {
                    DataFeaturedProducts.map((value, key) => {
                        return (
                            <FeaturedProducts key={key} image={value.image} title={value.title} price={value.price} ></FeaturedProducts>
                        )
                    })
                }
            </div>
        )
    }

    display_Latest_Products = () => {
        return (
            <div className="row">
                {
                    DataLatestProducts.map((value, key) => {
                        return (
                            <LatestProducts key={key} image={value.image} title={value.title} price={value.price} ></LatestProducts>
                        )
                    })
                }
            </div>
        )
    }

    display_Testimonial = () => {
        return (
            <div className="small-container">
                <div className="row">
                    {
                        DataTestimonial.map((value, key) => {
                            return (
                                <Testimonial key={key} image={value.image} content={value.content} name={value.name} ></Testimonial>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    displayBrand = () => {
        return (
            <div className="small-container">
                <div className="row">
                    {
                        DataBrand.map((value,key)=>{
                            return (
                                <Brand key={key} image={value.image} ></Brand>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {/* ------------- featured categorries ---------------- */}
                <div className="categories">
                    {this.display_Featured_Categorries()}
                </div>
                {/* ------------- featured products ---------------- */}
                <div className="small-container">
                    <h2 className="title">Featured Products</h2>
                    {this.display_Featured_Products()}
                    <h2 className="title">Latest Products</h2>
                    {this.display_Latest_Products()}
                </div>
                {/* ------------ offer -------------- */}
                <div className="offer">
                    <div className="small-container">
                        <div className="row">
                            <div className="col-2"><img src="images/exclusive.png" alt='' className="offer-img" /> </div>
                            <div className="col-2">
                                <p>Exclusive Availabble on RedStore</p>
                                <h1>Smart Band 4</h1>
                                <small>
                                    The Mi Smart Band 4 features a 39.9% larger (than Mi Band 4) AMOLED color full-touch display
                                    with
                                    adjustable brightness, so everything is clear as can be</small>
                                <NavLink to="/" className="btn">Buy Now →</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------ testimonial -------------- */}
                <div className="testimonial">
                    {this.display_Testimonial()}
                </div>
                {/* ------------------- brands --------------------- */}
                <div className="brands">
                    {this.displayBrand()}
                </div>
            </div>

        );
    }
}

export default home;
