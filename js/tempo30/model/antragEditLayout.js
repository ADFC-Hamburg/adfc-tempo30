define('tempo30/model/antragEditLayout', [
    'gettext!tempo30',
    //
    'bootstrap',
    'bootstrap-datepicker-de',
], function (gt) {

    'use strict';

    return [{
        id: 'status',
        headline: gt('Bitte geben Sie den Status zu Ihren Antrag an'),
        elements: [{
            type: 'radio',
            id: 'status',
            dbid: 'status',
            label: gt('Status des Antrags'),
            options: [{
                id: '0',
                text: gt('Der Antrag ist noch nicht abgeschickt.')
            },{
                id: '2',
                text: gt('Der Antrag ist abgeschickt, noch keine Entscheidung.')
            },{
                id: '1',
                text: gt('Ich will im Moment doch keinen Antrag stellen.')
            },{
                id: '4',
                text: gt('Mein Antrag wurde erfolgreich entschieden.')
            },{
                id: '3',
                text: gt('Der Antrag wurde abgelehnt, bislang kein Widerspruch eingelegt.')
            },{
                id: '5',
                text: gt('Ich habe Widerspurch gegen eine ablehnende Antwort eingelgt.')
            },{
              id:'6',
              text: gt('Der Antrag wurde abgelehnt, ich will dagegen nichts unternehmen.')
            },{
              id:'7',
              text: gt('Der Antrag wurde abgelehnt, die Frist für einen Widerspruch ist abgelaufen.')
            },{
                id: '9',
                text: gt('Meinem Widerspruch wurde stattgegeben.')
            },{
                id: '8',
                text: gt('Mein Widerspruch wurde abgelehnt.')
            },{
              id: '10',
              text: gt('Ich habe wegen überschrittener Fristen Untätigkeitsklage eingereicht.')
            },{
              id: '11',
              text: gt('Ich habe entschieden, nicht gegen die Ablehnung des Widerspruchs zu klagen.')
            },{
              id: '12',
              text: gt('Eine Klage gegen die Ablehnung des Widerspruchs ist nicht mehr möglich.')
            },{
                id: '13',
                              text: gt('Ich klage vor Gericht gegen den Bescheid.')
            },{
                id: '15',
                text: gt('Meine Klage war erfolgreich.')
            },{
                id: '14',
                text: gt('Meine Klage war erfolglos.')
            }]
        },/*{
            type: 'text',
            subtype: 'betrag',
            id: 'kostenBezahlt',
            label: gt('Kosten in € die für das Verfahren an die Stadt/Gericht/Behörde/Anwalt bezahlt wurden'),
        },{
            type: 'text',
            subtype: 'betrag',
            id: 'kostenErwartet',
            label: gt('Im nächsten Schritt sollen mir (laut Behörde/Gericht/Anwalt) folgendes Kosten in € entstehen'),
        },*/
        {
          type: 'datepicker',
          id: 'urteildatum',
          nachId: 'klagedatum',
          label: gt('Wann wurde das Urteil gesprochen?')
        },{
          type: 'datepicker',
          id: 'klagedatum',
          nachId: 'widerspruchantwort',
          label: gt('Wann wurde Klage eingereicht?')
        },{
            type: 'datepicker',
            id: 'widerspruchantwort',
            nachId: 'widersprucheingang',
            label: gt('Wann wurde auf den Widerspruch geantwortet?')
        },{
            type: 'checkbox',
            id: 'belegwiderspruchabgabe',
            label: gt('Ich habe eine Eingangsbestätigung für den Widerspruch erhalten.')
        },{
            type: 'datepicker',
            id: 'widersprucheingang',
            nachId: 'antwortaufantrag',
            label: gt('Wann ging der Widerspruch bei der Behörde ein?')
        },{
            type: 'datepicker',
            id: 'antwortaufantrag',
            nachId: 'antragdate',
            label: gt('Wann wurde Ihnen auf den Antrag geantwortet?')
        },{
            type: 'checkbox',
            id: 'belegantragsabgabe',
            label: gt('Ich habe eine Eingangsbestätigung für den Antrag von der Polizei/Behörde erhalten.')
        },{
            id: 'antragdate',
            dbid: 'antragdate',
            type: 'datepicker',
            label: gt('Wann wurde der Antrag der Behörde zugestellt oder bei der Polizei abgegeben?')
        },{
            type: 'button',
            subtype: 'save',
            trigger: 'save',
        }],
   }, {
        id: 'bestandsDaten',
        headline: gt('Hier kannst Du Deine Bestandsdaten noch einmal ansehen. Korrekturen und Ergänzungen bitte, zur Zeit, per E-Mail mitteilen.'),
        elements: [{
            type: 'text',
            subtype: 'text',
            id: 'name',
            dbid: 'name',
            readonly: true,
            label: gt('Ihr Name'),
        },{
            type: 'text',
            subtype: 'email',
            id: 'email',
            dbid: 'email',
            readonly: true,
            label: gt('Ihre E-Mail Adresse'),
        },{
            type: 'text',
            subtype: 'strasse',
            id: 'strasse',
            dbid: 'strasse',
            readonly: true,
            label: gt('Straße (Wohnanschrift)'),
        },{
            type: 'text',
            subtype: 'hausnr',
            id: 'hausnr',
            dbid: 'hausnr',
            readonly: true,
            label: gt('Hausnummer'),
        },{
            type: 'text',
            subtype: 'plz',
            id: 'plz',
            dbid: 'plz',
            readonly: true,
            label: gt('Postleitzahl'),
        },{
            type: 'text',
            subtype: 'strasse',
            id: 'antrag_strasse',
            dbid: 'antrag_strasse',
            readonly: true,
            label: gt('Antrag für Straße'),
        },{
            type: 'text',
            id: 'lat',
            dbid: 'lat',
            readonly: true,
            label: gt('Geokoordinate Latitude'),
        },{
            type: 'text',
                  id: 'lon',
                  dbid: 'lon',
                  readonly: true,
                  label: gt('Geokoordinate Longitude'),
        },
        {
              type: 'checkbox',
              id: 'newsletter',
              dbid: 'newsletter',
              readonly: true,
              label: gt('Ich möchte über Neuigkeiten zu Tempo30 informiert werden'),
          },{
              id: 'adfc',
              dbid: 'mailcontact',
              type: 'checkbox',
              readonly: true,
              label: gt('Der ADFC darf meine E-Mailaddresse und den Bezirk speichern und mich für Rückfragen zum Antrag kontaktieren und den Antrag statistisch auswerten.')
          },{
              id: 'saveanschrift',
              dbid: 'saveanschrift',
              type: 'checkbox',
              readonly: true,
              label: gt('Der ADFC darf meinen Namen, und die Anschrift speichern um z.B. (nach Rückfrage) Mitstreiter in der Nachbarschaft zu finden.')
          },{
              id: 'landkarte',
              dbid: 'showinmap',
              type: 'checkbox',
              readonly: true,
              label: gt('Auf einer Tempo30-Antrags-Landkarte darf die Position des Antrags angezeigt werden (ohne Namensnennung)')
          },]
    }, {
              id: 'interneDaten',
              headline: gt('Diese Daten speichern wir intern über dich, sie können nicht geändert werden'),
              elements: [{
                type: 'text',
                id: 'id',
                dbid: 'id',
                readonly: true,
                label: gt('Datenbank Id'),
              },{
                type: 'text',
                id: 'lastchanged',
                dbid: 'lastchanged',
                readonly: true,
                label: gt('Letzte Änderung'),
              },{
                  type: 'text',
                  id: 'created',
                  dbid: 'created',
                  readonly: true,
                  label: gt('Erstellt in der ADFC Datenbank'),
            },{
                type: 'text',
                id: 'lastasked',
                dbid: 'lastasked',
                readonly: true,
                label: gt('Letzte Kontaktaufnahme durch den ADFC'),
          },{
              id: 'mailchecked',
              dbid: 'mailchecked',
              type: 'checkbox',
              readonly: true,
              label: gt('E-Mailaddresse wurde bestätigt.')
          },{
              id: 'adrchecked',
              dbid: 'adrchecked',
              type: 'checkbox',
              readonly: true,
              label: gt('Postaddresse wurde bestätigt.')
          },]
    }];

});
