import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

import sasukeTheme from "../assets/images/sasuketheme.png";

const Login = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08050D] text-[#17121F]">
      <AuthLayout
        backgroundImage={sasukeTheme}
        brandPanel={<AuthBrandPanel />}
        formPanel={<LoginForm />}
      />
    </main>
  );
};

export default Login;