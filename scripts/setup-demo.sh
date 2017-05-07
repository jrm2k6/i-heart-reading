#!/bin/bash

if [ -z "$DB_USERNAME" ];
then
    echo "No DB_USERNAME set! Exiting now.."
    exit 1
fi

if [ -z "$DB_PASSWORD" ];
then
    echo "No DB_PASSWORD set! Exiting now.."
    exit 1
fi

mysql -u root -e "drop database demoiheartreading";
mysql -u root -e "create database demoiheartreading";

php artisan migrate
php artisan db:seed --class=DemoDatabaseSeeder

mysql -u $DB_USERNAME -p$DB_PASSWORD demoiheartreading < ./database/sql-seeds/demo-seeds.sql