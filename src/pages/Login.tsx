
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function onSubmit(data: any) {
    // For MVP, simulate login!
    toast({
      title: "Logged in!",
      description: "Welcome back.",
    });
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/30">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6 border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-1">Login</h2>
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
          Log In
        </Button>
        <div className="text-sm text-center mt-4">
          No account? <NavLink to="/signup" className="text-primary underline">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
}
