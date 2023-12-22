import "./App.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/authContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: import.meta.env.VITE_REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
]);

function App() {
	return (
		<AuthProvider>
			<ApolloProvider client={client}>
				<RouterProvider router={router} />
			</ApolloProvider>
		</AuthProvider>
	);
}

export default App;
