# Devkit

The Devkit scripts are a set of scripts that help you to develop and test your
application locally.

## Prerequisites

The dependencies of the DevKit transitively include node-pty which must be built with
node-gyp during npm install. Please check out the documentation of node-gyp on
how to provide the necessary C/C++ compiler environment on your operating system.

**NOTE:** Under non-Windows installations, the dependencies are commonly installed
either as a matter of course with the Operating System or have probably been installed
previously due to them all being common dependencies for other dev tools. I would
recommend running the `pnpm run devkit` command first before doing anything below,
you may find it already works.

### MacOS

Install the "Command Line Tools" under "Preferences > Downloads" in Xcode.

### Windows

Open an elevated cmd.exe and run the commands `npm install --global windows-build-tools`
and `npm config set msvs_version 2015 --global`

### Windows Subsystem for Linux (WSL)

Run the commands `sudo apt-get update and sudo apt-get install -y python make build-essential`

Note: These instructions presume you are using the Ubuntu distro for WSL. For
instructions on how to use other distros, please consult that distros package
managment instructions.
