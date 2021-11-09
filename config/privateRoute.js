import { useRouter } from "next/router";

export const admin = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const auth = props.auth;

      if (!auth.isAuthenticated) {
        Router.replace("/login");
        return null;
      }

      const token = auth.data?.token;

      if (!token) {
        Router.replace("/login");
        return null;
      }

      const user = auth.data?.user;
      console.log(user);

      if (!user) {
        Router.replace("/login");
        return null;
      }

      if (user.role_id === 1) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};
