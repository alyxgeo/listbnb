import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go to Home</Link>
    </div>
  );
};

export default NotFound;
