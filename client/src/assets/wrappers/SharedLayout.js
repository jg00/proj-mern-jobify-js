import styled from "styled-components";

const Wrapper = styled.section`
  /* On small screen big sidebar hidden automatically */

  /* Container for Navbar component and .dashboard-page where dashboard child pages will be shown via <Outlet/> */
  /* On small screen big sidebar not displayed */
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  /* Section below nav bar */
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  /* On wide screen big sidebar displayed automatically  */
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
      /* border-bottom: 2px dashed #999; */
      /* border-top: 2px dashed #999; */
    }
  }
`;
export default Wrapper;
