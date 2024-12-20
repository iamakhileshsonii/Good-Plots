import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";
import defaultProperty from "@/assets/property.jpg";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/register-form";

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <div className="flex justify-center gap-2 md:justify-start mt-5">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img src={logo} alt="GoodPlots" className="w-auto h-7" />
          </Link>
        </div>
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
      <div className="relative hidden bg-muted lg:block">
        <img
          src={defaultProperty}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
