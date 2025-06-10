import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../icons";
import Label from "../common/form/Label";
import Input from "../common/form/InputField";
import Checkbox from "../common/form/Checkbox";
import Button from "../common/form/Button";
import { toast } from "sonner";
import { UserContext } from "../context/UserContextProvider";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password)
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const formdata = { email, password };

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      
        },
        body: JSON.stringify(formdata),
      });

      const result = await response.json();

      if (response.ok && result?.status) {
        login({
          result: result.user,
          resultToken: result.token,
        });
        toast.success(result.message);

        // ✅ Redirect based on role
        if (result.user.Role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors  dark:text-gray-400 dark:hover:text-gray-300"
        >
          {/* <ChevronLeftIcon className="size-5" /> */}
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input type="Email" placeholder="info@gmail.com" ref={emailRef} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      ref={passwordRef}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {/* {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )} */}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                </div>
                <div>
                  <Button type="submit" onClick={handleSubmit} className="border-amber-50 border-2 cursor-pointer  w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/register"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
