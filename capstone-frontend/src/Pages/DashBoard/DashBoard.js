import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "../../Services/axios";
import './DashBoard.css'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AccountsSlider from './AccountsSlider';


const itemsPerPage = 5;
function DashBoard() {
  const user = useSelector((state) => state.userReducer.user);
  console.log(user.customerId)
  
        {/* download Statements */}
        const handleDownloadClick = async () => {
          axios
      .get(`transactions/generate-pdf/${user.customerId}`, {
        responseType: 'blob', // Set the response type to 'blob' for binary data
      })
      .then((response) => {
        // Create a URL for the PDF blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.pdf';

        // Trigger a click event on the anchor element to start the download
        a.click();

        // Release the URL and clean up
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
        }
        
        
        const [transactions, setTransactions] = useState([]);
        const [filteredTransactions, setFilteredTransactions] = useState([]);
        const [fromDate, setFromDate] = useState('');
        const [toDate, setToDate] = useState('');
      
        useEffect(() => {
          // Fetch data from the localhost API
          axios.get('transactions/sender/'+user.customerId)
            .then((response) => {
              setTransactions(response.data);
              setFilteredTransactions(response.data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }, []);
        
      
        const handleFromDateChange = (e) => {
          setFromDate(e.target.value);
          filterTransactions(e.target.value, toDate);
        };
      
        const handleToDateChange = (e) => {
          setToDate(e.target.value);
          filterTransactions(fromDate, e.target.value);
        };
        const swiperParams = {
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesPerView:3,
      
        
      };
        
      
        const filterTransactions = (from, to) => {
          const filtered = transactions.filter((transaction) => {
            const parts = transaction.timeStamp.split('-'); 
            const [day, month, year] = parts;
            const convertedDate = `${year}-${month}-${day}`;
            const transactionDate = new Date(convertedDate).getTime();
            const fromDateObj = new Date(from).getTime();
            const toDateObj = new Date(to).getTime();
            return transactionDate >= fromDateObj && transactionDate <= toDateObj;
          });
          setFilteredTransactions(filtered);
        };
  return (
    <main className="dashboard">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="https://img.freepik.com/free-photo/woman-touching-smart-technology-holographic-interface_53876-98409.jpg"
              alt="First slide"
              style={{height:"45vh", width:"auto"}}
            />
          </div>
        </div>
      </div>

      <br></br>

      <div style={{ backgroundColor: "#F2F2F8", padding: "20px" }}>
        <h3 className="googlefont">&nbsp;Account Balances</h3>
        <AccountsSlider />
      </div>

      <br />

      <div className="col-md-4" style={{paddingLeft:"2rem"} }>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-4 pt-3 pb-2 mb-3 border-bottom">
          <h3 className="googlefont">Recent Transactions</h3>
        </div>
      </div>

      <div className="table-responsive" style={{ padding: "2rem" }}>
        <div
          className="border rounded"
          style={{ backgroundColor: "#FFEAE6", padding: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form style={{ width: "150px", display: "flex", gap: "10px" }}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange}
                />
              </Form.Group>
            </Form>
             <button className="btn btn-dark" onClick={handleDownloadClick}>
              <span>
                <FontAwesomeIcon
                  icon={faCloudArrowDown}
                  size="xl"
                  style={{ color: "#c8cdd5" }}
                />
              </span>
              &nbsp;Download
            </button> 
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Timestamp</th>
                <th>Transaction Type</th>
                <th>Account</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions
                .slice(-10)
                .reverse()
                .map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.timeStamp}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.account}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>

      <br></br>

      <br></br>
      <div className="row rounded" style={{ margin:"1rem 2rem", backgroundColor: "#eee" }}>

          <h1 className="googlefont"  style={{paddingLeft:"2rem"} }>Our Services</h1>
          <br></br>
          <ol style={{paddingLeft:"4rem"} }>
            <li>
              <a href="/accounts" className="googlefont">
                <h4 className="googlefont">Multi-Bank Account Management</h4>
              </a>

              <p>
                Access all your bank accounts in one place. Connect multiple
                banks and financial institutions, making it easier to keep track
                of your finances.
              </p>
            </li>
            <li>
              <a href="/money-transfer" className="googlefont">
                <h4 className="googlefont">Fund Transfers</h4>
              </a>
              <p>
                Transfer money seamlessly between your accounts in different
                banks. Whether you need to pay bills, send money to friends, or
                manage your investments, this platform simplifies the process.
              </p>
            </li>
            <li>
              <h4 className="googlefont">Real-Time Transactions</h4>
              <p>
                Perform transactions in real-time. Instantly check your account
                balances, initiate transfers, and receive transaction
                notifications, ensuring you are always in control of your money.
              </p>
            </li>
            <li>
              <a href="/credit-cards" className="googlefont">
                <h4 className="googlefont">Credit Card Management</h4>
              </a>
              <p>
                Manage your credit cards effectively. View your credit card
                statements, track expenses, and make payments directly from the
                platform.
              </p>
            </li>
            <li>
              <h4 className="googlefont">Alerts and Notifications:</h4>
              <p>
                Stay informed about account activity and receive alerts for low
                balances, large transactions.
              </p>
            </li>
          </ol>
      </div>
      <br></br>
      <div>
        <h2 className="googlefont" style={{paddingLeft:"4rem"} }>
          More Help to you
        </h2>
        <div
          style={{
            padding: "50px",
            display: "flex",
            gap:'8px',
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Card sx={{ maxWidth: 345, height: 550 }}>
            <CardMedia
              sx={{ height: 300 }}
              image="https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Security Tips for safe Banking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Security is of utmost importance when banking online to protect
                your financial information. Remember, online banking
                security is a shared responsibility between you and your bank.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345, height: 550 }}>
            <CardMedia
              sx={{ height: 300 }}
              image="https://cdn.vox-cdn.com/uploads/chorus_image/image/72084549/GettyImages_1403886950.0.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tackle Rising prices
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tackling rising prices, often referred to as inflation, can be
                challenging, but there are several strategies individuals and
                households can consider to mitigate its impact on their
                finances:
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345, height: 550 }}>
            <CardMedia
              sx={{ height: 300 }}
              image="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Save For Tomorrow
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Save for tomorrow" is a simple yet powerful financial principle
                that emphasizes the importance of setting aside a portion of
                your income or resources today to meet future needs and goals.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
              <Link to="https://www.hdfcbank.com/personal/resources/learning-centre/secure/7-tips-for-safe-secure-internet-banking" style={{ textDecoration: "none" }}>
                Learn More
              </Link>
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <div style={{ paddingLeft: "4rem", backgroundColor: "#FFDBEC" }}>
        <h1 className="googlefont" style={{ padding: "10px" }}>
          Struggling with your payments?
        </h1>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "20px" }}
        >
          Please tell us ASAP if you’ve missed a repayment with us or know
          you’re about to,<br></br> or if you’re struggling to pay off your
          overdraft. The sooner you let us know, the sooner<br></br> we can try
          and help sort things out.
        </Typography>
      </div>
      <div style={{ padding: (window.innerWidth>'768px')?"50px":"25px" }}>
        <Card sx={{ maxWidth: 345, height: 400 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="https://www.shutterstock.com/shutterstock/videos/1084952701/thumb/11.jpg?ip=x480"
            title="support"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Get support on our website
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click on the below Support Link , in case facing some issues
              related to Funds & Transfer, Debit Cards, Credit Cards etc..
              <br></br>We would Love to help you !
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to="/support" style={{ textDecoration: "none" }}>
                Get Help
              </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    </main>
  );
}

export default DashBoard;
