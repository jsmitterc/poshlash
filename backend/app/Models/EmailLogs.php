<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLogs extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $fillable = ['company', 'customerId', 'email',"emailTypeId"];
    protected $table = 'email_logs';
}
