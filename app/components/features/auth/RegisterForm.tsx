
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { NavLink, useNavigate } from "react-router"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import axiosInstance from "~/lib/axios"
import { useAuthState } from "~/stores/authStore"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

const formSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters.'),
    lastName: z.string().min(2, 'Last name field must be at least 2 characters.'),
    email: z.string().email("Email field must be a valid email address"),
    gender: z.enum(['male', 'female'], {
        required_error: "Please select your gender",
    }),
    password: z.string().min(8, "Password field must be at least 8 characters."),
    passwordConfirmation: z.string(),
})
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Password field confirmation does not match.",
    });

export default function RegisterForm() {

    const navigate = useNavigate();
    const { setLoading, loading } = useAuthState();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: undefined,
            password: "",
            passwordConfirmation: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const payload = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            gender: data.gender,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        }
        try {
            setLoading(true);
            await axiosInstance.post('/register', payload);
            toast.success('Accout created successfully')
            navigate('/sign-in');
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
    };

    return (
        <div className='flex flex-col gap-6'>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create a new account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input {...field} placeholder="First Name" /></FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input {...field} placeholder="Last Name" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input type="password" {...field} placeholder="Confirmation password" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>Register</Button>

                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <NavLink to='/sign-in' className="underline underline-offset-4">
                                    Sign in
                                </NavLink>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
