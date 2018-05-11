// Dependencies: jQuery, jQuery-ui, FontAwesome

var browserNotifier = function (options={}, callback=function () {}) {
    returnBN = {} // unique object name to return

    returnBN.options = {
        browser: options.browser || 'Firefox', // list of browsers to notify for
        text: options.text || 'You are not using Firefox, which this project is designed and most suited for.',
        textClass: options.textClass || '',
        textStyle: options.textStyle || {
            'color': 'white',
            'font-family': 'Georgia, Times, serif',
            'text-shadow': '0 0 30px rgba(255,255,255,0.5)'
        },
        iconClass: options.iconClass || 'fa fa-firefox',
        iconStyle: options.iconStyle || {
            'color': 'white',
            'text-shadow': '0 0 30px rgba(255,255,255,0.5)',
            'font-size': '800%'
        },
        buttonText: options.buttonText || 'I understand, just continue.',
        buttonClass: options.buttonClass || 'btn btn-lg btn-warning',
        buttonStyle: options.buttonStyle || {'font-family': 'Georgia, Times, serif'},
        overlayColor: options.overlayColor || 'rgba(0,0,0,0.85)',
        overlayClass: options.overlayClass || '',
        overlayStyle: options.overlayStyle || {},
        effectDuration: options.effectDuration * 1000 || 1000
    }

    returnBN.defaults = { // list of browsers name in navigator and fa- icon names
        browsers: {
            MSIE: 'edge',
            Firefox: 'firefox',
            Chrome: 'chrome',
            Opera: 'opera',
            Safari: 'safari'
        },
        elements: { // list of jQuery elements to be appended
            text: $('<h1>').text(returnBN.options.text).css(returnBN.options.textStyle).addClass('text-center'),
            button: $('<button>').addClass(returnBN.options.buttonClass).css(returnBN.options.buttonStyle)
            .text(returnBN.options.buttonText).click(function () {
                returnBN.__exit__()
                callback()
            }),
            icon: $('<span>').addClass(returnBN.options.iconClass).css(returnBN.options.iconStyle)
        }
    }

    returnBN.defaults.elements.overlay = $('<div>')
    .attr('id', 'browserNotifier').addClass(returnBN.options.overlayClass)
    .css(Object.assign({
        'display': 'flex',
        'position': 'fixed',
        'opacity': '0',
        'background-color': returnBN.options.overlayColor,
        'width': '100%',
        'height': '100%',
        'top': '0',
        'bottom': '0',
        'left': '0',
        'right': '0',
        'z-index': '10',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'space-around'
    }, returnBN.options.overlayStyle))
    .append(returnBN.defaults.elements.icon)
    .append(returnBN.defaults.elements.text)
    .append(returnBN.defaults.elements.button)


    returnBN.__init__ = function () {
        if (
            Object.keys(
                returnBN.defaults.browsers
            ).indexOf(returnBN.options.browser) === -1
        ) throw new Error('Error: available browsers ' + Object.keys(returnBN.defaults.browsers))
        var todoTwice = function () {
            if (navigator.userAgent.indexOf(returnBN.options.browser) === -1) {
                $('body').append(returnBN.defaults.elements.overlay)
                $(returnBN.defaults.elements.overlay).animate({'opacity': '1'}, returnBN.options.effectDuration)
            }
        }
        localStorage.browserNotifier = 'yes'
        if (document.readyState === 'complete') todoTwice()
        else $(todoTwice)

    }

    returnBN.__exit__ = function () {
        $(returnBN.defaults.elements.overlay).animate({'opacity': '0'}, returnBN.options.effectDuration,
        complete=function () {
            $(returnBN.defaults.elements.overlay).remove()
        })
    }


    if (!localStorage.browserNotifier) returnBN.__init__()
    return returnBN
}