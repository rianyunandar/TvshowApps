import React, { Component } from "react";
import { Col, Container, Row, Carousel,Media } from "react-bootstrap";
import axios from "axios"
import ReactPaginate from "react-paginate"
export class Home extends Component {
constructor(props){
    super(props);
    this.state={
        dataCarausel:[],
        dataSchedule:[],
        perPage:6,
        currentPage:0,
        offset:0,
        loading:true 
    }
}

async dataHandler(){
 try{
        await axios.get(`https://api.tvmaze.com/shows`,{crossDomain:true})
        .then(async (res)=>{

            let sorted= res.data.sort(function (a,b){
                return a.rating.average < b.rating.average 
                ? 1
                : b.rating.average < a.rating.average 
                ? -1 
                :0;
            })
            let sliceRes1=sorted.slice(0,this.state.perPage)
            this.setState({
                dataCarausel:sliceRes1,
                
            })

        })

      
            await axios.get(`https://api.tvmaze.com/schedule`,{crossDomain:true})
            .then(async (res)=>{
    
                let res1=res.data;
                let sliceJson = res1.slice(this.state.offset, this.state.offset + this.state.perPage)
                
                this.setState({
                    dataSchedule:sliceJson,
                    loading:false 
                })
    
            })




 }
 catch(error){
     alert(JSON.stringify(error.message))
 }
}
async dataHandler2(){
    try{
                   
               await axios.get(`https://api.tvmaze.com/schedule`,{crossDomain:true})
               .then(async (res)=>{
       
                   let res1=res.data;
                   let sliceJson = res1.slice(this.state.offset, this.state.offset + this.state.perPage)
                   
                   this.setState({
                       dataSchedule:sliceJson,
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
    this.dataHandler2();
}

handlePageClick = (e) => {
    let selected = e.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({
        currentPage: selected,
        offset:offset
     },()=>{
        this.dataHandler2();
     }
     
     )
  };

  render() {
    console.log(this.state.dataCarausel)
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
                            <div className="CarauselHeader">
                                <h5>Best TV Show</h5>
                            </div>

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
        <h3 className="scheduleHeader">TV Show Today</h3>
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
                <h5>{item.show.type} <i className="far fa-clock"></i>  {item.airdate}  {item.airtime}  On {item.show.network? item.show.network.name : "TV"} Channel</h5>
                
                <div dangerouslySetInnerHTML={{__html:item.show.summary}}></div>
                
                </Media.Body>
            </Media>
        
        )})}
            </ul>
        </Row>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        

          </> 
          
          )}

          
        </Container>
      </>
    )
  }
}
export default Home;