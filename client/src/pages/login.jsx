import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const changeInputHandler = (e,type) => {
        const {name, value} = e.target;
        if (type == "signup"){
            setSignupInput({...signupInput,[name]:value});
        }else{
            setLoginInput({...loginInput,[name]:value});
        }
    };
    const handleRegistraion = (type) =>{
        const inputData = type  === "signup" ? signupInput : loginInput;
        console.log(inputData);

    } 
    return (
        <div className="flex items-center w-full justify-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account to start your Journey!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                type="text"
                                name="name"
                                value = {signupInput.name}
                                onChange={(e) => changeInputHandler(e,"signup")} 
                                placeholder="Your Name" 
                                required="true" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Email</Label>
                                <Input 
                                type="email"
                                name = "email"
                                value = {signupInput.email}
                                onChange={(e) => changeInputHandler(e,"signup")} 
                                placeholder="Your Valid Email" 
                                required="true"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Password</Label>
                                <Input 
                                type="password"
                                name="password"
                                value = {signupInput.password}
                                onChange={(e) => changeInputHandler(e,"signup")} 
                                placeholder="Your Secret Key" 
                                required="true" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistraion("signup")}>Sign Up</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login Up Here to Start where you left!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">Email</Label>
                                <Input 
                                type="email"
                                name="email"
                                value = {loginInput.email}
                                onChange={(e) => changeInputHandler(e,"login")}
                                placeholder="UserName or Email" 
                                required="true"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">New password</Label>
                                <Input 
                                type="password"
                                name = "password"
                                value = {loginInput.password}
                                onChange={(e) => changeInputHandler(e,"login")}
                                placeholder="Password" 
                                required="true" 
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistraion("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login;