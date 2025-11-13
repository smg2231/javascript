class ISSLocator {
  constructor() {
    this.data = null;
  }

  async locate() {
    try {
      // Fetch data from the real ISS API
      const response = await fetch('https://api.open-notify.org/iss-now.json');
      const json = await response.json();

      if (json.message !== 'success') {
        throw new Error('Failed to fetch ISS position');
      }

      const timestamp = json.timestamp;
      const latitude = parseFloat(json.iss_position.latitude);
      const longitude = parseFloat(json.iss_position.longitude);

      // Optional: You could use a reverse geocoding API here for `country()`
      // For now we’ll mock it:
      const country = this.#mockCountry(latitude, longitude);

      this.data = { timestamp, latitude, longitude, country, message: json.message };
      return { lat: latitude, lon: longitude };

    } catch (error) {
      console.error('Error locating ISS:', error.message);
      this.data = null;
      return { error: error.message };
    }
  }

  latitude() {
    return this.data?.latitude ?? null;
  }

  longitude() {
    return this.data?.longitude ?? null;
  }

  timestamp() {
    return this.data?.timestamp ?? null;
  }

  timestampHumanReadable() {
    if (!this.data) return null;
    return new Date(this.data.timestamp * 1000)
      .toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  }

  country() {
    return this.data?.country ?? 'Unknown';
  }

  // Mock function to simulate country lookup
  #mockCountry(lat, lon) {
    if (lat > 20 && lat < 40 && lon > 50 && lon < 60) return 'United Arab Emirates';
    return 'Over Ocean';
  }
}

// Usage Example
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
