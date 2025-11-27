export const navItems = [
    {
        title: "Dashboard",
        href: route("admin.dashboard"),
        icon: "dashboard",
        label: "Dashboard",
    },

    {
        title: "Companies",
        href: "#",
        icon: "folder",
        label: "Companies",
        permit: "view companies|create companies|edit companies",
        items: [
            {
                title: "Add Company",
                href: route("admin.companies.create"),
                icon: "userRoundPlus",
                label: "Add Company",
                permit: "create companies",
            },
            {
                title: "All Company",
                href: route("admin.companies.index"),
                icon: "list",
                label: "All Companies",
                permit: "view companies",
            },
        ],
    },
    {
        title: "ShortUrl",
        href: "#",
        icon: "folder",
        label: "ShortUrls",
        permit: "view short_urls|create short_urls|edit short_urls",
        items: [
            {
                title: "Add shortUrl",
                href: route("admin.shortUrls.create"),
                icon: "userRoundPlus",
                label: "Add shortUrl",
                permit: "create short_urls",
            },
            {
                title: "All shortUrls",
                href: route("admin.shortUrls.index"),
                icon: "list",
                label: "All shortUrls",
                permit: "view short_urls",
            },
        ],
    },


    {
        title: "Users",
        href: "#",
        icon: "users",
        label: "Users",
        permit: "view users|create users|edit users",
        items: [
            {
                title: "Add User",
                href: route("admin.users.create"),
                icon: "userRoundPlus",
                label: "Add User",
                permit: "create users",
            },
            {
                title: "All User",
                href: route("admin.users.index"),
                icon: "list",
                label: "All User",
                permit: "view users",
            },
        ],
    },
    {
        title: "Roles",
        href: "#",
        icon: "users",
        label: "Roles",
        permit: "view roles|create roles|edit roles",
        items: [
            {
                title: "Add Role",
                href: route("admin.roles.create"),
                icon: "userRoundPlus",
                label: "Add User",
                permit: "create roles",
            },
            {
                title: "All Roles",
                href: route("admin.roles.index"),
                icon: "list",
                label: "All Roles",
                permit: "view roles",
            },
        ],
    },
    
  
];
