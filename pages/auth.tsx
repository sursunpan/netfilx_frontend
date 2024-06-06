/* eslint-disable @next/next/no-img-element */
import Input from "@/components/input";
import apiService from "@/services/apiService";
import { signInFailure, signInSuccess } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const router = useRouter();
  const dispatch = useDispatch();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const response = await apiService.postWithoutToken(
        "/login",
        JSON.stringify({
          email,
          password,
        })
      );

      console.log(response);
      if (response.error === false) {
        dispatch(signInSuccess(response));
        router.push("/profiles");
      }
      if (response.error === true) {
        console.log(response.reason);
        dispatch(signInFailure(response));
      }
    } catch (err) {
      console.log(err);
    }
  }, [email, password, router, dispatch]);

  const register = useCallback(async () => {
    try {
      const response = await apiService.postWithoutToken(
        "/register",
        JSON.stringify({
          email,
          password,
          name,
        })
      );

      if (response.error === false) {
        login();
      }
    } catch (err) {
      console.log(err);
    }
  }, [email, password, name, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="email"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
