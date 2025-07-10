import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [

    layout('routes/auth/guest-layout.tsx', [

        index("routes/home.tsx"),
        route('sign-in', 'routes/auth/sign-in.tsx'),
        route('sign-up', 'routes/auth/sign-up.tsx'),

    ]),

    // Admin routes (protected)
    layout('routes/admin/admin-layout.tsx', [
        ...prefix("admin", [
            route('home', 'routes/admin/index.tsx'),

            ...prefix("exercises", [
                index('routes/admin/exercises/all-exercises.tsx'),
                route('create', 'routes/admin/exercises/create-exercise.tsx'),

            ])])
    ]),

    route('*', 'routes/not-found.tsx')

] satisfies RouteConfig;
