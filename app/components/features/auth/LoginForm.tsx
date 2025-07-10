
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { z } from "zod"
import { toast } from "sonner"
import { NavLink, useNavigate } from "react-router"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axiosInstance from "~/lib/axios"
import { useAuthState } from "~/stores/authStore"
import axios from "axios"

const formSchema = z.object({
    email: z.string().email("Email field must be a valid email address"),
    password: z.string().min(6, "Password field must be at least 8 characters."),
});

export default function LoginForm() {

    const { setLoading, loading, setUser, setToken } = useAuthState();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/login', data);
            setUser(response.data.data.user);
            setToken(response.data.data.token);
            const role = response.data.data.user.role?.[0];
            if (role === 'admin' || role === 'moderator') {
                navigate('/admin/home')
            }
            toast.success('Welcome back !')

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;

                if (responseData?.errors) {
                    Object.entries(responseData.errors).forEach(([field, messages]) => {
                        form.setError(field as keyof typeof data, {
                            type: 'server',
                            message: Array.isArray(messages) ? messages[0] : messages,
                        });
                    });
                } else if (responseData?.message) {
                    toast.error(responseData.message);
                } else {
                    toast.error('An unexpected error occurred!');
                }
            } else {
                toast.error('Unable to connect to the server!');
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input {...field} placeholder="Email" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input type="password" {...field} placeholder="Password" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>Login</Button>

                            <div className="mt-4 text-center text-sm">
                                Don't have an account yet?{" "}
                                <NavLink to="/sign-up" className="underline underline-offset-4">
                                    Sign up
                                </NavLink>
                            </div>
                        </form>
                    </Form>


                </CardContent>
            </Card>
        </div>
    )
}
