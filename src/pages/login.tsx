import LoginForm from "@/components/LoginForm";
import Register from "@/components/Register";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <h4>Crie uma conta em: </h4>
          <Register />
        </CardFooter>
      </Card>
    </div>
  );
}
