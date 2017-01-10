#!/bin/bash

cp .env.testing .env
php artisan migrate
./vendor/bin/phpunit tests/unit/.
