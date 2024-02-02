import React from 'react'
import { Carousel } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Accounts.css';

function Advertisements() {
    return (
        <div className='advertisement-carousel'>
            <Carousel
                autoPlay={true}
                interval={3000}
                pause={false}
                wrap={true}
                indicators={true}
            >
                <Carousel.Item>
                    <img
                        className="advertisement-image mx-auto d-block img-fluid"
                        src={process.env.PUBLIC_URL + '/advertisement1.png'}
                        alt="Image 1"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="advertisement-image mx-auto d-block img-fluid"
                        src={process.env.PUBLIC_URL + '/advertisement3.png'}
                        alt="Image 3"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="advertisement-image mx-auto d-block img-fluid"
                        src={process.env.PUBLIC_URL + '/advertisement4.png'}
                        alt="Image 4"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Advertisements