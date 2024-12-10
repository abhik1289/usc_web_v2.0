import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.user)["signIn"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.user)["signIn"]["$post"]
>["json"];

export const useSignInAccount = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      try {
        console.log("Sending sign-in request:", json);

        const response:any = await client.api.user["signIn"].$post({ json });

        // Ensure the response is valid and check for success
        const responseBody = await response.json();
        if (!responseBody.success) {
          throw new Error(responseBody.error || "Login failed");
        }

        return responseBody; // Return valid response body
      } catch (error: any) {
        // Catch errors and handle appropriately
        console.error("Sign-in error:", error);
        throw new Error(error.message || "An unexpected error occurred");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Sign-in failed");
    },
    onSuccess: () => {
      toast.success("Sign-in successful");
    },
  });
};
