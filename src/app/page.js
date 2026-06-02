import React from 'react'
import Home from "@/components/Home";
import Services from '@/components/Services';
import Work from '@/components/Work';
import ContactButton from '@/components/ContactButton';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About'; 

const page = () => {
  return (
    <div>
      <section className='z-30'>
      <Home/>

      </section>

    
      <section >
        <About/>
      </section>


          
      <section >
        <Services/>
      </section>



    
      <section  className='z-50'>
        <Work/>
      </section>

       
      <section  className='z-50'>
        <Testimonials/>
      </section>
  
     <ContactButton/>
    </div>
  )
}

export default page
