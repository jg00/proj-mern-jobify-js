import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      {/* Overlay */}
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        {/* __ Content within overlay __ */}
        <div className="content">
          {/* _ Close Button*/}
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          {/* _ Logo */}
          <header>
            <Logo />
          </header>

          {/* _ Links*/}
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;

/*
  SmallSidebar:
  When toggle sidebar icon clicked show modal for navigation.
*/
