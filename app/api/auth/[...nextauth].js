import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";



export const authOptions = {
    providers : [
        GitHubProvider({
                clientId : 'Ov23liRqMNktlCVy1zk7',
                clientSecret: "de4f1d098cbb6c4314116318f3731e3b9f088c03"
        }),
    ],
}

export default NextAuth(authOptions);

