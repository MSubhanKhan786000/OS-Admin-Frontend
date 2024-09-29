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


function Collections() {
  const [callbacks, setCallbacks] = useState([]);
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page from the backend set to 8
  const [typesForMen] = useState(['Sherwani', 'Three piece', 'Waist cot']); // Example types for men
  const [typesForWomen] = useState(['Engagement', 'Barat', 'Mehndi','Nikkah','walima','Lehnga Choli','Shirt with sharara Garara','Shirt with Lehnga','Saris','Gowns']); // Example types for women
  
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (id) => {
    setUpdateId(id);
    setShowUpdate(true);
  }

  const [setMenArray] = useState([]);
  const [setWoMenArray] = useState([]);


  useEffect(() => {
    fetchMenu();
    fetchData();
  }, []);


const sortCategory = () =>{
  menuData.data.map((item) => {
    if (item.category === 'Men') {
      if (!typesForMen.some(type => type === item.name)) {
        typesForMen.push(item.name);
      }
    } else if (item.category === 'Women') {
      if (!typesForWomen.some(type => type === item.name)) {
        typesForWomen.push(item.name);
      }
    }
    
});
}
  console.log("menuData -----> ++++++ ",menuData.data)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCollection');
      setData(response.data)
      setCallbacks(response.data);
      console.log("callbacks are--->",response.data);
      console.log("data is fetched--->", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 
  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getMenu');
      setMenuData(response.data)
      setCallbacks(response.data);
      console.log("callbacks are--->",response.data);
      console.log("data is Menu fetched--->", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleImageClick = (e, imageUrl) => {
    e.preventDefault();
    console.log("imageUrl>>>>>>>>>>>>>>>>>>>>>>>>>>",imageUrl);
    window.open(imageUrl);
  };

  

  const handleDelete = async (id) => {
    console.log("ID=====>", id);
    try {
      // Prompt the user for confirmation before deleting
      const confirmed = window.confirm("Are you sure you want to delete this item?");
      if (confirmed) {
        // If user confirms, proceed with the deletion
        const response = await axios.delete(`http://localhost:5000/collections/delete/${id}`);
        console.log("Delete Collectionitems are--->", response);
        window.location.reload()
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleUpdateSubmit = async (updated) => {
    console.log("updateId =====00000",updated);
//    e.preventDefault();
        // Check if any required field is empty
        if (!image) {
          alert('Please select an image');
          return;
        }
        if (!name) {
          alert('Please enter a name');
          return;
        }
        if (!description) {
          alert('Please enter a description');
          return;
        }
        if (!buyPrice) {
          alert('Please enter a buy price');
          return;
        }
        if (!rentPrice) {
          alert('Please enter a rent price');
          return;
        }
        if (!status) {
          alert('Please select a status');
          return;
        }
        if (!category) {
          alert('Please select a category');
          return;
        }
        if (!type) {
          alert('Please select a type');
          return;
        }
         if(image!= null & type != null & category !=null & status !=null & rentPrice !=null & buyPrice !=null & description !=null & name !=null ) {
          setIsLoading(true);
      
          try {
                const formDataToSend = new FormData();
                formDataToSend.append('name', name);
                formDataToSend.append('description', description);
                formDataToSend.append('buyPrice', buyPrice);
                formDataToSend.append('rentPrice', rentPrice);
                formDataToSend.append('status', status);
                formDataToSend.append('category', category);
                formDataToSend.append('type', type);
                formDataToSend.append('image', image);
                // Use Axios to send form data
                const response = await axios.put(`http://localhost:5000/collections/update/${updated}`, formDataToSend, {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [status, setStatus] = useState('');



  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [categorizedData, setCategorizedData] = useState([]);

  // Function to categorize data


  // Call the categorize function when component mounts or whenever data changes

  

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    sortCategory();

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

      // Check if any required field is empty
        // Check if any required field is empty
  if (!image) {
    alert('Please select an image');
    return;
  }
  if (!name) {
    alert('Please enter a name');
    return;
  }
  if (!description) {
    alert('Please enter a description');
    return;
  }
  if (!buyPrice) {
    alert('Please enter a buy price');
    return;
  }
  if (!rentPrice) {
    alert('Please enter a rent price');
    return;
  }
  if (!status) {
    alert('Please select a status');
    return;
  }
  if (!category) {
    alert('Please select a category');
    return;
  }
  if (!type) {
    alert('Please select a type');
    return;
  }
   if(image!= null & type != null & category !=null & status !=null & rentPrice !=null & buyPrice !=null & description !=null & name !=null ) {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('description', description);
      formDataToSend.append('buyPrice', buyPrice);
      formDataToSend.append('rentPrice', rentPrice);
      formDataToSend.append('status', status);
      formDataToSend.append('category', category);
      formDataToSend.append('type', type);
      formDataToSend.append('image', image);

      // Use Axios to send form data
      const response = await axios.post('http://localhost:5000/collections', formDataToSend, {
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
                Add Dresses
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Dress Insert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file" // Changed to file type
                      onChange={(e) => setImage(e.target.files[0])} // Update image state with selected file
                      accept="image/*" // Specify accepted file types (images)
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Buy Price"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Rent Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Rent Price"
                      value={rentPrice}
                      onChange={(e) => setRentPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Both">Both</option>
                    </Form.Control>
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
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={type}
                      onChange={handleTypeChange}
                      disabled={!category} // Disable the field until category is selected
                    >
                      {renderTypeOptions()}
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
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file" // Changed to file type
                      onChange={(e) => setImage(e.target.files[0])} // Update image state with selected file
                      accept="image/*" // Specify accepted file types (images)
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Buy Price"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Rent Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Rent Price"
                      value={rentPrice}
                      onChange={(e) => setRentPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Both">Both</option>
                    </Form.Control>
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
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={type}
                      onChange={handleTypeChange}
                      disabled={!category} // Disable the field until category is selected
                    >
                      {renderTypeOptions()}
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
                    <th style={tableHeaderStyle}>User Id</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Description</th>
                    <th style={tableHeaderStyle}>buyPrice</th>
                    <th style={tableHeaderStyle}>rentPrice</th>
                    <th style={{ ...tableHeaderStyle, width: '800px', height: 'auto' }}>Image</th>
                    <th style={tableHeaderStyle}>Created At</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("current:", currentItems)}
                  {currentItems.map((item, index) => (

                    <tr key={index}>
                      <td style={tableCellStyle}>{item._id}</td>
                      <td style={tableCellStyle}>{item.name}</td>
                      <td style={tableCellStyle}>{item.description}</td>
                      <td style={tableCellStyle}>{item.buyPrice}</td>
                      <td style={tableCellStyle}>{item.rentPrice}</td>
                      <td onClick={(e) => handleImageClick(e, item.image)} style={{ ...tableCellStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <img src={item.image} alt="User Image" style={{ maxWidth: '100%', height: 'auto' }} />
                      </td>

                      <td style={tableCellStyle}>{item.createdAt}</td>
                      <td style={tableCellStyle}>{item.status}</td>
                      <td style={tableCellStyle}>
                      <button style={updateButtonStyle} onClick={() => handleUpdateShow(item._id)}> Update</button>
                        <button style={updateButtonStyle} onClick={() => handleDelete(item._id)}>Delete</button>
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

export default Collections;
