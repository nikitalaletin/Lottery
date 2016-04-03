/**
 * Created by Никита on 18.03.2016.
 */
$(function () {

    var firstIn = $('input[name=firstname]');
    var lastIn = $('input[name=lastname]');
    var emailIn = $('input[name=email]');
    var phoneIn = $('input[name=phone]');
    var dateIn = $('input[name=birthday]');

    $('#random').on('click', function (e) {
        var list = $($('tbody')[1]).find('tr').slice(1);
        var winner = list[Math.floor(Math.random() * list.length)];
        var winnerName = $(winner).find('td')[0].textContent
        var winnerSername = $(winner).find('td')[1].textContent
        $('#winner').val(' ' + winnerName + ' ' + winnerSername);
    });

    $('#save').on('click', function (e) {
        var firstname = firstIn.val();
        var lastname = lastIn.val();
        var email = emailIn.val();
        var phone = phoneIn.val();
        var date = dateIn.val();

        var isEmail = isValidEmailAddress(email);
        var isPhone = isValidNumber(phone);
        var email_ok = 1;
        var phone_ok = 1;
        if (firstname == '' || lastname == '') {
            alert('Enter firstname and lastname!');
            phone_ok = 0;
        }
        if (isEmail == false) {
            alert('Enter valid email!');
            email_ok = 0;
        }
        if (phone !== '' && isPhone == false) {
            alert('Enter valid phone!');
            phone_ok = 0;
        }
        if (email_ok == 1 && phone_ok == 1 && firstIn.val() !== '' && lastIn.val() !== '') {
            e.preventDefault();
            if ($('#save').hasClass('current')) {
                currentRow = $('tr.current');
            } else {
                currentRow = $('<tr><td></td><td></td><td></td><td></td><td></td><td><input type="submit" value="EDIT" class="edit"></td></tr>');
                $('.test').append(currentRow);
            }
            $(currentRow.find('td')[0]).text(firstname);
            $(currentRow.find('td')[1]).text(lastname);
            $(currentRow.find('td')[2]).text(email);
            $(currentRow.find('td')[3]).text(phone);
            $(currentRow.find('td')[4]).text(date);
            firstIn.val('');
            lastIn.val('');
            emailIn.val('');
            phoneIn.val('');
            dateIn.val('');
        }
        $('#save').removeClass('current');
        $('tr.current').removeClass('current');
    });

    $('body').on('click', '.edit', function (e) {
        var currRow = $(e.target).parents('tr').addClass('current');
        var currname = $(currRow.find('td')[0]).text();
        var currLastName = $(currRow.find('td')[1]).text();
        var currEmail = $(currRow.find('td')[2]).text();
        var currPhone = $(currRow.find('td')[3]).text();
        var currDate = $(currRow.find('td')[4]).text();
        firstIn.val(currname);
        lastIn.val(currLastName);
        emailIn.val(currEmail);
        phoneIn.val(currPhone);
        dateIn.val(currDate);
        $('#save').addClass('current');
    })

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    function isValidNumber(p) {
        var phoneRe = /^[0-9]\d{2}[0-9]\d{2}\d{4}$/;
        var digits = p.replace(/\D/g, "");
        return (digits.match(phoneRe) !== null);
    }

});







