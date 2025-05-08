"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

// Define Admin interface matching the MongoDB schema
interface Admin {
  email: string;
  _id?: string;
}

function SignIn() {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //fetch admin data from database
    const fetchAdminData = async (): Promise<Admin[] | null> => {
        try {
            console.log("Fetching admin data...");
            const response = await axios.get("/api/admin");
           
            return response.data;
        } catch (error) {
            console.error("Error fetching admin data:", error);
            return null;
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Store token in localStorage
                localStorage.setItem("token", tokenResponse.access_token);
                
                // Get user data from Google
                const userData = await GetAuthUserData(tokenResponse.access_token);
                console.log("User data:", userData);
                
                if (!userData || !userData.email) {
                    throw new Error("Failed to get user data from Google");
                }
                
                // Fetch admin data
                const adminData = await fetchAdminData();
                
                if (adminData && adminData.length > 0) {
                    // Check if the user's email exists in the admin list
                    const isAdmin = adminData.some(admin => admin.email === userData.email);
                    
                    if (isAdmin) {
                        // Save user data in context
                        login(userData);
                        
                        // Redirect to CMS page
                        router.replace('/CMS');
                    } else {
                        console.error("Access denied: Not an admin email");
                        setError("You don't have admin access. Your email is not on the approved list.");
                    }
                } else {
                    console.error("Admin list is empty or failed to fetch admin data");
                    setError("Authentication error: Admin list is empty or could not be retrieved");
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setError("Authentication failed. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        },
        onError: errorResponse => {
            console.error("Google login error:", errorResponse);
            setError("Google sign-in failed. Please try again.");
        },
    });

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="flex items-center flex-col justify-center gap-11 p-10 shadow-2xl">
        <Image src={"/digitalCube.png"} alt="logo" width={100} height={100}></Image>
        <div className="text-2xl">Sign in to CMS</div>
        <Button 
            onClick={() => googleLogin()} 
            disabled={isLoading}
        >
            {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
        {error && (
            <div className="text-red-500 mt-4 text-center">
                {error}
            </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
