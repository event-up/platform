import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { Terminal } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
      <Alert variant="default">
      <Terminal/>
        <AlertTitle>This is Front Face app</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  )
}
