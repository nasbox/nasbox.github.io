# NAS System Documentation

## Overview
This document provides an overview of the NAS (Network Attached Storage) system, its setup, and usage.

## Hardware Components
- **Processor:** Intel i5
- **RAM:** 8GB DDR4
- **Storage:** 2TB HDD, 1TB SSD
- **Network Interface:** Gigabit Ethernet and WiFi

## Software Components
- **Operating System:** Debian with OpenMediaVault (OMV)
- **File System:** [e.g., ZFS, ext4]
- **Additional Software:** [e.g., Plex, Nextcloud]

## Network Configuration
- **IP Address:** 172.10.20.5:81 (DHCP)
- **Subnet Mask:** [e.g., 255.255.255.0]
- **Gateway:** [e.g., 172.10.20.1]

## Setup Instructions

1. **Install Debian:**
   - Download the latest Debian ISO.
   - Create a bootable USB drive.
   - Boot from the USB and follow the installation prompts.

2. **Install OpenMediaVault (OMV):**
   - After installing Debian, open a terminal.
   - Run the following commands:
     ```sh
     wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/install | sudo bash
     ```

3. **Configure OMV:**
   - Access the OMV web interface via `http://172.10.20.5:81` in your browser.
   - Follow the setup wizard to configure storage, users, and shared folders.

## Usage

1. **Accessing Shared Folders:**
   - From a Windows PC, open File Explorer and enter `\\172.10.20.5` in the address bar.
   - From a Mac, open Finder and select "Go" > "Connect to Server" and enter `smb://172.10.20.5`.

2. **Managing Files:**
   - Use the OMV web interface to create and manage shared folders.
   - Install additional plugins for more functionality, such as Plex for media streaming or Nextcloud for cloud storage. This can be done by accessing the github repos of such plugins and linking to the NAS using _ssh. (Contact the admin)

3. **Remote Access:**
   - Access this NAS repo remotely via `https://nasbox.vercel.app`.
   - Ensure your router is configured for port forwarding if needed.
   - Use a VPN for secure remote access. We suggest OpenVPN or CloudFlare

## Maintenance
- **Regular Backups:** Ensure important data is backed up regularly.
- **Software Updates:** Keep Debian and OMV updated for security and performance improvements.
- **Monitoring:** Use OMV's monitoring tools to keep an eye on system health and storage usage.
