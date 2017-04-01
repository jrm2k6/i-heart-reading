<?php

namespace App\Providers;

use App\Repositories\BookProviderRepositoryInterface;
use App\Repositories\GoogleBookAPIRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(BookProviderRepositoryInterface::class, GoogleBookAPIRepository::class);
    }
}
