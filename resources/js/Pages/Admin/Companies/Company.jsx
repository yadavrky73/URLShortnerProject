import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import EditorInput from "@/Components/EditorInput";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    MoreHorizontal,
    PencilLine,
    PlusCircle,
    Share2Icon,
    
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import Can from "@/Components/Can";

export default function company({ company }) {
    const [name, nameSet] = React.useState(company ? company.name : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: company ? company?.name : "",
       
    });
    {console.log('company', company)}

    const submit = (e) => {
        e.preventDefault();

        if (company) {
            post(route("admin.companies.update", { id: company.id }));
        } else {
            post(route("admin.companies.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    company ? "Edit Company - " + company.name : "Create"
                } company`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {company ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                {company.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add company
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.companies.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create companies">
                            <Button asChild>
                                <Link href={route("admin.companies.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                        
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {company ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.companies.edit", company.id)}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-4"></div>
                </div>
            </TwoColumnLayout.Heading>
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Main>
                    <form onSubmit={submit}>
                        <ShadcnCard
                            className="space-y-4"
                            title="General"
                            description={<></>}
                        >
                                <div>
                                    <Label htmlFor="first_name">
                                       Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Enter  name..."
                                        onChange={(e) => {
                                            setData(
                                                "name",
                                                e.target.value
                                            );
                                        }}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                
                           
                           
                        </ShadcnCard>
                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    {company && (
                        <ShadcnCard
                            title={`${company.name} ${company.name}`}
                        >
                            
                            
                
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
