import "./App.sass";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import Layout from "./Layout";
import Account from "./pages/Account";
import Error from "./components/Error/Error";
import CreateBlogPost from "./pages/CreateBlogPost";
import Article from "./pages/Article";
import ForgotPassword from "./pages/ForgotPassword";

const client = new ApolloClient({
	uri: import.meta.env.VITE_REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{ path: "/", element: <Home /> },
			{
				path: "account/:id",
				element: <Account />,
			},
			{
				path: "article/",
				element: <Outlet />,
				children: [
					{
						path: "create",
						element: <CreateBlogPost />,
					},
					{
						path: ":id",
						element: <Article />,
					},
				],
			},
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
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
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
