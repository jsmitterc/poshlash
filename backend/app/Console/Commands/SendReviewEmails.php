<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Sales;
use App\Models\Customers;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ServiceReviewTemplate;
use App\Models\EmailLogs;

class SendReviewEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-review-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $yesterday = Carbon::now()->subDay();
        $formattedDate = $yesterday->format('Y-m-d');
        $customers = Sales::select("store_customers.email", "store_customers.id")
                    ->join("store_customers", "store_sales.customer_id", "=", "store_customers.id")
                    ->whereDate("store_sales.fecha", $formattedDate)
                    ->groupBy("store_customers.email", "store_customers.id")
                    ->get()
                    ->toArray();
                    
        foreach ($customers as $customer){

            $result = EmailLogs::where([["customerId", $customer["id"]],["emailTypeId", 1]])->get();
            if (sizeof($result) > 0){
                echo $result;
                continue;
            }

            try {
                Mail::to($customer["email"])
                ->send(new ServiceReviewTemplate());

                EmailLogs::create([
                    "company" => 19,
                    "customerId" => $customer["id"],
                    "email" => $customer["email"],
                    "emailTypeId" => 1
                ]);
            }catch (\Swift_TransportException $e) {
                // Exception occurred during sending
                Log::error('Exception occurred while sending mail: ' . $e->getMessage());

                // You can handle the failure here (e.g., log, report, notify)
                echo 'Mail delivery failed. Check logs for details.';
            }
        }
        
        
    }
}
