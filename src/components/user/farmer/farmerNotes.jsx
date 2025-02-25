import { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from '@mui/material';

export default function FarmNotes(){
    return(
        <>
    <Container id="carousel">
    
    <Carousel 
    infiniteLoop={true}
    // autoPlay={true} 
    stopOnHover={true}
    showThumbs={false}
    emulateTouch={true}
    useKeyboardArrows={true}
    showArrows={false}
    showIndicators={true}
    className='carousel-main'>
    <div className='carousel-style'>

        <div style={{userSelect:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
        <h3>TIPS</h3>
        <em>Climate</em> 
        <ul>
        <li>Coffee plants prefer warm, humid climates with temperatures between 15°C and 28°C</li>
        <li>They can't tolerate frost, snowfall, or high temperatures above 30°C</li>
        <li>They also need shade from strong sunlight</li>
        </ul>
        <em>Soil</em> 
        <ul>
        <li>Coffee plants grow best in well-drained, rich, loamy soils</li>
        <li>The soil should contain humus, iron, and calcium</li>
        <li>Liming can help keep the pH at optimal levels</li>
        
        </ul>
        <em>Water</em> 
        <ul>
        <li>Coffee plants prefer consistently moist soil, but it shouldn't be soggy</li>
        <li>Water when the top inch of soil feels dry to the touch</li>
        <li>Allow excess water to drain out of the pot to prevent root rot</li>
        </ul>
        <em>Pests</em> 
        <ul>
        <li>Protect plants from pests like mites or aphids</li>
        <li>Coffee grounds can repel insects like beetles, flies, and mosquitoes</li>
        </ul>
        <em>Harvesting </em> 
        <ul>
        <li>Coffee cherries are ready to be harvested when they turn a deep red/purplish color</li>
        <li>In most countries, the crop is picked by hand</li>
        </ul>
        <em>Other tips</em> 
        <ul>
        <li>Choose the best Arabica variety to grow for quality beans</li>
        <li>Prune in spring</li>
        </ul>
        </div>
    </div>
    <div className='carousel-style'>
      
    <div style={{userSelect:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
        <h3>BEST PRACTICES</h3>
        <ul style={{lineHeight:'50px'}}>
        <li><strong><em>Harvesting:</em></strong> Harvest coffee beans at the right time and completely, avoiding gleanings. </li>
        <li><strong><em>Pruning:</em></strong> Prune coffee plants to improve ventilation and illumination, and to maintain plant health and productivity. </li>
       <li><strong><em>Soil and water conservation:</em></strong> Prevent soil erosion by contour planting or terracing on slopes, and plant soil-binding grasses. </li>
        <li><strong><em>Fertilizing:</em></strong> Use fertilizers when it will result in a profit, and only if the plantation is well-maintained. </li>
        <li><strong><em>Seed selection:</em></strong> Choose high-quality seeds that are heavy, broad, and boat-shaped. </li>
       <li><strong><em>Weed management:</em></strong> Use disease-resistant varieties, mulching, hand weeding, or mechanical cultivation to manage weeds. </li>
       <li><strong><em>Sustainable farm management:</em></strong> Implement practices that protect the environment and reduce climate change. </li>
        <li><strong><em>Intercropping:</em></strong> Intercrop coffee plants with grasses and legumes to improve soil and provide conditions for natural enemies of pests. </li>
       <li><strong><em>Pesticide application:</em></strong> Use pesticides as needed, based on pest incidence. </li>

        </ul>
        </div>
    </div>
    <div className='carousel-style'>
      
    <div style={{userSelect:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
        <h3>MARKET TRENDS</h3>
        <ul style={{lineHeight:'30px'}}>
            <strong><em> Production and consumption</em> </strong>
           <li>In 2024/25, the world is expected to produce 174.9 million bags of coffee, which is 6.9 million more than the previous year.</li>
           <li>The world is expected to consume 168.1 million bags of coffee, which is 5.1 million more than the previous year.</li>
           <li>The European Union, the United States, and China are expected to see the largest gains in consumption.</li>
        </ul>
        <ul style={{lineHeight:'30px'}}>
            <strong><em> Market drivers</em> </strong>
           <li>The growing number of cafes globally </li>
          <li> Consumers' preference for sustainable and ethically produced beans</li>
          <li> The rising trend of coffee shop culture</li>
          <li> The growing coffee consumption among millennials</li>
          <li> The increasing trend of coffee consumption among youth globally</li>
            </ul>
        <ul style={{lineHeight:'30px'}}><strong><em>Market challenges</em> </strong>
          <li> Price fluctuations in raw coffee beans</li>
          <li> Drought and high temperatures during the fruit development and filling period</li>
          <li> High maintenance costs and lack of resources</li>
            </ul>
        <ul style={{lineHeight:'30px'}}><strong><em>Market opportunities</em> </strong>
          <li> The potential of coffee in plant-based dietary supplements, energy drinks, and other applications</li>
          <li> The cosmetics sector</li>
            </ul>
        </div>
    </div>
    
</Carousel>
</Container>  
        </>
    )
}