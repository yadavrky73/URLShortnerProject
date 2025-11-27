import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { MoreHorizontal, Pencil, PlusCircle } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

   
    {
        accessorKey: "slug",
        header: "Slug",
    },

    
    {
        accessorKey: "original_url",
        header: "Original URL",
        cell: ({ row }) => (
            <a
                href={row.original.original_url}
                className="text-blue-600 underline"
                target="_blank"
            >
                {row.original.original_url}
            </a>
        ),
    },

    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const item = row.original;

            return (
                <div className="text-right">
                    <Can permit="edit short_urls">
                        <Button asChild variant="outline" size="icon">
                            <Link href={route("admin.shortUrls.edit", item.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(item.slug)
                                }
                            >
                                Copy Slug
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        item.original_url
                                    )
                                }
                            >
                                Copy Original URL
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function ShortUrls({ shortUrls }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Short URLs</title>
            </Head>

            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Short URLs ({shortUrls.meta.total})
                        </PageHeading.Title>

                        <PageHeading.Actions>
                            <Can permit="create short_urls">
                                <Button asChild>
                                    <Link href={route("admin.shortUrls.create")}>
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Create New
                                    </Link>
                                </Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>

                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={shortUrls.data}
                            columns={columns}
                            searchColumns={["slug", "original_url"]}
                            paginationLinks={shortUrls.links}
                            meta={shortUrls.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
