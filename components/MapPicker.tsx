"use client";

import { useEffect, useRef, useState } from "react";

type MapPickerProps = {
  onLocationSelect: (lat: number, lon: number, label: string) => void;
  locale: "en" | "ar";
};

export function MapPicker({ onLocationSelect, locale }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [mapReady, setMapReady] = useState(false);

  const copy =
    locale === "ar"
      ? {
          searchPlaceholder: "ابحث عن موقع",
          useCurrentLocation: "استخدام الموقع الحالي",
          clickOnMap: "انقر على الخريطة لتحديد الموقع",
        }
      : {
          searchPlaceholder: "Search for location",
          useCurrentLocation: "Use Current Location",
          clickOnMap: "Click on map to select location",
        };

  useEffect(() => {
    if (typeof window !== "undefined" && !mapReady) {
      // Initialize OSM map using Leaflet CDN
      const leafletCss = document.getElementById("leaflet-css");
      if (!leafletCss) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(link);
      }

      const leafletScript = document.getElementById("leaflet-script");
      if (!leafletScript) {
        const script = document.createElement("script");
        script.id = "leaflet-script";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = () => {
          initializeMap();
          setMapReady(true);
        };
        document.head.appendChild(script);
      } else {
        initializeMap();
        setMapReady(true);
      }
    }
  }, [mapReady]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([20, 0]).addTo(map);

    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    });

    // Store map instance for later use
    (mapRef.current as any).mapInstance = map;
    (mapRef.current as any).marker = marker;
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const L = (window as any).L;
        const map = (mapRef.current as any).mapInstance;
        const marker = (mapRef.current as any).marker;

        if (map && marker && L) {
          map.setView([latitude, longitude], 15);
          marker.setLatLng([latitude, longitude]);
          onLocationSelect(latitude, longitude, `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
      },
      () => {
        alert(locale === "ar" ? "تعذر الوصول إلى الموقع" : "Unable to access location");
      },
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}&limit=1`
      );
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const L = (window as any).L;
        const map = (mapRef.current as any).mapInstance;
        const marker = (mapRef.current as any).marker;

        if (map && marker && L) {
          map.setView([parseFloat(lat), parseFloat(lon)], 15);
          marker.setLatLng([parseFloat(lat), parseFloat(lon)]);
          onLocationSelect(parseFloat(lat), parseFloat(lon), display_name);
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="map-picker-container">
      <form className="map-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="map-search-input"
        />
        <button type="button" onClick={handleCurrentLocation} className="map-current-location-btn">
          {copy.useCurrentLocation}
        </button>
      </form>
      <div ref={mapRef} className="map-container" title={copy.clickOnMap} />
    </div>
  );
}
