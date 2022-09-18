#!/bin/sh
rm -rf _website/_sources
rsync -avz --delete _website/ remote:/home/user/blog