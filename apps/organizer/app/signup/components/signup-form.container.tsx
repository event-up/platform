import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import Link from "next/link";

export function SignUpForm() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-foreground">
          Sign Up to Elevate your events
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
          Join EventUp and gain access to tools designed to make every event a memorable success. Get started in seconds.
        </p>
        <div className="mt-4 rounded-xl bg-primary/5 p-4 border border-primary/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="font-semibold text-foreground">A quick heads-up:</strong> We're actively building a fully self-service platform for organizers. Currently, we specialize in managed QR invitations and provide a dedicated scanner app for seamless on-site attendance tracking. We handle the complex parts so you can focus on the experience.
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company Name <span className="text-muted-foreground font-normal">(Optional)</span></Label>
          <Input id="company" type="text" placeholder="EventUp Inc." className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required className="h-11" />
        </div>
        
        <div className="mt-2 flex flex-col gap-4">
          <Button type="submit" className="w-full text-base font-medium h-11">
            Create Account
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button variant="outline" type="button" className="w-full bg-transparent h-11 hover:bg-muted/50 transition-colors">
            <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>
      </form>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
