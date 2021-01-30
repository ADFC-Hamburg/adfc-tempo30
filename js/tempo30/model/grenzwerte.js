define('tempo30/model/grenzwerte', [
], function () {
    var imgUrl=requirejs.toUrl('img');
    var img_neutral='<img src="'+imgUrl+'/1f610.svg" alt="neutraler Smiley" style="width:100px"/>';
    var img_boese='<img src="'+imgUrl+'/1f621.svg" alt="böser Smiley" style="width:100px"/>';
    var img_lachend='<img src="'+imgUrl+'/263a.svg" alt="lachender Smiley" style="width:100px"/>';
    var img_undef='<img src="'+imgUrl+'/2049.svg" alt="?!" style="width:100px"/>';
    var laermTag= {
        'undef': [img_undef, 'Keine Daten', 'Wir haben keine Lärmdaten für diese Position'],
        1: [img_neutral,'55-60 dB','Die Lärmwerte sind noch unter der Grenze bei der nachweislich gesundheitliche Beschwerden auftreten. Allerdings hat die Behörde genauere Messverfahren und kommt evtl. zu anderen Werten. Wenn Sie das Gefühl haben, dass der Lärmpegel hoch ist, stellen Sie gerne einen Antrag.'],
        2: [img_boese,'60-65 dB','Bei Lärmwerten von mehr als 59 dB(A) am Tage ist davon auszugehen, '+
'dass zunehmend erhebliche Belästigungen und gesundheitliche Beschwerden auftreten. Nach '+
'Auffassung des Bundesverwaltungsgerichts ist die zuständige Straßenverkehrsbehörde daher bei '+
'Erreichen dieser Werte verpflichtet im Ermessenswege konkrete lärmmindernde Maßnahmen zu '+
'erwägen und die Belange der Betroffenen mit den Belangen des Verkehrs abzuwägen.'],
        3: [img_boese,'65-70 dB','Bei Lärmwerten von mehr als 59 dB(A) am Tage ist davon auszugehen, '+
'dass zunehmend erhebliche Belästigungen und gesundheitliche Beschwerden auftreten. Nach '+
'Auffassung des Bundesverwaltungsgerichts ist die zuständige Straßenverkehrsbehörde daher bei '+
'Erreichen dieser Werte verpflichtet im Ermessenswege konkrete lärmmindernde Maßnahmen zu '+
'erwägen und die Belange der Betroffenen mit den Belangen des Verkehrs abzuwägen.'],
        4: [img_boese,'70-75 dB', 'Bei Werten von mehr als 70 dB(A) am Tage kann davon ausgegangen '+
'werden, dass den Betroffenen in der Regel ein Rechtsanspruch auf Lärmschutz zusteht, da bei diesen '+
'Werten eine erhebliche Gesundheitsgefährdung vorliegt.'],
        5: [img_boese,'mehr als 75 dB', 'Bei Werten von mehr als 70 dB(A) am Tage kann davon ausgegangen '+
'werden, dass den Betroffenen in der Regel ein Rechtsanspruch auf Lärmschutz zusteht, da bei diesen '+
'Werten eine erhebliche Gesundheitsgefährdung vorliegt.'],
    };
    var laermNacht= {
        'undef': [img_undef, 'Keine Daten', 'Wir haben keine Lärmdaten für diese Position'],
        1: [img_neutral,'45-50 dB','Die Lärmwerte sind noch unter der Grenze bei der nachweislich gesundheitliche Beschwerden auftreten. Allerdings hat die Behörde genauere Messverfahren und kommt evtl. zu anderen Werten. Wenn Sie das Gefühl haben, dass der Lärmpegel hoch ist, stellen Sie gerne einen Antrag.'],
        2: [img_boese,'50-55 dB','Bei Lärmwerten von mehr als 49 dB(A) in der Nacht ist davon auszugehen, '+
'dass zunehmend erhebliche Belästigungen und gesundheitliche Beschwerden auftreten. Nach '+
'Auffassung des Bundesverwaltungsgerichts ist die zuständige Straßenverkehrsbehörde daher bei '+
'Erreichen dieser Werte verpflichtet im Ermessenswege konkrete lärmmindernde Maßnahmen zu '+
'erwägen und die Belange der Betroffenen mit den Belangen des Verkehrs abzuwägen.'],
        3: [img_boese,'55-60 dB','Bei Lärmwerten von mehr als 49 dB(A) in der Nacht ist davon auszugehen, '+
'dass zunehmend erhebliche Belästigungen und gesundheitliche Beschwerden auftreten. Nach '+
'Auffassung des Bundesverwaltungsgerichts ist die zuständige Straßenverkehrsbehörde daher bei '+
'Erreichen dieser Werte verpflichtet im Ermessenswege konkrete lärmmindernde Maßnahmen zu '+
'erwägen und die Belange der Betroffenen mit den Belangen des Verkehrs abzuwägen.'],
        4: [img_boese,'60-65 dB', 'Bei Werten von mehr als 60 dB(A) in der Nacht kann davon ausgegangen '+
'werden, dass den Betroffenen in der Regel ein Rechtsanspruch auf Lärmschutz zusteht, da bei diesen '+
'Werten eine erhebliche Gesundheitsgefährdung vorliegt.'],
        5: [img_boese,'65-70 dB', 'Bei Werten von mehr als 60 dB(A) in der Nacht kann davon ausgegangen '+
'werden, dass den Betroffenen in der Regel ein Rechtsanspruch auf Lärmschutz zusteht, da bei diesen '+
'Werten eine erhebliche Gesundheitsgefährdung vorliegt.'],
        6: [img_boese,'über 70 dB', 'Bei Werten von mehr als 60 dB(A) in der Nacht kann davon ausgegangen '+
'werden, dass den Betroffenen in der Regel ein Rechtsanspruch auf Lärmschutz zusteht, da bei diesen '+
'Werten eine erhebliche Gesundheitsgefährdung vorliegt.'],
    };

    var no = { 
        'undef': [img_undef, 'Keine Daten', 'Wir haben keine Stickoxid Daten für diese Position'],
        0: [ img_lachend, '<31', 'Es ist wenig Stickoxid hier zu finden. Kein Grund einen Antrag zu stellen.'],
        31: [img_neutral, '>31', 'Der Grenzwert von 40 &mu;g wurde noch nicht erreicht, es ist aber schon viel Stickoxid in der Luft. Mit einem Antrag kann man erreichen, dass die Straßenverkehrsbehörde das ganze genauer prüfen muss.'],
        40: [img_boese,'>40', 'Der Grenzwert von 40 &mu;g wurde erreicht oder überschritten. Die Straßenverkehrsbehörde ist zum Einschreiten verpflichtet.']
    };
    var pm10 = { 
        'undef': [img_undef, 'Keine Daten', 'Wir haben keine Feinstaubdaten für diese Position'],
        0: [ img_lachend, '<20', 'Es ist wenig Feinstaub hier zu finden. Kein Grund einen Antrag zu stellen.'],
        20: [img_neutral, '>20', 'Der Grenzwert von 40 &mu;g wurde noch nicht erreicht, es ist aber schon viel Feinstaub in der Luft. Mit einem Antrag kann man erreichen, dass die Straßenverkehrsbehörde das ganze genauer prüft.'],
        40: [img_boese,'>40', 'Der Grenzwert von 40 &mu;g wurde erreicht oder überschritten. Die Straßenverkehrsbehörde ist zum Einschreiten verpflichtet.']
    };
    var pm25 = { 
        'undef': [img_undef, 'Keine Daten', 'Wir haben keine Feinstaubdaten für diese Position'],
        0: [ img_lachend, '<16', 'Es ist wenig Feinstaub hier zu finden. Kein Grund einen Antrag zu stellen.'],
        16: [img_neutral, '>16', 'Der Grenzwert von 25 &mu;g wurde noch nicht erreicht, es ist aber schon viel Feinstaub in der Luft. Mit einem Antrag kann man erreichen, dass die Straßenverkehrsbehörde das ganze genauer prüft. Insbesondere da ab 2020 ein Grenzwerte von 20 &mu;g gelten würde und Sie dann zum einschreiten verpflichtet wäre.'],
        25: [img_boese,'>25', 'Der Grenzwert von 25 &mu;g wurde erreicht oder überschritten. Die Straßenverkehrsbehörde ist zum Einschreiten verpflichtet.']
    };

    var grenzwerte={
        'laerm_tag': laermTag,
        'laerm_nacht': laermNacht,
        'no2':no,
        'pm10':pm10,
        'pm25':pm25,
    };
    console.log(grenzwerte);
    return grenzwerte;
});
