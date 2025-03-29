/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export function SignUp({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                alert("Passwords do not match");
                return;
            }
            const response = await axios.post("https://csc-415-project.onrender.com/api/v1/auth/signup/", {
                email,
                password,
            });
            if (response.status === 201) {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.User));
                navigate("/");
            }
        } catch (error: any) {
            toast(error.response.data.message, {
                type: "error",
            });
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Signup to get access</h1>
                <p className="text-balance text-sm text-muted-foreground">Sign up with your company email</p>
            </div>
            <div className="grid gap-6">
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="j@gmail.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </form>
    );
}
