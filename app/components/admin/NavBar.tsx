
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { LogoutButton } from "../features/auth"

const NavBar = () => {
    return (
        <nav className="flex p-4 items-center justify-between">
            collapseButton

            <div className="flex items-center gap-4">
                <Link to='/dashboard'>
                    Dashboard
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel className="m-3">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="m-3">
                            <User className="h-[1.rem] w-[1.2rem] mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="m-3">
                            <Settings className="h-[1.rem] w-[1.2rem] mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" className="m-3">
                            <LogOut className="h-[1.rem] w-[1.2rem] mr-2" />
                            <LogoutButton>Logout</LogoutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    )
}

export default NavBar
