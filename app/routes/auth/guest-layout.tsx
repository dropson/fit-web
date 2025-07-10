import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import GuestRoute from '~/components/routing/GuestRoute'
import { cn } from '~/lib/utils'


const items = [
    { title: 'Home', url: '/' },
    { title: 'Sign in', url: '/sign-in' },
    { title: 'Sign up', url: '/sign-up' },
]

const GuestLayout = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <GuestRoute>
            <div className='bg-white'>
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer"
                            >
                                <span className="sr-only">Open main menu</span>
                                Menu
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {items.map((item) => (
                                <NavLink to={item.url} key={item.url}
                                >
                                    {({ isActive }: { isActive: boolean }) => (
                                        <div className={cn('text-sm/6 font-semibold text-gray-900 transition-all', {
                                            'text-primary': isActive
                                        })} >
                                            {/* <item.icon /> */}
                                            <span>{item.title}</span>
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                    </nav>
                    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                        <div className="fixed inset-0 z-50" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-8 w-auto"
                                    />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Close menu</span>
                                    Close
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {items.map((item) => (
                                            <NavLink to={item.url} key={item.url}
                                            >
                                                {({ isActive }: { isActive: boolean }) => (
                                                    <div className={cn('text-sm/6 font-semibold text-gray-900 transition-all', {
                                                        'underline': isActive
                                                    })} >
                                                        {/* <item.icon /> */}
                                                        <span>{item.title}</span>
                                                    </div>
                                                )}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </header>

                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <Outlet />
                </div>
            </div>
        </GuestRoute>
    )
}

export default GuestLayout
