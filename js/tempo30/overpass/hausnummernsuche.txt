[out:json][timeout:25];
// gather results
(
  node["addr:housenumber"]["addr:street"="STRASSE"]["addr:city"="Hamburg"];
  way["addr:housenumber"]["addr:street"="STRASSE"]["addr:city"="Hamburg"];
);
// print results
out tags center;
