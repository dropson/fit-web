import { ChevronUp, Dumbbell, Home, User, Users } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '../ui/sidebar'
import { Link, NavLink } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { cn } from '~/lib/utils'
import { useAuthState } from '~/stores/authStore'
import { LogoutButton } from '../features/auth'

const base = '/admin';

const items = [
    { title: 'Home', url: `${base}/home`, icon: Home },
    { title: 'Exercises', url: `${base}/exercises`, icon: Dumbbell },
    { title: 'Users', url: `${base}/users`, icon: Users }
]

const AdminSidebar = () => {

    const { user } = useAuthState();

    return (
        <Sidebar className='overflow-hidden'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to='admin/home'>
                                <Dumbbell />
                                <span> Fit Revolution</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} key={item.url}
                                        >
                                            {({ isActive }: { isActive: boolean }) => (
                                                <div className={cn('flex items-center gap-3 w-full m-2 rounded-md', {
                                                    'bg-primary !text-white': isActive
                                                })} >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </div>
                                            )}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User /> {user?.fullName} <ChevronUp className='ml-auto' />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top"
                                className="w-full" >
                                <DropdownMenuItem> Account</DropdownMenuItem>
                                <DropdownMenuItem> Setting</DropdownMenuItem>
                                <DropdownMenuItem> <LogoutButton>Sign out</LogoutButton> </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSidebar
