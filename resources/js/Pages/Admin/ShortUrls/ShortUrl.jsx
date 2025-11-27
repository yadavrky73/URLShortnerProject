import { Button } from "@/shadcn/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { PencilLine, PlusCircle } from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import Can from "@/Components/Can";

export default function ShortUrl({ shortUrl, companies }) {
    const { data, setData, post, processing, errors } = useForm({
        slug: shortUrl ? shortUrl.slug : "",
        original_url: shortUrl ? shortUrl.original_url : "",
        company_id: shortUrl ? shortUrl.company_id : "",
        resolve_token: shortUrl ? shortUrl.resolve_token : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (shortUrl) {
            post(route("admin.shortUrls.update", shortUrl.id));
        } else {
            post(route("admin.shortUrls.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>
                    {shortUrl ? `Edit Short URL - ${shortUrl.slug}` : "Create Short URL"}
                </title>
            </Head>

            
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {shortUrl ? (
                            <div className="flex items-center gap-x-3">
                                <PencilLine />
                                Edit: {shortUrl.slug}
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-3">
                                <PlusCircle />
                                Create Short URL
                            </div>
                        )}
                    </PageHeading.Title>

                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.shortUrls.index")}>Cancel</Link>
                        </Button>

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
            </TwoColumnLayout.Heading>

          
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Main>
                    <form onSubmit={submit}>
                        <ShadcnCard title="Short URL Details" className="space-y-4">

                            
                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    className="mt-1 block w-full"
                                    placeholder="example-slug"
                                    onChange={(e) => setData("slug", e.target.value)}
                                />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>

                            {/* Original URL */}
                            <div>
                                <Label htmlFor="original_url">Original URL</Label>
                                <Input
                                    id="original_url"
                                    type="text"
                                    name="original_url"
                                    value={data.original_url}
                                    className="mt-1 block w-full"
                                    placeholder="https://example.com/long-url"
                                    onChange={(e) => setData("original_url", e.target.value)}
                                />
                                <InputError
                                    message={errors.original_url}
                                    className="mt-2"
                                />
                            </div>

                           
                            <div>
                                <Label htmlFor="company_id">Company (Optional)</Label>
                                <select
                                    id="company_id"
                                    name="company_id"
                                    value={data.company_id || ""}
                                    className="mt-1 block w-full border rounded h-10 px-2"
                                    onChange={(e) => setData("company_id", e.target.value)}
                                >
                                    <option value="">Select company</option>
                                    {companies?.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.company_id} className="mt-2" />
                            </div>

                           
                            <div>
                                <Label htmlFor="resolve_token">Resolve Token</Label>
                                <Input
                                    id="resolve_token"
                                    type="text"
                                    name="resolve_token"
                                    disabled={shortUrl ? false : true}
                                    value={data.resolve_token}
                                    className="mt-1 block w-full"
                                    placeholder="(auto generated)"
                                    onChange={(e) =>
                                        setData("resolve_token", e.target.value)
                                    }
                                />
                                <InputError message={errors.resolve_token} className="mt-2" />
                            </div>
                        </ShadcnCard>

                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button disabled={processing} className="w-[220px]">
                                    Submit
                                </Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>

                
                <TwoColumnLayout.Aside>
                    {shortUrl && (
                        <ShadcnCard title="Short URL Information">
                            <p><strong>Slug:</strong> {shortUrl.slug}</p>
                            <p><strong>Original URL:</strong> {shortUrl.original_url}</p>
                            <p><strong>Resolve Token:</strong> {shortUrl.resolve_token}</p>
                            <p><strong>Company ID:</strong> {shortUrl.company_id ?? "None"}</p>
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
