"use client";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [varient, setVarient] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarient = useCallback(() => {
    if (varient === "LOGIN") {
      setVarient("REGISTER");
    } else {
      setVarient("LOGIN");
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      package: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (varient === "REGISTER") {
      // register
    }
    if (varient === "LOGIN") {
      // login
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    //nextAuth social signin
  };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <div
        className="
                px-4
                bg-white
                py-8
                shadow
                sm:rounded-lg
                sm:px-10   
            "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === "REGISTER" && (
            <Input
              id="name"
              type="text"
              label="Name"
              disabled={isLoading}
              errors={errors}
              register={register}
              required
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {varient === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center                     
            "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
            "
        >
          <div>
            {varient === "LOGIN"
              ? "New To Messanger?"
              : "Already have an account ?"}
          </div>
          <div onClick={toggleVarient} className="cursor-pointer underline">
            {varient === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
