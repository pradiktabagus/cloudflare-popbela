import { toSafetyStringSEO } from '@/utils/TextTransform';

/* eslint-disable @typescript-eslint/naming-convention */
export type TAnalyticsAmp = {
  author: string | any;
  sections: string;
  path: string;
  title: string;
};

export default function AnalyticsAmp(props: TAnalyticsAmp) {
  const { author, sections, path, title: titleArticle } = props;
  let DEFAULT_PAGEVIEW_ENABLED;
  let SEND_DOUBLECLICK_BEACON;
  let PERFORMANCE_TIMING_TRACKING;
  let DISABLE_REGIONAL_DATA_COLLECTION;
  let WEBVITALS_TRACKING;
  let GA4_ENDPOINT_HOSTNAME;
  let GOOGLE_CONSENT_ENABLED;
  let GA4_MEASUREMENT_ID;

  let clientId;
  let endpoint;
  let timestamp;
  let dataSource;
  let pageViewId;
  let browserLanguage;
  let screenWidth;
  let screenHeight;
  let requestCount;
  let documentLocation;
  let externalReferrer;
  let title;
  let timezoneCode;
  let ga4IsFirstVisit;
  let ga4IsSessionStart;
  let isDebugEnabled;
  let ga4SharedPayload;
  let ga4_event_name;
  let pageLoadTime;
  let domainLookupTime;
  let tcpConnectTime;
  let redirectTime;
  let serverResponseTime;
  let pageDownloadTime;
  let contentLoadTime;
  let domInteractiveTime;
  let SOURCE_AMP;
  let MEDIUM_AMP;
  return (
    <div>
      <amp-analytics type="chartbeat">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "vars": {
                  "uid": "12345",
                  "domain": "popbela.com",
                  "sections": "${sections}",
                  "authors": "${author}",
                  "canonicalPath": "popbela.com${path}", 
                  "title": "${toSafetyStringSEO(titleArticle)}",
                  "contentType": "article page" 
                }
              }
            `,
          }}
        />
      </amp-analytics>
      <amp-analytics
        type="googleanalytics"
        config="https://amp.analytics-debugger.com/ga4.json"
        data-credentials="include"
      >
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `{
                "vars": {
                    "GA4_MEASUREMENT_ID": "G-R8SCKFMK95",
                    "GA4_ENDPOINT_HOSTNAME": "www.google-analytics.com",
                    "DEFAULT_PAGEVIEW_ENABLED": true,    
                    "documentLocation": "$IF($EQUALS($MATCH(SOURCE_URL, \\\\?, 0),?),SOURCE_URL&utm_source=${SOURCE_AMP}&utm_medium=${MEDIUM_AMP},SOURCE_URL?utm_source=${SOURCE_AMP}&utm_medium=${MEDIUM_AMP})",
                    "SOURCE_AMP":"AMP%20Page",
                    "MEDIUM_AMP":"organic",
                    "GOOGLE_CONSENT_ENABLED": false,
                    "WEBVITALS_TRACKING": true,
                    "PERFORMANCE_TIMING_TRACKING": false,
                    "SEND_DOUBLECLICK_BEACON": false
                },
              "linkers": {
                    "_gl": {
                    "enabled": true,
                "ids": {
                    "_ga": "${clientId}"
                },
                "proxyOnly": false,
                "destinationDomains":["*popbela.com*"]
                }
              }
            }`,
          }}
        />
      </amp-analytics>

      <amp-analytics type="googleanalytics" data-credentials="include">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `{
                "cookies": {
                    "_ga": {
                        "value": "$IF(LINKER_PARAM(_gl, _ga),GA1.0.LINKER_PARAM(_gl, _ga),)"
                    }
                },
                "linkers": {
                    "_gl": {
                        "enabled": true,
                        "ids": {
                            "_ga": "${clientId}"
                        },
                        "proxyOnly": false
                    }
                },
                "triggers": {
                    "page_view": {
                        "enabled": "${DEFAULT_PAGEVIEW_ENABLED}",
                        "on": "visible",
                        "request": "ga4Pageview"
                    },
                    "doubleClick": {
                        "enabled": "${SEND_DOUBLECLICK_BEACON}",
                        "on": "visible",
                        "request": "ga4Dc"
                    },
                    "webVitals": {
                        "enabled": "${WEBVITALS_TRACKING}",
                        "on": "timer",
                        "timerSpec": {
                            "interval": 5,
                            "maxTimerLength": 4.99,
                            "immediate": false
                        },
                        "request": "ga4Event",
                        "vars": {
                            "ga4_event_name": "web_vitals"
                        },
                        "extraUrlParams": {
                            "event__num_first_contenful_paint": "FIRST_CONTENTFUL_PAINT",
                            "event__num_first_viewport_ready": "FIRST_VIEWPORT_READY",
                            "event__num_make_body_visible": "MAKE_BODY_VISIBLE",
                            "event__num_largest_contentful_paint": "LARGEST_CONTENTFUL_PAINT",
                            "event__num_cumulative_layout_shift": "CUMULATIVE_LAYOUT_SHIFT"
                        }
                    },
                    "performanceTiming": {
                        "enabled": "${PERFORMANCE_TIMING_TRACKING}",
                        "on": "visible",
                        "request": "ga4Event",
                        "sampleSpec": {
                            "sampleOn": "${clientId}",
                            "threshold": 100
                        },
                        "vars": {
                            "ga4_event_name": "performance_timing"
                        },
                        "extraUrlParams": {
                            "event__num_page_load_time": "${pageLoadTime}",
                            "event__num_domain_lookup_time": "${domainLookupTime}",
                            "event__num_tcp_connect_time": "${tcpConnectTime}",
                            "event__num_redirect_time": "${redirectTime}",
                            "event__num_server_response_time": "${serverResponseTime}",
                            "event__num_page_download_time": "${pageDownloadTime}",
                            "event__num_content_download_time": "${contentLoadTime}",
                            "event__num_dom_interactive_time": "${domInteractiveTime}"
                        }
                    }
                },
                "vars": {
                    "documentLocation": "SOURCE_URL",
                    "clientId": "CLIENT_ID(AMP_ECID_GOOGLE,,_ga,true)",
                    "dataSource": "AMP",
                    "isDebugEnabled": "$IF($EQUALS(QUERY_PARAM(_dbg),1), _dbg, __dbg)",
                    "endpoint": "$IF(${DISABLE_REGIONAL_DATA_COLLECTION},https://${GA4_ENDPOINT_HOSTNAME}, https://$IF($EQUALS($MATCH(${timezoneCode}, Europe, 0),Europe), $REPLACE(${GA4_ENDPOINT_HOSTNAME},www.google-analytics.com,region1.google-analytics.com), ${GA4_ENDPOINT_HOSTNAME}))",
                    "GA4_MEASUREMENT_ID": "G-6ZW2BDHWFT",
                    "GA4_ENDPOINT_HOSTNAME": "www.google-analytics.com",
                    "DEFAULT_PAGEVIEW_ENABLED": true,
                    "GOOGLE_CONSENT_ENABLED": false,
                    "WEBVITALS_TRACKING": true,
                    "PERFORMANCE_TIMING_TRACKING": false,
                    "SEND_DOUBLECLICK_BEACON": false
                },
                "extraUrlParams": {
                    "sid": "$CALC(SESSION_TIMESTAMP, 1000, divide, true)",
                    "sct": "SESSION_COUNT",
                    "seg": "$IF($EQUALS(SESSION_ENGAGED, true),1,0)",
                    "_et": "$CALC(INCREMENTAL_ENGAGED_TIME,1000, multiply)",
                    "gcs": "$IF($EQUALS(${GOOGLE_CONSENT_ENABLED},TRUE),G10$IF($EQUALS(CONSENT_STATE,sufficient),1,0),)"
                },
                "extraUrlParamsReplaceMap": {
                    "user__str_": "up.",
                    "user__num_": "upn.",
                    "event__str_": "ep.",
                    "event__num_": "epn."
                },
                "requestOrigin": "${endpoint}",
                "requests": {
                    "ga4IsFirstVisit": "$IF($EQUALS($CALC(SESSION_COUNT, $CALC($CALC(${timestamp}, 1000, divide, true),$CALC(SESSION_TIMESTAMP, 1000, divide, true), subtract), add),1), _fv, __nfv )",
                    "ga4IsSessionStart": "$IF($EQUALS($CALC($CALC(${timestamp}, 1000, divide, true),$CALC(SESSION_TIMESTAMP, 1000, divide, true), subtract),0), _ss, __nss)",
                    "ga4SharedPayload": "v=2&tid=${GA4_MEASUREMENT_ID}&ds=${dataSource}&_p=${pageViewId}&cid=${clientId}&ul=${browserLanguage}&sr=${screenWidth}x${screenHeight}&_s=${requestCount}&dl=${documentLocation}&dr=${externalReferrer}&dt=${title}&${ga4IsFirstVisit}=1&${ga4IsSessionStart}=1&${isDebugEnabled}=1",
                    "ga4Pageview": {
                        "baseUrl": "/g/collect?${ga4SharedPayload}&en=page_view"
                    },
                    "ga4Event": {
                        "baseUrl": "/g/collect?${ga4SharedPayload}&en=${ga4_event_name}"
                    },
                    "ga4Dc": {
                        "origin": "https://stats.g.doubleclick.net",
                        "baseUrl": "/g/collect?v=2&tid=${GA4_MEASUREMENT_ID}&cid=${clientId}&aip=1"
                    }
                }
            }`,
          }}
        />
      </amp-analytics>
    </div>
  );
}