import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default async function logoutFunction() {
    const router = useRouter();
    await signOut();
    router.push("/");
}
