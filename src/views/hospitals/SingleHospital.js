import React, { useState, useEffect } from 'react';
import api from 'api';
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row
} from 'reactstrap';
import { useParams } from 'react-router';

const SingleHospital = () => {
  const [Hospital, setHospital] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    getSingleHospital();
  }, []);

  const getSingleHospital = async () => {
    console.log('id', _id);
    const data = await api('get', `/v1/hospitals/${_id}`);
    setHospital(data.hospital);
  };

  console.log('singleHospital', Hospital);

  return (
      <>

       <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between " style={{margin:"20px"}}>   
                    <h1>Scools Linked With Hospital</h1>
                </div>
              </CardHeader>

   <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">domain</th>
                  </tr>
                </thead>
                <tbody>
                  {Hospital?.schools?.map((school) => {
                    return (
                      <tr>
                        
                      <td>{school.name}</td>
                      <td>{school.domain_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              </Card>
    </>
    
  );
};

export default SingleHospital;
