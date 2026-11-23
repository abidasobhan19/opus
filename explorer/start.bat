@echo off
echo Opening Tryckeriett database explorer at http://127.0.0.1:8787
start "" http://127.0.0.1:8787
php -S 127.0.0.1:8787 -t "%~dp0"
