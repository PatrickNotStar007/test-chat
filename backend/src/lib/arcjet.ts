import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node'

import config from '../config/config'

const aj = arcjet({
    key: config.arcjetKey,
    rules: [
        shield({ mode: 'LIVE' }),
        detectBot({
            mode: 'LIVE',
            allow: ['CATEGORY:SEARCH_ENGINE'],
        }),
        slidingWindow({
            mode: 'LIVE',
            max: 100,
            interval: 60,
        }),
    ],
})

export default aj
