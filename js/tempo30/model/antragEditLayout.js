define('tempo30/model/antragEditLayout', [
    'gettext!tempo30',
    //
    'bootstrap',
    'bootstrap-datepicker',
], function (gt) {

    'use strict';

    return [{
        id: 'status',
        headline: gt('Bitte geben Sie den Status zu Ihren Antrag an'),
        elements: [{
            type: 'select',
            id: 'status',
            label: gt('Status des Antrags'),
            options: [{
                id: 'vorbereitung',
                text: gt('Der Antrag ist noch nicht abgeschickt.')
            },{
                id: 'abgeschickt',
                text: gt('Der Antrag ist abgeschickt, noch keine Entscheidung')
            },{
                id: 'doch_nicht',
                text: gt('Ich will im Moment doch keinen Antrag stellen')
            },{
                id: 'antrag-positiv',
                text: gt('Mein Antrag wurde erfolgreich entschieden.')
            },{
                id: 'antrag-negativ',
                text: gt('Der Antrag wurde abgelehnt, bislang kein Widerspruch eingelegt')
            },{
                id: 'widerspruch',
                text: gt('Ich habe Widerspurch gegen eine ablehende Antwort eingelgt')
            },{
                id: 'widerspruch-positiv',
                text: gt('Meinen Widerspruch wurde stattgegeben')
            },{
                id: 'widerspruch-abgelehnt',
                text: gt('Meinen Widerspruch wurde abgelehnt')
            },{
                id: 'klage',
                text: gt('Ich klage vor Gericht gegen den Bescheid')
            },{
                id: 'klage-positiv',
                text: gt('Meine Klage war erfolgreich')
            },{
                id: 'klage-erfolglos',
                text: gt('Meine Klage war erfolglos')
            }]
        },{
            type: 'text',
            subtype: 'betrag',
            id: 'kostenBezahlt',
            label: gt('Kosten die für das Verfahren an die Stadt/Gericht/Behörde bezahlt wurden'),
        },{
            type: 'text',
            subtype: 'betrag',
            id: 'kostenErwartet',
            label: gt('Im nächsten Schritt sollen (laut Behörde/Gericht/Anwalt) folgendes Kosten entstehen'),
        },{
            type: 'datepicker',
            id: 'antragEingang',
            label: gt('Wann wurde der Antrag der Behörde zugestellt?')
        },{
            type: 'datepicker',
            id: 'antwortAufAntragEingang',
            label: gt('Wann wurde Ihnen auf den Antrag geantwortet?')
        },{
            type: 'datepicker',
            id: 'widerspruchEingang',
            label: gt('Wann ging der Widerspruch bei der Behörde ein?')
        },{
            type: 'datepicker',
            id: 'widerspruchAntwort',
            label: gt('Wann wurde auf den Widerspruch geantwortet?')
        },{
            type: 'datepicker',
            id: 'klageDatum',
            label: gt('Wann wurde Klage eingereicht?')
        },{
            type: 'datepicker',
            id: 'urteilDatum',
            label: gt('Wann wurde das Urteil gesprochen?')
        },{
            type: 'button',
            subtype: 'save',
        }],
    }, {
        id: 'bestandsDaten',
        headline: gt('Hier können Sie Ihre Daten noch einmal ansehen und ggf. ändern/korrigieren'),
        elements: [{
            type: 'text',
            subtype: 'text',
            id: 'name',
            label: gt('Ihr Name'),
        },{
            type: 'text',
            subtype: 'email',
            id: 'email',
            label: gt('Ihre E-Mail Adresse'),
        },{
            type: 'text',
            subtype: 'strasse',
            id: 'strasse',
            label: gt('Straße (Wohnanschrift)'),
        },{
            type: 'text',
            subtype: 'hausnr',
            id: 'hausnr',
            label: gt('Hausnummer'),
        },{
            type: 'text',
            subtype: 'plz',
            id: 'plz',
            label: gt('Postleitzahl'),
        },{
            type: 'text',
            subtype: 'strasse',
            id: 'strasse',
            label: gt('Antrag für Straße'),
        },{
            type: 'checkbox',
            id: 'newsletter',
            label: gt('Ich möchte über Neuigkeiten zu Tempo30 informiert werden'),
        },{
            id: 'adfc',
            type: 'checkbox',
            label: gt('Der ADFC darf meine E-Mailaddresse und den Bezirk speichern und mich für Rückfragen zum Antrag kontaktieren und den Antrag statistisch auswerten.')
        },{
            id: 'strasse',
            type: 'checkbox',
            label: gt('Der ADFC darf meinen Namen, und die Anschrift speichern um z.B. (nach Rückfrage) Mitstreiter in der Nachbarschaft zu finden.')
        },{
            id: 'landkarte',
            type: 'checkbox',
            label: gt('Auf einer Tempo30-Antrags-Landkarte darf die Position des Antrags angezeigt werden (ohne Namensnennung)')
        },{
            type: 'button',
            subtype: 'save',
        }]
    }];
        
});
