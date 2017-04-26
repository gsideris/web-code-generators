$.fn.extend
  __name__: (options) ->
    self = $.fn.__name__
    opts = $.extend {}, self.default_options, options    
    $(this).each (i, el) ->        
        self.init el, opts
        

$.extend $.fn.__name__,
  default_options:
    option1: 'test' # default option
    option2: 'test' # default option

  init: (el, opts) ->
        option1= opts['option1']
        # implementation                    

