// regex patterns for Port of Tyne shipping movements webpage
function portOfTyne() {
    const patterns = {
        expected: /<section id="expected" role="tabpanel" aria-labelledby="expected-tab" class="c-ShippingFeeds__feed" hidden>(.*?)<\/section><\/section>/g,
        berth: /<section id="berth" role="tabpanel" aria-labelledby="berth-tab" class="c-ShippingFeeds__feed" hidden>(.*?)<\/section><\/section>/g,
        history:  /<section id="history" role="tabpanel" aria-labelledby="history-tab" class="c-ShippingFeeds__feed" hidden>(.*?)<\/section><\/section>/g,
        table: /<table class="c-ShippingFeeds__table">(.*?)<\/table>/g,
        thead: /<thead class="c-ShippingFeeds__head">(.*?)<\/thead>/g,
        tr: /<tr class="c-ShippingFeeds__row">(.*?)<\/tr>/g,
        th: /<th class="c-ShippingFeeds__row-header">(.*?)<\/th>/g,
        tbody: /<tbody>(.*?)<\/tbody>/g,
        td: /<td class="c-ShippingFeeds__row-data">(.*?)<\/td>/g,
        ship_name: /<span class="c-ShippingFeeds__label c-ShippingFeeds__label--name">(.*?)<\/span>/g,
        start: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label c-ShippingFeeds__label--toggle" aria-hidden="true">Start<\/span>(.*?)<svg (.*?)><\/td>/g,
        eta_etd: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label c-ShippingFeeds__label--toggle" aria-hidden="true">ETA<\/span>(.*?)<svg (.*?)><\/td>/g,
        arr_move_sail: /<span class="c-ShippingFeeds__label" aria-hidden="true">Arr\/Move\/Sail<\/span>(.*?)<\/td>/g,
        from: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">From<\/span>(.*?)<\/td>/g,
        to: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">To<\/span>(.*?)<\/td>/g,
        flag: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">Flag<\/span>(.*?)<\/td>/g,
        order: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">Order<\/span>(.*?)<\/td>/g,
        imo: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">IMO<\/span>(.*?)<\/td>/g,
        grt: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">GRT<\/span>(.*?)<\/td>/g,
        agent: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">Agent<\/span>(.*?)<\/td>/g,
        callsign: /<td class="c-ShippingFeeds__row-data"><span class="c-ShippingFeeds__label" aria-hidden="true">Call Sign<\/span>(.*?)<\/td>/g,
        image: /<img data-src="(.*?)">/g,
    }   
    
    return patterns
}

module.exports = {
    portOfTyne: portOfTyne
}
