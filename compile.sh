#!/bin/bash
echo "remove test stuff"
rm -r custom-framework-tests
echo "build minified version" 
uglifyjs custom_framework.js -c -o custom_framework.min.js
echo "comit and push"
git add .
git commit -m "auto build please see the release notes"
git push