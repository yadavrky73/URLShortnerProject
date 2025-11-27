<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShortUrl extends Model
{
    protected $fillable = ['slug','original_url','created_by','company_id','resolve_token'];

    public function creator() { 
        return $this->belongsTo(User::class, 'created_by'); 
    }
    public function company() { 
        return $this->belongsTo(Company::class); 
    }

    public function scopeNotInCompany($q, $companyId) {
        return $q->where(function($sub) use($companyId){
            $sub->whereNull('company_id')->orWhere('company_id','!=',$companyId);
        });
    }
    
    public function scopeNotCreatedBy($q, $userId) {
        return $q->where('created_by','!=',$userId);
    }
}
