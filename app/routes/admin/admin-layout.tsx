
import { Outlet } from "react-router"
import { NavBar, AdminSidebar } from "~/components"
import ProtectedRoute from "~/components/routing/ProtectedRoute"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

const Layout = () => {
    return (
        <ProtectedRoute roles={['admin', 'moderator']}>
        <div className="flex">
            <SidebarProvider >
                  <AdminSidebar />
                <main className="w-full">
                 <SidebarTrigger/>
                    <NavBar />
                    <div className="px-4">
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </div>
        </ProtectedRoute>
    )
}

export default Layout
