@echo off
echo Starting process...
echo.
:EnterName
Set Process=ragemp-server.exe
IF NOT EXIST %Process% GOTO EnterName
:begin
start /wait /b /D .\vehicleDlcNames VehiclesDlc.exe ..\client_packages\game_resources\dlcpacks ..\client_packages\vspawner\dlcVehicleNames.js
title Process %Process% control
tasklist | findstr %Process%
if errorlevel 1 goto NoProcess
echo Result: Process run
goto Done
:NoProcess
%Process%
echo Result: Process %Process% stop %time%
:Done
echo.
goto begin
pause
exit