import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout";

const RootRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="messages"
            element={<h1>Hello</h1>}
          />
        </Route>
      </Routes>
    );
  }
export default RootRouter;