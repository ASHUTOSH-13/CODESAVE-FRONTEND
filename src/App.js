import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Problems from "./screens/Problems";
import ViewparticularProblem from "./screens/ViewparticularProblem";
import Addproblems from "./screens/Addproblems";
import Editproblem from "./screens/Editproblem";
import Error404 from "./screens/Error404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Problems />} />
        <Route path="/questions/new" element={<Addproblems />} />
        <Route path="/questions/:id" element={<ViewparticularProblem />} />
        <Route path="/questions/:id/edit" element={<Editproblem />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
