import React from "react";
import Home from "@/components/sections/Home";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import ContactButton from "@/components/ui/ContactButton";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";


const page = () => {
  return (
    <div>
      <section className="z-30">
        <Home />
      </section>

      <section>
        <About />
      </section>

      <section>
        <Services />
      </section>

      <section className="z-50">
        <Work />
      </section>

      <section className="z-50">
        <Testimonials />
      </section>

      <section>
        <Faq />
      </section>

      

      <ContactButton />
    </div>
  );
};

export default page;
