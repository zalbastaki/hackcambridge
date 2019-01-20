var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Word Model
 * ==========
 */
var Word = new keystone.List('Word');

Word.add({
    name: { type: Types.Text, initial: true, required: true },
    class: { type: Types.Select, options:'Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjuction, Determiner, Exclamation', initial: true },
    definition: { type: Types.Textarea, initial: true, required: true },
    phoneticTranscription: { type: Types.Text, initial: true },
    audioSrc: { type: Types.Url, initial: true, label: "Audio Source" },
    endsAt: { type: Types.Datetime, initial: true, required: true }
});


/**
 * Registration
 */
Word.defaultColumns = 'name, class, endsAt';
Word.register();
