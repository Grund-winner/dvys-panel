FROM php:8.2-apache

COPY php-render/ /var/www/html/

EXPOSE 80