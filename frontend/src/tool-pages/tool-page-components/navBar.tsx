import { Navbar, Nav} from 'react-bootstrap';
import {ReactElement} from "react";

const ReadMeiNavBar = (): ReactElement => {
    return <>
      <Navbar  expand={false} className="bg-body-tertiary" fixed="top">
    <div className="w-100 justify-content-between">
      <div className="p-2"> 
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Brand> ReadMei</Navbar.Brand>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto p-2">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/member-search">User Search</Nav.Link>
          <Nav.Link href="/events-manage">Manage Events</Nav.Link>
          {/* <Nav.Link href="/tool-template">Tool Template</Nav.Link> */}

          {/* Add links to more tools as navlinks here*/}
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
    </>
}

export default ReadMeiNavBar;