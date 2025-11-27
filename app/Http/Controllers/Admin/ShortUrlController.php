<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\ShortUrl;
use App\Models\Company;
use App\Http\Resources\ShortUrlResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShortUrlController extends Controller
{
   
    public function index(Request $request)
    {
        $user = Auth::user();
       

        if ($user->hasRole('super_admin')) {
            // return back()->with([
            //     'flash_type' => 'error',
            //     'flash_message' => 'Not allowed',
            //     'flash_description' => 'SuperAdmin cannot view all short URLs.'
            // ]);
             $shortUrls = ShortUrl::latest()
                ->paginate($request->get('limit', config('app.pagination_limit')))
                ->withQueryString();
            return Inertia::render('Admin/ShortUrls/ShortUrls', ['shortUrls' => ShortUrlResource::collection($shortUrls)]);

        }

        if ($user->hasRole('admin')) {
           //dd($user->id);
            $shortUrls = ShortUrl::latest()
                ->paginate($request->get('limit', config('app.pagination_limit')))
                ->withQueryString();
            return Inertia::render('Admin/ShortUrls/ShortUrls', ['shortUrls' => ShortUrlResource::collection($shortUrls)]);

        } else if ($user->hasRole('member')) {
            $shortUrls = ShortUrl::where('created_by', $user->id)
                ->latest()
                ->paginate($request->get('limit', config('app.pagination_limit')))
                ->withQueryString();
                        return Inertia::render('Admin/ShortUrls/ShortUrls', ['shortUrls' => ShortUrlResource::collection($shortUrls)]);

        } else {
            return back()->with([
                'flash_type' => 'error',
                'flash_message' => 'Not allowed',
                'flash_description' => 'You do not have permission to view short URLs.'
            ]);
        }

        return Inertia::render('Admin/ShortUrls/ShortUrls', [
            'shortUrls' => ShortUrlResource::collection($shortUrls)
        ]);
    }
    public function create()
    {
        $companies = Company::all();
        return Inertia::render('Admin/ShortUrls/ShortUrl',['companies' => $companies]);
    }


    public function edit($id)
    {
        $shortUrl = ShortUrl::findOrFail($id);

        $shortUrlResource = new ShortUrlResource($shortUrl);
        $shortUrlResource->wrap(null);
        $companies = Company::all();
        return Inertia::render('Admin/ShortUrls/ShortUrl', [
            'shortUrl' => $shortUrlResource,
            'companies' => $companies
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (
            $user->hasRole('SuperAdmin') ||
            $user->hasRole('Admin') ||
            $user->hasRole('Member') ||
            $user->hasRole('Sales') ||
            $user->hasRole('Manager')
        ) {
            return back()->with([
                'flash_type'   => 'error',
                'flash_message' => 'Creation blocked',
                'flash_description' => 'You are not allowed to create short URLs.'
            ]);
        }

        $request->validate([
            'original_url' => 'required|url'
        ]);

        $slug = substr(md5(uniqid()), 0, 6);
        $token = bin2hex(random_bytes(32));

        $shortUrl = ShortUrl::create([
            'slug'         => $slug,
            'original_url' => $request->original_url,
            'created_by'   => $user->id,
            'company_id'   => $user->company_id,
            'resolve_token'=> $token,
        ]);

        return redirect()->route('admin.shortUrls.edit', $shortUrl->id)
            ->with([
                'flash_type' => 'success',
                'flash_message' => 'Short URL created successfully',
                'flash_description' => 'Slug: ' . $shortUrl->slug
            ]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        return back()->with([
            'flash_type' => 'error',
            'flash_message' => 'Update blocked',
            'flash_description' => 'Short URLs cannot be updated.'
        ]);
    }
}

