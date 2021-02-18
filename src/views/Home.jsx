import React, {Component} from "react";
import { Container, Row, Carousel, Col } from "react-bootstrap";
import axios from "axios";
export class  Home extends Component {
  constructor(props){
      super(props);
      this.state={
          dataCarausel :[],
          loading : true
      }
  }

  async receivedData(){
    try{
        await axios.get(`https://api.tvmaze.com/shows`,{crossDomain:true})
        .then( async (res) =>{
            const res1 = await res.data;
            const slicejson1=res1.slice(0,4);
            this.setState(
                {
                    dataCarausel: slicejson1,
                    loading:false
                })
               
        })

    }catch(error){
        alert(JSON.stringify(error.message))
    }

  }

  async componentDidMount(){
      this.receivedData();
      
  }

    render(){
        console.log(this.state.dataCarausel);
    return (
        
    <>
   
      <Container>
      {this.state.Loading ? (<div>Loading .......... </div>):(
        <Row>
          <Col>
            <Carousel>
                {this.state.dataCarausel.map((item,i)=>{
                    return (
                        <Carousel.Item key={i} interval={5000}>
                        <img
                          className="d-block w-100"
                          src={item.image.medium}
                          alt={item.name}
                        />
                        <Carousel.Caption>
                          <h3>{item.name}</h3>
                          <p>
                         {item.genres.map((genre,id)=>{
                             return <span key={id}> {genre}</span>
                         })}
                          </p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    )
                    
                })}
             
           </Carousel>
          </Col>
        </Row>)}
      </Container>
    </>
  );
};}

export default Home