import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* <Route>
  <Route> elements may be nested to indicate nested UI, which also "correspond 
  to nested URL paths". Parent routes render their child routes by rendering 
  an <Outlet>.

  The default <Route element> is an <Outlet>. This means the route will still 
  render its children even without an explicit element prop, so you can nest 
  route paths without nesting UI around the child route elements.

  <Outlet> is just where eventually we want the children elements to be rendered.
*/
