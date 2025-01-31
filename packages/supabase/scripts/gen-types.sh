#!/bin/bash

source .env

echo $PROJECT_ID

npx supabase gen types typescript --project-id $PROJECT_ID > types/database.ts
