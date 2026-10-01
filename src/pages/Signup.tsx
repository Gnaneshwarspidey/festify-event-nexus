
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function onSubmit(data: any) {
    toast({
      title: "Account created!",
      description: "Welcome to EventGen.",
    });
    setTimeout(() => navigate("/login"), 800);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/30">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6 border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
        <div>
          <label className="font-semibold block mb-1">Email</label>
          <Input {...register("email", { required: "Email required" })} />
          {errors.email && (<span className="text-red-500 text-xs">{String(errors.email.message)}</span>)}
        </div>
        <div>
          <label className="font-semibold block mb-1">Password</label>
          <Input type="password" {...register("password", { required: "Password required" })} />
          {errors.password && (<span className="text-red-500 text-xs">{String(errors.password.message)}</span>)}
        </div>
        <Button type="submit" className="w-full mt-4">
          Sign Up
        </Button>
        <div className="text-sm text-center mt-4">
          Already a member? <NavLink to="/login" className="text-primary underline">Log in</NavLink>
        </div>
      </form>
    </div>
  );
}
