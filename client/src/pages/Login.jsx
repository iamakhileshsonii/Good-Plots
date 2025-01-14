import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";
import defaultProperty from "@/assets/property.jpg";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/register-form";
import WelcomeText from "@/components/welcome-text";

const Login = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left container */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-black text-white">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-medium absolute top-6 left-6"
        >
          <img src={logo} alt="GoodPlots" className="w-auto h-7" />
        </Link>
        <WelcomeText />
      </div>

      {/* Right container */}
      <div
        className="flex flex-col gap-4 p-6 md:p-10 "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${defaultProperty})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Form tabs */}
        <div className="flex flex-1 items-center justify-center">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">LOGIN</TabsTrigger>
              <TabsTrigger value="register">REGISTER</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
