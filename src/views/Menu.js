import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function Menu() {
  const [callbacks, setCallbacks] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page from the backend set to 8

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getMenu');
      setData(response.data)
      setCallbacks(response.data);
      console.log("callbacks are--->",response.data);
      console.log("data is fetched--->", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const handleDelete = async (id) => {
    console.log("ID=====>", id);
    try {
      // Prompt the user for confirmation before deleting
      const confirmed = window.confirm("Are you sure you want to delete this item?");
      if (confirmed) {
        // If user confirms, proceed with the deletion
        const response = await axios.delete(`http://localhost:5000/menu/delete/${id}`);
        console.log("Delete Collectionitems are--->", response);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const handleUpdateEnum = async (index) => {

  };
  

  // Pagination
  // Pagination
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log("Data:", data);
  console.log("Index of First Item:", indexOfFirstItem);
  console.log("Index of Last Item:", indexOfLastItem);
  const currentItems = Array.isArray(data.data) ? data.data.slice(indexOfFirstItem, indexOfLastItem) : [];

  console.log("Current Items", currentItems);


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (id) => {
    setUpdateId(id);
    setShowUpdate(true);
  }

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [typesForMen] = useState(['Sherwani', 'Three piece', 'Waist cot']); // Example types for men
  const [typesForWomen] = useState(['Engagement', 'Barat', 'Mehndi','Nikkah','walima','Lehnga Choli','Shirt with sharara Garara','Shirt with Lehnga','Saris','Gowns']); // Example types for women

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Set the first type of the selected category
    if (selectedCategory === 'Men') {
      setType(typesForMen[0] || ''); // Set the first type of men, or an empty string if no types are available
    } else if (selectedCategory === 'Women') {
      setType(typesForWomen[0] || ''); // Set the first type of women, or an empty string if no types are available
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const renderTypeOptions = () => {
    if (category === 'Men') {
      return typesForMen.map((type, index) => (
        <option key={index} value={type}>{type}</option>
      ));
    } else if (category === 'Women') {
      return typesForWomen.map((type, index) => (
        <option key={index} value={type}>{type}</option>
      ));
    } else {
      return <option value="">Select Category First</option>;
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a category');
      return;
    }
    if (!category) {
      alert('Please enter a category');
      return;
    }
     if(name!= null & category!= null ) {
      setIsLoading(true);
  
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('category', category);

        // Use Axios to send form data
        const response = await axios.post(`http://localhost:5000/menu/${JSON.stringify([name,category])}`, 'null', {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        

        });
  console.log("the post apis is->",response.data);

        if (response.status === 201) {
          window.location.reload();
          console.log('Form submitted successfully');
          alert('Form Submitted Successfully')
        } else {
          console.error('Failed to submit form');
          alert("there is some error in sumbitting the form")
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }finally {
        setIsLoading(false); // Set loading state to false when request completes
      }
    }
  };


  const handleUpdateSubmit = async (updated) => {
    console.log("updateId =====00000",updated);
    //    e.preventDefault();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    if (!category) {
      alert('Please enter a category');
      return;
    }
    if(name!= null & category!= null ) {
      setIsLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('category', category);

        // Use Axios to send form data
        const response = await axios.put(`http://localhost:5000/menu/update/${JSON.stringify([name,category,updated])}`, 'null', {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        

        });
        console.log("the post apis is->",response.data);

        if (response.status === 201) {
          window.location.reload();
          console.log('Form submitted successfully');
          alert('Form Submitted Successfully')
        } else {
          console.error('Failed to submit form');
          alert("there is some error in sumbitting the form")
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }finally {
        setIsLoading(false); // Set loading state to false when request completes
      }
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Button variant="primary" onClick={handleShow}>
                Add Menu
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Dress Insert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </Form.Control>
                  </Form.Group>

                </Form>

                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                   {isLoading ? 'Submitting...' : 'Save'}

                  </Button>
                </Modal.Body>
              </Modal>



              {/* update model */}
              <Modal show={showUpdate} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Dress Insert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </Form.Control>
                  </Form.Group>

                </Form>

                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleUpdateSubmit(updateId)} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Update'}

                  </Button>
                </Modal.Body>
              </Modal>


              <CardTitle tag="h4"></CardTitle>
              <CardTitle tag="h4">Queries</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-white bg-dark">
                  <tr>
                    <th style={tableHeaderStyle}>Id</th>
                    <th style={tableHeaderStyle}>Menu Name</th>
                    <th style={tableHeaderStyle}>Category</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("current:", currentItems)}
                  {currentItems.map((item, index) => (

                    <tr key={index}>
                      <td style={tableCellStyle}>{item._id}</td>
                      <td style={tableCellStyle}>{item.name}</td>
                      <td style={tableCellStyle}>{item.category}</td>
                      <td style={tableCellStyle}>
                        <button style={updateButtonStyle} onClick={() => handleUpdateShow(item._id)}> Update</button>
                        <button style={updateButtonStyle} onClick={() => handleDelete(item._id)}> Delete</button>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </Table>
              {/* Pagination */}
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <a className="page-link" onClick={() => paginate(index + 1)} href="#!">
                        {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'start',
};

const tableCellStyle = {
  padding: '23px',
  fontSize: '14px',

};
const updateButtonStyle = {
  backgroundColor: 'blue', // Blue color
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Menu;
