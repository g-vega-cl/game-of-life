'use client';
import { useAuth } from "@/app/context/AuthContext";


const Navbar = () => {
    const { user } = useAuth();
    
    return (
        // TODO, this is just a placeholder
        // Will delete and make a proper navbar later
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">{user?.id}</span>
            </div>
        </nav>
    )
}

export default Navbar;