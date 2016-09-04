#!/bin/bash
WEBDIR="/var/www/html/tempo30/master/"
MAPSERVER="/opt/mapserver/maps/t30/"
URL=http://download.geofabrik.de/europe/germany/hamburg-latest.shp.zip
FILE=$(basename $URL)

cd ${WEBDIR}
nodejs update-overpass.js

cd ${MAPSERVER}

MD5OLD=$(md5sum hamburg-latest.shp.zip )
wget -N $URL 
MD5NEW=$(md5sum hamburg-latest.shp.zip )

if [ "${MD5OLD}" != "${MD5NEW}" ] ; then
    unzip -uo $FILE roads.cpg roads.dbf roads.prj roads.shp roads.shx
fi
