import React from 'react'
import ContainerHome from '../Components/containerHome'
import Footer from '../Components/footer'

import './css/home.css';

function Home() {
  return (
    <div>
      <div className='homeDiv'>
<div className='homePictures'>

</div>
<div className='pictureDescriptionHome'> 

</div>
      </div>

      
      <div className='lastAddHome'>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
     <p className='lastAddPHome'>Son Eklenenler</p>

<div className='lastAddHome1'>
<ContainerHome />
<ContainerHome />
<ContainerHome />
</div>

<div className='lastAddHome2'>
<ContainerHome />
<ContainerHome />
<ContainerHome />

</div>



</div>


<div>
  <Footer/>
</div>
    </div>
  )
}

export default Home
