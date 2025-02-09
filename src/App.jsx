import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./views/Login";
import Profile from "./views/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./views/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
export default App;