import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, LogOut, Lock, Mail, User, RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthenticationSystem() {
  // States for different forms
  const [activeForm, setActiveForm] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form data states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: ""
  });

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle input changes for different forms
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  // API calls
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      });
      
      const data = await response.json();
      
      if (data.error) {
        setMessage({ type: "error", text: data.message });
      } else {
        localStorage.setItem("auth_token", data.data);
        setIsAuthenticated(true);
        setMessage({ type: "success", text: "Login successful" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to login. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  
 
  
  const handleLogout = async () => {
    setLoading(true);
    
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      
      localStorage.removeItem("auth_token");
      setIsAuthenticated(false);
      setActiveForm("login");
    } catch (err) {
      setMessage({ type: "error", text: "Failed to logout. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "mt-1 pl-10 block w-full focus:outline-blue-500 bg-gray-50 block sm:text-sm py-3 px-3"

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative rounded-md ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={loginForm.email}
            onChange={handleLoginInputChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={loginForm.password}
            onChange={handleLoginInputChange}
            className={inputClass}
            placeholder="********"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Forgot your password?
        </Link>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Logging in...
            </>
          ) : (
            <>Sign in</>
          )}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register now
          </Link>
        </p>
      </div>
    </form>
  );

  
  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a new password.
        </p>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={forgotPasswordForm.email}
            onChange={handleForgotPasswordInputChange}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 border px-3"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            <>Send New Password</>
          )}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => setActiveForm("login")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to login
          </button>
        </p>
      </div>
    </form>
  );

  const renderAuthenticatedContent = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Authentication successful</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>You are now logged in to the Employee Management System.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setActiveForm("resetPassword")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Lock className="-ml-1 mr-2 h-4 w-4" />
          Reset Password
        </button>
        
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="-ml-1 mr-2 h-4 w-4" />
          Log Out
        </button>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Employee Management System</h3>
        <p className="mt-2 text-sm text-gray-600">
          Use the navigation menu to manage employees, departments, and other resources.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <User className="-ml-1 mr-2 h-4 w-4" />
            Manage Employees
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <ArrowRight className="-ml-1 mr-2 h-4 w-4" />
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {!isAuthenticated ? (
            activeForm === "login" ? (
              "Sign in to your account"
            ) : activeForm === "register" ? (
              "Create a new account"
            ) : activeForm === "resetPassword" ? (
              "Reset your password"
            ) : (
              "Forgot your password"
            )
          ) : (
            "Employee Management System"
          )}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Display any error or success messages */}
          {message.text && (
            <div 
              className={`mb-4 rounded-md p-4 ${
                message.type === "error" ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
              }`}
            >
              <div className="flex">
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    message.type === "error" ? "text-red-800" : "text-green-800"
                  }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {isAuthenticated ? (
            activeForm === "resetPassword" ? renderResetPasswordForm() : renderAuthenticatedContent()
          ) : (
            <>
              {activeForm === "login" && renderLoginForm()}
              {activeForm === "register" && renderRegisterForm()}
              {activeForm === "forgotPassword" && renderForgotPasswordForm()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}