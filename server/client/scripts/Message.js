var Message = Backbone.Model.extend({
  defaults: {
    username: 'Anonymous',
    message: '',
    roomname: 'lobby',
  },

  initialize: function() {
    this.set('image', this.getUniqueImage());
  },

  // generate random unique image for each user
  getUniqueImage: function() {
    return this.hashCode(this.get('username'), 39)+ '.jpg';
  },

  hashCode: function(str, max) {
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % max;
  }
});