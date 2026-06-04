$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault();

            var $submitButton = $form.find('button[type="submit"]');
            var originalLabel = $submitButton.html();
            $submitButton.prop('disabled', true).html('Sending&hellip;');

            $.ajax({
                url: $form.attr('action'),
                method: 'POST',
                data: new FormData($form[0]),
                processData: false,
                contentType: false,
                dataType: 'json',
                headers: {
                    'Accept': 'application/json'
                },
                success: function() {
                    $('#success').html(
                        '<div class="alert alert-success">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                        '<strong>Thank you!</strong> Your message has been sent. I\'ll get back to you soon.' +
                        '</div>'
                    );
                    $form[0].reset();
                    $form.find('.form-control').removeClass('valid error');
                },
                error: function(data) {
                    var message = 'Sorry, something went wrong and your message could not be sent. Please try again, or email me directly at tui.gerald@gmail.com.';
                    if (data.responseJSON && data.responseJSON.errors) {
                        message = $.map(data.responseJSON.errors, function(e) {
                            return e.message;
                        }).join(', ');
                    }
                    $('#success').html(
                        '<div class="alert alert-danger">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                        message +
                        '</div>'
                    );
                },
                complete: function() {
                    $submitButton.prop('disabled', false).html(originalLabel);
                }
            });
        },

        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
