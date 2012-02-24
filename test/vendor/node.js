Backbone.sync 剖析

取url的顺序
 1. options.url
 2. getValue(model, 'url') || urlError()

取data的顺序
 1. options.data
 2. JSON.stringify(model.toJSON())


