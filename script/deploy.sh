#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist travis@tools.adfc-hamburg.de:/var/www/html/tempo30/$TRAVIS_BRANCH
ssh travis@tools.adfc-hamburg.de "cd /var/www/html/tempo30/$TRAVIS_BRANCH ; nodejs update-overpass.js"