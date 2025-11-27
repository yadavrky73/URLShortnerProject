import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import { Button } from "@/shadcn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import PageHeading from "@/Components/PageHeading";
import {
    BarChartGraph,
    CustomPieChart,
    LineGraph,
} from "@/Components/Charts/Index";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    Check,
    ContactIcon,
    IndianRupeeIcon,
    MinusCircle,
    PlusCircle,
} from "lucide-react";
import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import { format } from "date-fns";
import MultipleSelector from "@/shadcn/ui/MultiSelector";
import { Badge } from "@/shadcn/ui/badge";

export default function Dashboard({
    auth
}) {
    const [dashboardData, dashboardDataSet] = React.useState({
        
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Hi {auth.user.full_name}, Welcome back 
                        </PageHeading.Title>
                        <PageHeading.Actions></PageHeading.Actions>
                    </PageHeading>
                   
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
