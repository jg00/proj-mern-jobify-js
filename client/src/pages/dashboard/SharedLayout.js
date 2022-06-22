import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";

// Shared layout for the dashboard section
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* Column 1 - at 992px one or the other is hidden/shown via css */}
        <SmallSidebar />
        <BigSidebar />

        {/* Column 2 - two rows - nav and dashboard-page */}
        <div>
          <Navbar />
          {/* .dashboard-page alloted 90vw */}
          <div className="dashboard-page">
            {/* Child pages section alloted 100% of the 90vw and padding around to get box section effect */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;

/*
  <Outlet> 
  - will be where nested pages will be displayed or null (ie  renders child route's element if there is one)
  - should be used in parent route elements
  
  - Setup:
  - Need parent <Route> that could point to an element or not.
  - If it does point tot an element you could place <Outlet/> within that element to
  indicate where to render child elements.
  - You could also indicate which child element will be displayed initially by
  adding 'index' boolean prop to that <Route index ../>

  SharedLayout
  - Purpose is to have a layout that all the nested pages will 'share'.
  - <Outlet> will be the eventual place where we want the children rendered.
*/
