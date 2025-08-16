import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();
    
  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
    // Handle the response as needed
  };

  useEffect(() => {
    if (isSuccess) {
      // Handle successful checkout session creation
      if (data?.url) {
        window.location.href = data.url;// redirect to stripe checkout
      }else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      // Handle error
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error ]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="bg-white text-black w-1/2 hover:bg-gray-200 transition-colors">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-2 w-2 animate-spin" />
          Processing...
        </>
      ) : (
        "Enroll me"
      )}
    </Button>
  );
};

export default BuyCourseButton;