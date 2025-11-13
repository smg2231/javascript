import fetch from 'node-fetch';

class ISSLocator {
  constructor() {
    this.data = null;
  }

  async locate() {
    try {
      // Using a reliable ISS API
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();

      // wheretheiss.at returns fields like latitude, longitude, timestamp
      const timestamp = Math.floor(json.timestamp);
      const latitude = parseFloat(json.latitude);
      const longitude = parseFloat(json.longitude);

      // Optional mock country based on coordinates
      const country = this.#mockCountry(latitude, longitude);

      this.data = {
        timestamp,
        latitude,
        longitude,
        country,
        message: 'success'
      };

      // Return a simple coordinate object
      return { lat: latitude, lon: longitude };
    } catch (error) {
      console.error('Error locating ISS:', error.message);
      this.data = null;
      return { error: error.message };
    }
  }

  latitude() { return this.data?.latitude ?? null; }
  longitude() { return this.data?.longitude ?? null; }
  timestamp() { return this.data?.timestamp ?? null; }

  timestampHumanReadable() {
    if (!this.data) return null;
    return new Date(this.data.timestamp * 1000)
      .toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  }

  country() { return this.data?.country ?? 'Unknown'; }

  // Simple mock (for demo) — you can replace with real reverse geocoding later
  #mockCountry(lat, lon) {
    if (lat > 20 && lat < 40 && lon > 50 && lon < 60) return 'United Arab Emirates';
    if (lat > 30 && lat < 60 && lon > -10 && lon < 40) return 'Europe';
    if (lat < -30 && lon > 100) return 'Australia';
    return 'Over Ocean';
  }
}

// Example usage
(async () => {
  const sensor = new ISSLocator();
  const pos = await sensor.locate();

  if (pos.error) {
    console.log('Could not fetch ISS position');
  } else {
    console.log('Location:', pos);
    console.log('Latitude:', sensor.latitude());
    console.log('Longitude:', sensor.longitude());
    console.log('Timestamp:', sensor.timestamp());
    console.log('Human Time:', sensor.timestampHumanReadable());
    console.log('Country:', sensor.country());
  }
})();
