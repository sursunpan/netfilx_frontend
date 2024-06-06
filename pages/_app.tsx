import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor, RootState } from "../store";

function AuthChecker({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      if (router.pathname === "/auth") {
        router.push("/profiles");
      }
    } else {
      if (router.pathname !== "/auth") {
        router.push("/auth");
      }
    }
  }, [token, router]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>
      </PersistGate>
    </Provider>
  );
}
