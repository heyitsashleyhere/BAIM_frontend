import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap'

import './about.scss'
import plant from '../../../assets/images/growing.jpg'
import vegetables from '../../../assets/images/womenwithBasketoffood.jpg'
import gardner from '../../../assets/images/Manwithplants.jpg'
import Logo from '../../../assets/logo/raspberry.png'
import Footer from '../../../components/Public/Footer/Footer'


export default function About(){
    // const [isLoaded, setIsLoaded] = useState(false)
    const imagesRef = useRef([])
    imagesRef.current = []

    useEffect(() => {

        imagesRef.current.forEach(image => {
            image.addEventListener('load', () => {
                
                const tl = gsap.timeline()
                tl.to(image, {
                    duration: 0.8,
                    y: 0,
                    ease: 'power2.inOut',
                    stagger: 0.3,
                    delay: 0.8
                })

            })

        })
    }, [ imagesRef ])
    



    const addToRefs = (e) => {
        imagesRef.current.push(e)
    }









    return(
        <section className="About">

        <section className="about_images">
            <span className="overlay">
                <img ref={addToRefs} className="plant" src={plant}></img>
            </span>
            <span className="overlay">
                <img ref={addToRefs} className="veg" src={vegetables}></img>
            </span>
            <span className="overlay">
                <img ref={addToRefs} className="man" src={gardner}></img>
            </span>
        </section>

        <section className="about_logo">
            <p>about loka ...</p>
            <img className="logo" src={Logo}></img>
        </section>

        <section className="about_text">
            <section className="inner_text">
            <p>loka is an idea or a thought about Globalization.</p><p>Loka is about locality as a reply to our concerns about the negative side effects of globalization in the last decade. </p>

            <p>Our idea comes as an inspiration from Fridays for Future, politically Green with motives to make life in the cities more sustainable wile bringing communities together and to bring individual or local producers closer to the city consumers.</p>

            <p>Loka is an app dedicated as a platform to connect people, either your a curious consumers or a seller. Loka is passionate about gardening, local markets, regional produce and mostly about to share knowledge and resources on topics of lifestyle and DIY. Loka is aimed for anyone , either a gardner, a food lover, a blogger , a professional, event organizers or beauty gurus. </p>

            <p>Loka started as an idea for creating a library of regional produce in the area of Brandenburg, Berlin. Our aim was to give to the consumer a informative platform to know when to plant or eat  what is in season. Our App later evolved to a create a  platform  like a collaborative magazine or a community  library that could offer many topics around planting eating and learning.  In Loka is where the consumer shares and asks for help on is own journey either planting in the balkony, or posting your recipes, or DIY products related to beauty, gardening, arts and crafts, events, etc... </p>
            </section>
        </section>

         <Footer className="footer"/>


        </section>

    )
}