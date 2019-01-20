var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sticker Model
 * ==========
 */
var Sticker = new keystone.List('Sticker');

Sticker.add({
    user: { type: Types.Relationship, ref: 'User', initial: true, required: true },
    word: { type: Types.Relationship, ref: 'Word', initial: true, required: true },
    type: { type: Types.Select, options:'Gold, Silver, Bronze, Regular', initial: true, required: true },
    avatar: { type: Types.CloudinaryImage }
});


/**
 * Registration
 */
Sticker.defaultColumns = 'user, word, type';
Sticker.register();
