import React from 'react';
import { Card } from "semantic-ui-react";
//profile images
import defaultImage from "../../assets/images/default.png"
import danny from "../../assets/images/danny.JPG";
import matt from "../../assets/images/matt.JPG"
import el from "../../assets/images/el.jpg";
import han from "../../assets/images/han.jpg";
import lucas from "../../assets/images/lucas.jpg";
import oliver from "../../assets/images/oliver.jpg";
import virg from "../../assets/images/virg.jpeg";
import darien from "../../assets/images/darien.jpg";
import nik from "../../assets/images/nik.jpg"



const About = () => {
    var team = teamData();
    // /* util function for bothering people */
    // var status = (function iNeedABioAndPictureGuys(){
    //     var people = "";
    //     for (let i = 0, count = 1; i < team.length; ++i){       
    //         if (team[i].bio  == 0){
    //             people += `${count} ${team[i].name} `;
    //             count++;
    //         }
    //     }
    //     return ` I still need a picture and or bio from the following people ${people}`
    // })()
    // console.log(status);
    return ( 
        <div >
            <h1> Meet our Team</h1>
        
        <div style={{display:"flex", flexFlow: "wrap"}}>
        
        {team.map(function renderTeam(member){
            return (
                <Card key={member.name} image={member.img || defaultImage} 
                description={<><h3>{member.role}</h3><h5>{member.bio || "LambdaSchool Student"}</h5><br/></>}
                header={member.name} style={{margin:"10px"}}>
                </Card>
            )
        })}
        </div>
        </div>
     );
}
 
export default About;


function teamData(){
    return [
        {img:danny, role: "Front end", name: "Daniel Vidal", bio:"Full Stack web developer. Has an extreme passion for programming and computer science and his main goal is to one day create something that will play an important role for the future of computer science" },
        {img:lucas, role:"Front end", name: "Lucas Bazemore", bio:"Full Stack Web Developer. Creator of useful stuff. Enjoys playing basketball, running, reading good books. Connoisseur of awesome."},
        {img:el, role:"Front end", name: "Eleasah Halsmer", bio:"Developer studying Full Stack Web at Lambda School. Other interests include mathematics, Beethoven's piano sonatas, and going outdoors."},
        {img:matt, role:"Front end", name: "Matt Herich", bio:"Full Stack Developer. When Matt is not busy coding he enjoys swimming, running, bicycling and esk8ing. His dream is to one day work at his leisure from a hammock in the tropics."},
        {img:virg,role: "UI", name: "Virgilio Rodriguez", bio:"Full Stack Web Developer Student at Lambda School.  Enjoys photography and flying drones commercially.  Future goal is to become a web developer and start this second career after 20 years of public safety experience in law enforcement and emergency medical."},        
        {img:null,role: "UI", name: "Lowell Jacobs", bio:"User Interface: I am a student at Lambda school. I enjoy web design, programming, and video games."},        
        {img:han, role: "Data Engineering/Backend", name: "Han Lee", bio:"Deep Learning Engineer. Reformed professional investment manager. Organic home farmer. EX World of Warcraft top 10 classic guild co-GM."},
        {img:oliver, role: "Data Engineering/Backend", name: "Oliver Ash", bio:"Data Science Student at Lambda School. Former philosophy student and combat medic. Enjoys classic novels and critical rationalist philosophy."},
        {img:null,role:"Machine Learning", name: "Darek Tidwell", bio:""},
        {img:nik,role:"Machine Learning", name: "Nicolae Dubenco", bio:"Data Scientist & ML Engineer. SME entrepreneur. Student. Generalist with interests in Startups, Management & Marketing, Data and Human Behaviour. Books and online courses are my everyday 'food'."},
        {img:darien, role:"Project Lead", name:"Darien Payton", bio:"Team Lead at Lambda School. Former marketing consultant. Enjoys playing piano, writing and playing basketball."},
    ].sort(function sortByRole(a, b){
        if(a.role < b.role) return -1; 
        if(a.role > b.role) return 1; 
        return 0;
    })
}