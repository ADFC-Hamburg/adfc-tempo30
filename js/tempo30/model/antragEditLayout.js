define('tempo30/model/antragEditLayout', [
  'gettext!tempo30',
  //
  'bootstrap',
  'bootstrap-datepicker-de',
], function (gt) {

  'use strict';

  return [{
    id: 'status',
    headline: gt('Bitte gib den Status zu Deinem Antrag an'),
    elements: [{
      type: 'radio',
      id: 'status',
      dbid: 'status',
      label: gt('Der Antrag ist noch nicht abgeschickt.'),
      options: [{
        id: '0',
        text: gt('Ich habe den Antrag noch nicht abgeschickt.')
      },{
        id: '1',
        text: gt('Ich will im Moment doch keinen Antrag stellen.')
      } ],
    },{
      type: 'radio',
      id: 'status',
      dbid: 'status',
      label: gt('Ich habe einen Antrag gestellt.'),
      options: [
        {
          id: '2',
          text: gt('Der Antrag ist abgeschickt, noch keine Entscheidung.')
        },{
          id: '4',
          text: gt('Mein Antrag wurde erfolgreich entschieden.')
        },{
          id:'6',
          text: gt('Der Antrag wurde abgelehnt, ich will dagegen nichts unternehmen.')
        },{
          id: '3',
          text: gt('Der Antrag wurde abgelehnt, bislang kein Widerspruch eingelegt.')
        },{
          id:'7',
          text: gt('Der Antrag wurde abgelehnt, die Frist für einen Widerspruch ist abgelaufen.')
        }],
      },{
        type: 'radio',
        id: 'status',
        dbid: 'status',
        label: gt('Ich habe Widerspurch eingelgt.'),
        options: [{
          id: '5',
          text: gt('Ich habe Widerspurch gegen eine ablehnende Antwort eingelgt.')
        },{
          id: '9',
          text: gt('Meinem Widerspruch wurde stattgegeben.')
        },{
          id: '8',
          text: gt('Mein Widerspruch wurde abgelehnt.')
        },{
          id: '11',
          text: gt('Ich habe entschieden, nicht gegen die Ablehnung des Widerspruchs zu klagen.')
        },{
          id: '12',
          text: gt('Eine Klage gegen die Ablehnung des Widerspruchs ist nicht mehr möglich.')
        },],
      },{
        type: 'radio',
        id: 'status',
        dbid: 'status',
        label: gt('Ich klage vor Gericht.'),
        options: [{
          id: '10',
          text: gt('Ich habe wegen überschrittener Fristen Untätigkeitsklage eingereicht.')
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
      },
      {
        type: 'hr',
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
    headline: gt('Hier kannst Du Deine Bestandsdaten noch ansehen und ggf. ändern.'),
    elements: [{
      type: 'text',
      subtype: 'text',
      id: 'name',
      dbid: 'name',
      label: gt('Ihr Name'),
    },{
      type: 'text',
      subtype: 'strasse',
      id: 'antrag_strasse',
      dbid: 'antrag_strasse',
      label: gt('Antrag für Straße'),
    },{
      type: 'text',
      subtype: 'strasse',
      id: 'strasse',
      dbid: 'strasse',
      label: gt('Straße (Wohnanschrift)'),
    },{
      type: 'text',
      subtype: 'hausnr',
      id: 'hausnr',
      dbid: 'hausnr',
      label: gt('Hausnummer'),
    },{
      type: 'text',
      id: 'lat',
      subtype: 'lat',
      dbid: 'lat',
      label: gt('Geokoordinate Latitude'),
    },{
      type: 'text',
      subtype: 'lon',
      id: 'lon',
      dbid: 'lon',
      label: gt('Geokoordinate Longitude'),
    },{
      type: 'text',
      subtype: 'plz',
      id: 'plz',
      dbid: 'plz',
      label: gt('Postleitzahl'),
    },{
      type: 'select',
      id: 'bezirk',
      dbid: 'bezirk',
      label: gt('Bezirk'),
      options: [{
        id: '',
        text: gt(' - keine Angabe - '),
      },{
        id: 'Altona',
        text: gt('Altona'),
      },{
        id: 'Bergedorf',
        text: gt('Bergedorf'),
      },{
        id: 'Eimsbüttel',
        text: gt('Eimsbüttel'),
      },{
        id: 'Hamburg-Mitte',
        text: gt('Hamburg-Mitte'),
      },{
        id: 'Hamburg-Nord',
        text: gt('Hamburg-Nord'),
      },{
        id: 'Harburg',
        text: gt('Harburg'),
      },{
        id: 'Wandsbek',
        text: gt('Wandsbek'),
      } ],
    },{
      type: 'hr',
    },{
      type: 'checkbox',
      id: 'newsletter',
      dbid: 'newsletter',
      label: gt('Ich möchte über Neuigkeiten zu Tempo30 informiert werden'),
    },{
      id: 'mailcontact',
      dbid: 'mailcontact',
      type: 'checkbox',
      label: gt('Der ADFC darf mich für Rückfragen zum Antrag kontaktieren und den Antrag statistisch auswerten.')
    },{
      id: 'saveanschrift',
      dbid: 'saveanschrift',
      type: 'checkbox',
      label: gt('Der ADFC darf meinen Namen, und die Anschrift speichern um z.B. (nach Rückfrage) Mitstreiter in der Nachbarschaft zu finden.')
    },{
      id: 'showinmap',
      dbid: 'showinmap',
      type: 'checkbox',
      label: gt('Auf einer Tempo30-Antrags-Landkarte darf die Position des Antrags angezeigt werden (ohne Namensnennung)')
    },{
      type: 'button',
      subtype: 'save',
      trigger: 'save-base',
    },]
  }, {
    id: 'interneDaten',
    headline: gt('Diese Daten speichern wir intern über dich, sie können nicht durch Dich geändert werden'),
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
    },{
      type: 'text',
      subtype: 'email',
      id: 'email',
      dbid: 'email',
      label: gt('E-Mail Adresse'),
      readonly: true,
    },]
  }];

});
