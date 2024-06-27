#!/bin/bash

# Define the base URL and host header
BASE_URL="http://10.164.0.13"
HOST_HEADER="Host: tesourosperdidos.me"

# GET Request - List of Lost Objects
echo "-------------------"
echo "GET Request - List of Lost Objects"
curl -H "$HOST_HEADER" "$BASE_URL/lostobjects/"
echo "-------------------"

# GET Request - Specific Lost Object by ID
echo "-------------------"
echo "GET Request - Specific Lost Object by ID"
curl -H "$HOST_HEADER" "$BASE_URL/lostobjects/1/"
echo "-------------------"

# POST Request - Create a New Lost Object
echo "-------------------"
echo "POST Request - Create a New Lost Object"
curl -X POST -H "$HOST_HEADER" -H "Content-Type: application/json" -d '{"name": "Item Name", "description": "Item Description"}' "$BASE_URL/lostobjects/"
echo "-------------------"

# PUT Request - Update an Existing Lost Object
echo "-------------------"
echo "PUT Request - Update an Existing Lost Object"
curl -X PUT -H "$HOST_HEADER" -H "Content-Type: application/json" -d '{"name": "Updated Item Name", "description": "Updated Item Description"}' "$BASE_URL/lostobjects/1/"
echo "-------------------"

# DELETE Request - Delete a Lost Object
echo "-------------------"
echo "DELETE Request - Delete a Lost Object"
curl -X DELETE -H "$HOST_HEADER" "$BASE_URL/lostobjects/1/"
echo "-------------------"

# GET Request - List of Found Objects
echo "-------------------"
echo "GET Request - List of Found Objects"
curl -H "$HOST_HEADER" "$BASE_URL/foundobjects/"
echo "-------------------"

# GET Request - Specific Found Object by ID
echo "-------------------"
echo "GET Request - Specific Found Object by ID"
curl -H "$HOST_HEADER" "$BASE_URL/foundobjects/1/"
echo "-------------------"

# POST Request - Create a New Found Object
echo "-------------------"
echo "POST Request - Create a New Found Object"
curl -X POST -H "$HOST_HEADER" -H "Content-Type: application/json" -d '{"name": "Item Name", "description": "Item Description"}' "$BASE_URL/foundobjects/"
echo "-------------------"

# PUT Request - Update an Existing Found Object
echo "-------------------"
echo "PUT Request - Update an Existing Found Object"
curl -X PUT -H "$HOST_HEADER" -H "Content-Type: application/json" -d '{"name": "Updated Item Name", "description": "Updated Item Description"}' "$BASE_URL/foundobjects/1/"
echo "-------------------"

# DELETE Request - Delete a Found Object
echo "-------------------"
echo "DELETE Request - Delete a Found Object"
curl -X DELETE -H "$HOST_HEADER" "$BASE_URL/foundobjects/1/"
echo "-------------------"
