import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout";
import TopicPage from "../pages/topic/TopicPage";

const RootRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="messages"
            element={<h1>Hello</h1>}
          />
          <Route path="topic" element={<TopicPage/>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    );
  }
export default RootRouter;