module.export = class NREL {
    constructor() {
        this.api_key = 'C3m3HqjHGN2Swrd8YSbB23jsTEirVKytinsFDnNu';
        this.authorization_string = `api_key=${ this.api_key }`;
        this.base_URL = 'https://developer.nrel.gov';
        this.URL_object = {
            solar_query: '/api/solar/data_query/v1',
            solar_resource: '/api/solar/solar_resource/v1',
            pvWatts: '/api/pvwatts/v6',
            pvdaq_site_data: '/api/pvdaq/v3/site_data',
            pvdaq_data_file: '/api/pvdaq/v3/data_file',
            pvday_sites: '/api/pvdaq/v3/sites',
            utility_rates: '/api/utility_rates/v3',
            utility_census: '/api/census_rate/v3',
            NSRDB_data_query: '/api/solar/nsrdb_data_query',
            physical_solar_model: '/api/nsrdb/v2/solar/psm3-download',
            physical_solar_model_5_min: '/api/nsrdb/v2/solar/psm3-5min-download',
            physical_solar_model_TMY: '/api/nsrdb/v2/solar/psm3-tmy-download',
            site_count: '/api/nsrdb/v2/site-count',
            spectral_data: '/api/nsrdb_api/solar/spectral_ondemand_download'
        }
        this.response_format = '.json'
    }

    URLConstruct (URL_type, additions_object) {
        let URL = `${ this.base_URL }${ this.URL_object[URL_type] }${ this.response_format }?${authorization}`;
        if (additions_object === {}) {
            return URL;
        }
        let additions_keys = Object.keys(additions_object);
        let query_string = "";
        additions_keys.forEach(element => {
            query_string = query_string.concat(`&${element}=${additions_object[element]}`);
        });
        return `${ URL }${ query_string }`;
    }

    getAPI (ReferenceFunction, URL_type, parameters) {
        fetch(this.URLConstruct(URL_type, parameters))
            .then(response => {
                return response.json();
            })
            .then(request => {
                ReferenceFunction(request.results);
            })
    }
}

