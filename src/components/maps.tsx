import React from 'react';
import Iframe from 'react-iframe'


export function GoogleMapEmbed() {
    return (
        <div className="mapouter">
            <div className="gmap_canvas">
                <Iframe 
                    url="https://maps.google.com/maps?q=stranero%20berlin&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
          </div>
      </div>
    );
}