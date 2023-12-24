import "./App.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import Layout from "./Layout";

const client = new ApolloClient({
	uri: import.meta.env.VITE_REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <Home /> },
			// ... other routes
		],
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
		<ApolloProvider client={client}>
			<SnackbarProvider>
				<RouterProvider router={router} />
			</SnackbarProvider>
		</ApolloProvider>
	);
}

export default App;
