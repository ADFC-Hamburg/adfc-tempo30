define('tempo30/app/newsletter', [
    'jquery',
], function ($) {
    function newsletterForm(mail) {

        var btn=$('<input type="submit" value="Zum Newsletter anmelden (im neuen Tab/Browserfenster)">');
        var form=$('<form method="post" action="http://swm.hauptsache.net/nl.php" target="_blank">')
            .append($('<input type="hidden" name="MailingListId" value="93">'))
            .append($('<input type="hidden" name="FormId" value="1">'))
            .append($('<input type="hidden" name="FormEncoding" value="utf-8">'))
            .append($('<input type="hidden" name="u_EMail">').prop('value',mail))
            .append($('<input type="hidden" name="Action" value="subscribe">'))
            .append(btn);

        btn.on('click', function () {
            form.replaceWith($('<b>').text('Bitte bestätigen Sie die E-Mail für den Newsletter-Empfang'));
        });
        return form;
    }

    return newsletterForm;
});
