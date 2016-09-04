[out:json][timeout:25];
// gather results
(
  // query part for: “highway=*”
  way["highway"="primary"]["maxspeed"!="30"]({{bbox}});
  way["highway"="secondary"]["maxspeed"!="30"]({{bbox}});
  way["highway"="unclassified"]["maxspeed"!="30"]({{bbox}});
  way["highway"="tertiary"]["maxspeed"!="30"]({{bbox}});
  way["highway"="trunk"]["maxspeed"!="30"]({{bbox}});
 
);
// print results
out body center;
>;
out skel qt;
