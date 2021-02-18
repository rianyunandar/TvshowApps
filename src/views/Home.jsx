import React, { Component } from "react";
import { Col, Container, Row, Carousel,Media } from "react-bootstrap";
import axios from "axios"
export class Home extends Component {
constructor(props){
    super(props);
    this.state={
        dataCarausel:[],
        dataSchedule:[],
        perPage:6,
        currentpage:0,
        offset:0,
        loading:true 
    }
}

async dataHandler(){
 try{
        await axios.get(`https://api.tvmaze.com/shows`,{crossDomain:true})
        .then(async (res)=>{

            let res1=res.data;
            let sliceRes1=res1.slice(0,this.state.perPage)
            this.setState({
                dataCarausel:sliceRes1,
                
            })

        })

      
            await axios.get(`https://api.tvmaze.com/schedule`,{crossDomain:true})
            .then(async (res)=>{
    
                let res1=res.data;
                
                this.setState({
                    dataSchedule:res1,
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
    console.log(this.state.dataSchedule)
    return (
      <>
        <Container>
            {this.state.loading ? (<h1>Loading...</h1>) : (
                <>
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
          </Row>

        <Row>
        <ul className="list-unstyled">
        {this.state.dataSchedule.map((item , i )=>{
        return(
            <Media key={i} as="li">
                <img
                width={64}
                height={64}
                className="mr-3"
                src={item.show.image? item.show.image.medium : "https://picsum.photos/200"}
                alt={item.name}
                />
                <Media.Body>
                <h5>{item.show.type} <i className="far fa-clock"></i>  {item.airdate}  {item.airtime}</h5>
                
                <div dangerouslySetInnerHTML={{__html:item.show.summary}}></div>
                
                </Media.Body>
            </Media>
        
        )})}
            </ul>
        </Row>
          </> 
          
          )}

          
        </Container>
      </>
    )
  }
}
