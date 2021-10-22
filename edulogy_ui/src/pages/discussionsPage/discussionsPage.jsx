import React from 'react';
import AllDiscussions from '../../components/allDiscussions';
import Nav from "../../common/nav";
import Footer from "../../common/footer";
import Popup from '../../components/popup';
import MenuSidebar from "../../common/menuSidebar";

function DiscussionsPage() {
  return (
    <React.Fragment>
      <Nav />
      <AllDiscussions />
      <Popup />
      <Footer />
      <MenuSidebar />
    </React.Fragment>
  )
}

export { DiscussionsPage };
