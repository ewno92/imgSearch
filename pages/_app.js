import "../styles/globals.scss";
import "../styles/home.scss";
import "../styles/SearchBar.scss";
import "../styles/loading.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducer from "../redux/reducers";

const store = createStore(allReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
