// obtain plugin
var cc = initCookieConsent();

// run plugin with your configuration
cc.run({
    current_lang: 'en',
    autoclear_cookies: true,                   // default: false
    page_scripts: true,                        // default: false

    // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
    // delay: 0,                               // default: 0
    // auto_language: null                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                          // default: true
    // force_consent: false,                   // default: false
    // hide_from_bots: false,                  // default: false
    // remove_cookie_tables: false             // default: false
    // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
    // cookie_expiration: 182,                 // default: 182 (days)
    // cookie_necessary_only_expiration: 182   // default: disabled
    // cookie_domain: location.hostname,       // default: current domain
    // cookie_path: '/',                       // default: root
    // cookie_same_site: 'Lax',                // default: 'Lax'
    // use_rfc_cookie: false,                  // default: false
    // revision: 0,                            // default: 0

    onFirstAction: function(user_preferences, cookie){
        // callback triggered only once
    },

    onAccept: function (cookie) {
        // ...
    },

    onChange: function (cookie, changed_preferences) {
        // ...
    },

    languages: {
        'en': {
            consent_modal: {
                title: 'Where are the cookies?',
                description: 'I don\'t use cookies but I use external scripts for (self-hosted) analytics and discussions on GitHub. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                primary_btn: {
                    text: 'Accept all',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Reject all',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                }
            },
            settings_modal: {
                title: 'Cookie preferences',
                save_settings_btn: 'Save settings',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Expiration'},
                    {col4: 'Description'}
                ],
                blocks: [
                    {
                        title: 'Cookie usage 📢',
                        description: 'I don\'t even use cookies .. I think. There is a self-hosted <a href="https://plausible.io/" class="cc-link">plausible</a> server for page visits and <a href="https://github.com/giscus/giscus" class="cc-link">giscus</a> for discussion. To be on the save side, you can choose for each category, to opt-in/out whenever you want.'
                    }, {
                        title: 'Analytics',
                        description: 'A self-hosted <a href="https://plausible.io/" class="cc-link">plausible</a> server for page visits',
                        toggle: {
                            value: 'analytics',     // your cookie category
                            enabled: false,
                            readonly: false
                        },
                    }, {
                        title: 'Discussion',
                        description: 'Discussions hosted on  <a href="https://github.com/GitUser/repo" class="cc-link">GitHub</a> via <a href="https://github.com/giscus/giscus" class="cc-link">giscus</a> for discussions',
                        toggle: {
                            value: 'discussion',
                            enabled: false,
                            readonly: false
                        }
                    },
                ]
            }
        }
    }
});