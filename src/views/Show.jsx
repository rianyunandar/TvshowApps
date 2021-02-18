import React, { useState, useEffect } from "react";
import { Col, Container, Row,Button } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import TVCard from "./../components/TVShow/TVCard";

const Show = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(12);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  const getData = async () => {
      try{
    const { data } = await axios.get(`https://api.tvmaze.com/shows`, {
      crossDomain: true
    });
    const slice = data.slice(offset, offset + perPage)
    setData(slice);
    setPageCount(Math.ceil(data.length / perPage))
    setLoading(false);
    } catch(error){
        alert(JSON.stringify(error.message))
    }
  };

  const searchData = async () => {
    try{
    await axios.get(`https://api.tvmaze.com/shows`, {
      crossDomain: true
    }).then( (res) => {
    let filteredRes = res.data.filter(
        (o)=>o.name.toString().toLowerCase().includes(search.toLowerCase()) ||
             o.status.toString().toLowerCase().includes(search.toLowerCase())  ||
             o.language.toString().toLowerCase().includes(search.toLowerCase()) 
             
    )
    const slice = [...filteredRes].slice(offset, offset + perPage)
    setData(slice);
    setPageCount(Math.ceil(data.length / perPage))
    setLoading(false);
    })
        } catch(error){
    alert(JSON.stringify(error.message))
}
  };

  const submitSearch= async (e) =>{
    e.preventDefault();
    searchData();
  }

  const liveSearch= async (e) =>{
    setSearch(e.target.value)
    searchData();
  }


  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <>
      {console.log(data)}
      <Container>
          <h1>All TV Shows</h1>
          <Row><Col>
          <form onSubmit={submitSearch}>
              <input 
              
              type="text"
              value={search}
              placeholder=" Search By name / Status ended/ Language / Channel"
              onChange={liveSearch}
              style={{width :"80%" , marginTop:"20px"}}
              />
              <span>  </span>
              <Button variant ="dark" size="sm">Seacrh</Button>
          </form>
          
          </Col></Row>
        {loading ? (
          <h1>Loading ...... </h1>
        ) : (
          <>
            <Row>
              {data.map((data) => (
                <Col key={data.id} xs={6} sm={6} md={6} lg={6} xl={3}>
                  <TVCard show={data} />
                </Col>
              ))}
            </Row>
            <Row>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Show;
