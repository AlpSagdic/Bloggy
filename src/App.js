import "./css/style.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Index from "./pages/Index";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path={"/"}
          element={
            <main>
              <Index />
            </main>
          }
        />
        <Route
          path={"/login"}
          element={
            <main>
              <LoginPage />
            </main>
          }
        />
        <Route
          path={"/register"}
          element={
            <main>
              <RegisterPage />
            </main>
          }
        />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path={"/post/:id"} element={<PostPage />} />
        <Route path={"/edit/:id"} element={<EditPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
