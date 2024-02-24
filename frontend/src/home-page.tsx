import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export function HomePage() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (<>
        <Navbar bg="light" expand="lg" fixed="top"> {/* Use fixed="top" to pin the navbar to the top */}
      <Navbar.Brand href="#home">

        </Navbar.Brand> {/* Your app's name or logo */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Add more Nav.Link components for your navigation items */}
        </Nav>
        {/* You can also add additional elements like a search bar, user profile, etc. here */}
      </Navbar.Collapse>
    </Navbar>

    </>);
}

export default HomePage;