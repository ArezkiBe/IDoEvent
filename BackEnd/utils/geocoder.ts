import nodeGeocoder from "node-geocoder";

const options: any = {
    provider: "mapquest",
    httpAdapter : 'https',
    apiKey: '5Axogj1njQ7sFEkrFpdXGmshiU0jgVj2', 
    formater: null 
};
  const geocoder = nodeGeocoder(options);
  
  export default geocoder;
