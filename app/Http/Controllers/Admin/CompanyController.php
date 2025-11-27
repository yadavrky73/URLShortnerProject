<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PersonTitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Company;
use App\Http\Resources\CompanyResource;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $companies = Company::select('id', 'name')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Companies/Companies', ['companies' => CompanyResource::collection($companies)]);
    }

    public function create()
    {
        return Inertia::render('Admin/Companies/Company');
    }

    public function edit($id)
    {
        $company = Company::findOrFail($id);
        
        $companyResource = new CompanyResource($company);
        $companyResource->wrap(null);
        return Inertia::render('Admin/Companies/Company',['company' => $companyResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $company = Company::create($request->all());

        return redirect()->route('admin.companies.edit', $company->id)->with(['flash_type' => 'success', 'flash_message' => 'Page created successfully', 'flash_description' => $company->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
        $company = Company::findOrFail($id);
        $company->fill($request->all());
        $company->save();
        $company->refresh();
        return redirect()->route('admin.companies.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Page updated successfully', 'flash_description' => $companies->name]);
    }
}
