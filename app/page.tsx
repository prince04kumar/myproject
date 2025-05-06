import Image from "next/image";
import Landing from "./components/Landing";
import ChoseUs from "./components/ChoseUs";
import Project from './components/Projects';
import Customers from './components/Customers';
import Team from './components/Team'
import Tech from  './components/Tech'
import ContactUs from './components/ContactUs'
import Testimage from "./components/Testimage";

export default function Home() {
  return (
   <>
  <Landing/>
  <ChoseUs/>
  <Project/>
  <Customers/>
  <Team/>
  <Tech/>
  <ContactUs/>

   </>
    
  );
}
