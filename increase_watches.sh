#!/bin/bash
# Increases the maximum number of file system watches
# This solves problems with automatic recompiling
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p