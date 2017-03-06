#!/bin/bash
mysql -u root -e "drop database testing";
mysql -u root -e "create database testing";
cp .env.testing .env
php artisan migrate
./vendor/bin/phpunit tests/unit/.
