import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NotFound() {
  return (
    <>
      <Alert>
        <AlertTitle>404 Not Found</AlertTitle>
        <AlertDescription>Could not find requested recipe</AlertDescription>
      </Alert>
    </>
  )
}
