var keystone = require('keystone');
var Types = keystone.Field.Types;
var storage = require("../storage/index.js");

/**
 * Recording Model
 * ==========
 */
var Recording = new keystone.List('Recording');

Recording.add({
    name: { type: Types.Text, default: "untitled" },
    avatar: { type: Types.CloudinaryImage },
    user: { type: Types.Relationship, ref: 'User', initial: true, required: true },
    word: { type: Types.Relationship, ref: 'Word', initial: true, required: true },
    file: { type: Types.File, storage: storage, initial: true, required: true },
    recordedAt: { type: Types.Datetime, default: Date.now },
    isValid: { type: Types.Boolean },
    voice: { type: Types.Text }
});

/**
 * Registration
 */
Recording.defaultColumns = 'name, user, word, recordedAt, isValid';
Recording.register();
