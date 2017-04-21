'use strict'

const S = 's'
const MS = 'ms'
const NS = 'ns'

const round = number => Math.round(number * 100) / 100

function hirestimeNode() {
    const start = process.hrtime()

    return unit => {
        let elapsed = process.hrtime(start)

        switch (unit) {
            case S:
                return round(elapsed[0] + elapsed[1] / 1e9)

            case NS:
                return round(elapsed[0] * 1e9 + elapsed[1])
        }

        return round(elapsed[0] * 1e3 + elapsed[1] / 1e6)
    }
}

function hiresTimeBrowser() {
    const start = Date.now()

    return unit => {
        var elapsed = Date.now() - start

        switch (unit) {
            case S:
                return round(elapsed / 1e3)

            case NS:
                return round(elapsed * 1e6)
        }

        return elapsed
    }
}

module.exports = process.hrtime ? hirestimeNode : hiresTimeBrowser

module.exports.S = S
module.exports.MS = MS
module.exports.NS = NS