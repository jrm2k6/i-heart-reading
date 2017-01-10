#!/bin/bash
mysql -u root -e "create database i-heart-reading-test";
cp .env.testing .env
php artisan migrate
./vendor/bin/phpunit tests/unit/.
