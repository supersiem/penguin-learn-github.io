#!/bin/bash
rm -r custom-framework-tests
uglifyjs custom_framework.js -c -o custom_framework.min.js
git add .
git commit -m "auto build please see the release notes"
git push