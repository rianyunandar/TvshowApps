import React, { Component } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import axios from "axios"
export class Home extends Component {
constructor(props){
    super(props);
    this.state={
        dataCarausel:[],
        loading:true 
    }
}

async dataHandler(){
 try{
        await axios.get(`https://api.tvmaze.com/shows`,{crossDomain:true})
        .then(async (res)=>{

            let res1=res.data;
            let sliceRes1=res1.slice(0,4)
            this.setState({
                dataCarausel:sliceRes1,
                loading:false 
            })

        })
 }
 catch(error){
     alert(JSON.stringify(error.message))
 }
}

async componentDidMount(){
    this.dataHandler();
}


  render() {
    //   console.log(this.state.dataCarausel)
    return (
      <>
        <Container>
            {this.state.loading ? (<h1>Loading...</h1>) : (
          <Row>
            <Col>
              <Carousel>
                  {this.state.dataCarausel.map((item , i )=>{
                      return(
                    <Carousel.Item key={i} interval={5000}>
                            <img
                                className="d-block w-100 CarauselBackground rounded"
                                src={item.image.medium}
                                alt={item.name}
                            />
                              <img
                                className=" CarauselImage rounded"
                                src={item.image.medium}
                                alt={item.name}
                            />
                            <Carousel.Caption>
                                <div className="CarauselTitle"><h3>{item.name}</h3></div>
                                <div className="CarauselBox">
                                <p>
                                    {item.genres.map((genre, id)=>{
                                        return <span key={id}> {genre} </span>
                                    })}
                                </p>
                                </div>
                            </Carousel.Caption>
                    </Carousel.Item>
                      )
                  } )}
                
              </Carousel>
            </Col>
          </Row>)}
        </Container>
      </>
    )
  }
}
