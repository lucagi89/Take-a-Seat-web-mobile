import React, { useRef } from "react";
import Map from "./map";

export default function PersistentMap() {
  const mapRef = useRef<JSX.Element | null>(null);

  if (!mapRef.current) {
    mapRef.current = <Map />;
  }

  return mapRef.current;
}
