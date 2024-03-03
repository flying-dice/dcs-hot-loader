---yml
homepage: https://github.com/flying-dice/dcs-hot-loader
name: DCS Hot Loader
description: A simple hook that allows for hot loading of lua scripts in DCS World using a HTTP REST API
authors:
    - Flying Dice
tags: 
    - modding
category: hooks
license: GNU General Public License v3.0
integration:
    admins:
        - JonathanTurnock
    type: github
    owner: flying-dice
    repo: dcs-hot-loader
---
## DCS Hot Loader

DCS Hot Loader is a tool to allow for hot loading of lua scripts in DCS World.

It exposes a REST API to allow for the execution of lua scripts.

## Installation

All that is required is to copy the `dcs-hot-loader.lua` into the `Scripts/Hooks` folder in your DCS Saved Games folder.

### Open Beta

```
%USERPROFILE%\Saved Games\DCS.openbeta\Scripts\Hooks\
```

### Stable

```
%USERPROFILE%\Saved Games\DCS\Scripts\Hooks\
```

## Usage

> To run the below tests, create a file called `hello-world.lua` in your `DCS\Scripts` folder with the following contents
>
> ```lua
> -- C:\Users\username\Saved Games\DCS.openbeta\Scripts\hello-world.lua
> if (log and log.info) then
>     log.info("Hello World!")
> else
>     print("Hello World!")
> end
> ```

The server will automatically start when you start DCS World.

To use the server, make a request to the following endpoint

```shell
curl --location 'http://127.0.0.1:7943/dofile' \
--header 'Content-Type: application/json' \
--data '{
    "path": "{WRITE_DIR}\\Scripts\\hello-world.lua",
    "target": "gui"
}'
```

### Target

The target parameter should be one of the following

- `gui` (GameGUI)
- `mission` (Mission Scripting Environment)

### Variables

The following variables are available for path replacements, ofc you can also use absolute paths

| Key         | Function           | Example                                                   |
| ----------- | ------------------ | --------------------------------------------------------- |
| WRITE_DIR   | `lfs.writedir()`   | `C:\\Users\\jonat\\Saved Games\\DCS.openbeta\\`           |
| INSTALL_DIR | `lfs.currentdir()` | `D:\\Program Files\\Eagle Dynamics\\DCS World OpenBeta\\` |
| TEMP_DIR    | `lfs.tempdir()`    | `C:\\Users\\jonat\\AppData\\Local\\Temp\\DCS.openbeta\\`  |

To get an active list of variables, make a request to the following endpoint

```shell
curl --location 'http://127.0.0.1:7943/health'
```

### Response

Once executed the response will be the resolved URL or any errors

> **Note:** When using the `mission` target, the response may not indicate errors with resolving the path, but you will receive an alert in mission

```json
{
  "status": "OK",
  "path": "C:/Users/username/Saved Games/DCS.openbeta//Scripts/hello-world.lua",
  "target": "gui"
}
```
