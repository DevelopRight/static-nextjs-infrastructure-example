#!/bin/bash
FOLDER_SRC=$1
S3_DEST=$2

aws s3 sync $FOLDER_SRC $S3_DEST