import { useNavigate, useLocation } from "react-router-dom";

function RequiresLogin() {
    const navigate = useNavigate();
    const location = useLocation(); // to know where they came from

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                alt="Login Required"
                className="w-40 mb-6 opacity-70"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                You must be logged in
            </h2>
            <p className="text-gray-500 mb-6">
                Please log in to access this page.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/login", { state: { from: location.pathname } })}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 hover:bg-gray-400 py-2 px-6 rounded-lg font-semibold transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default RequiresLogin;
